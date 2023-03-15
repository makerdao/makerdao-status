/* eslint-disable @typescript-eslint/no-explicit-any */
import { Contract, ethers } from 'ethers';
import { useEffect, useMemo, useState } from 'react';
import { useChangelogContext } from '../../context/ChangelogContext';
import additionalAddresses from '../addresses/AdditionalAddresses';
import {
  getCollateralsJoinAddress,
  getCollateralsKeys,
  getCollateralsTokenAddress,
  getCollateralsTokenKeys,
  getTokeNameFromIlkName,
  getContractFromTokens,
} from '../addresses/addressesUtils';
import { infuraCurrentProvider } from '../providers';
import { buildContract } from './useEthCall';

const { formatUnits } = ethers.utils;

const RAY = ethers.BigNumber.from('1000000000000000000000000000');
const WAD = ethers.BigNumber.from('1000000000000000000');
const DP2 = ethers.BigNumber.from('10000000000000000');
const DP6 = ethers.BigNumber.from('1000000000000');
const DP7 = ethers.BigNumber.from('1000000000000');
const DP8 = ethers.BigNumber.from('10000000000');
const DP10 = ethers.BigNumber.from('1000000000');
const DP18 = ethers.BigNumber.from('1');

const uniIlks = [
  'UNIV2DAIETH-A',
  'UNIV2WBTCETH-A',
  'UNIV2USDCETH-A',
  'UNIV2DAIUSDC-A',
  'UNIV2ETHUSDT-A',
  'UNIV2LINKETH-A',
  'UNIV2UNIETH-A',
  'UNIV2WBTCDAI-A',
  'UNIV2AAVEETH-A',
  'UNIV2DAIUSDT-A',
  'GUNIV3DAIUSDC1-A',
  'WSTETH-A',
];

const POSITION_MEDIAN_VAL = 1;

const useLoadERC20Contract = ({
  spotMap, vatMap, dSValueMap, enable,
}: {
  spotMap: Map<any, any>;
  vatMap: Map<any, any>;
  dSValueMap: Map<any, any>;
  enable?: boolean;
}) => {
  const { state: { changelog = {} }, loading: loadingChangelog } = useChangelogContext();

  const RWAIlks = useMemo(
    () => getCollateralsTokenKeys(changelog).filter((key) => /RWA.*/.test(key)),
    [changelog],
  );

  const { dataMap, loading } = useGetPrice(changelog);

  const erc20Map = useMemo(() => {
    const erc20MapTmp = new Map();

    if (!enable) return erc20MapTmp;

    const allIlks = getCollateralsKeys(changelog);

    allIlks.forEach((ilk: string) => {
      let lockedBN;
      let locked;
      let price;
      const ilkTokenName = getTokeNameFromIlkName(ilk).replace('PSM-', '');
      let priceMedian = dataMap.get(`median--${ilkTokenName}`);
      let balanceOf = dataMap.get(`${ilk}--balanceOf`);

      if (!balanceOf) balanceOf = ethers.BigNumber.from('0');
      if (!priceMedian) priceMedian = ethers.BigNumber.from('0');
      if (['USDC', 'TUSD', 'USDP', 'PAXUSD', 'GUSD', 'ADAI'].includes(ilkTokenName)) {
        price = ethers.BigNumber.from(1).mul(DP10);
        let tmp;

        if (['TUSD', 'USDP', 'PAXUSD', 'ADAI'].includes(ilkTokenName)) tmp = balanceOf.mul(price);
        else if (['GUSD'].includes(ilkTokenName)) tmp = balanceOf.mul(DP2).mul(price);
        else tmp = balanceOf.mul(DP7).mul(price);

        lockedBN = tmp.mul(WAD);
        locked = formatUnits(tmp, 27);
      } else if (['USDT'].includes(ilkTokenName)) {
        lockedBN = balanceOf.mul(DP6).mul(priceMedian.mul(DP10));
        locked = formatUnits(lockedBN, 45);
      } else if (['RENBTC', 'WBTC'].includes(ilkTokenName)) {
        lockedBN = balanceOf.mul(DP8).mul(priceMedian.mul(DP10));
        locked = formatUnits(lockedBN, 45);
      } else if (uniIlks.includes(ilk)) {
        const spotMatBN = spotMap.get(`${ilk}--matBN`);
        const vatSpotBN = ethers.BigNumber.from(vatMap.get(`${ilk}--spotBN`));
        price = spotMatBN.mul(vatSpotBN).div(RAY);
        lockedBN = balanceOf.mul(price);
        locked = formatUnits(lockedBN, 45);
      } else if (RWAIlks.includes(ilk)) {
        const priceRwaArray = dSValueMap.get(`${ilk}--read`);
        const priceRwa = priceRwaArray[0];
        if (['PSM-USDC-A'].includes(ilk)) {
          lockedBN = balanceOf.mul(
            ethers.BigNumber.from(priceRwa).mul(DP10).mul(DP7),
          );
        } else if (['PSM-USDP-A', 'PSM-PAX-A'].includes(ilk)) {
          lockedBN = balanceOf.mul(
            ethers.BigNumber.from(priceRwa).mul(DP10).mul(DP18),
          );
        } else {
          lockedBN = balanceOf.mul(ethers.BigNumber.from(priceRwa).mul(DP10));
        }
        locked = formatUnits(lockedBN, 45);
      } else {
        lockedBN = balanceOf.mul(priceMedian.mul(DP10));
        locked = formatUnits(lockedBN, 45);
      }
      erc20MapTmp.set(`lockedBN--${ilk}`, lockedBN);
      erc20MapTmp.set(`locked--${ilk}`, locked);
    });

    return erc20MapTmp;
  }, [RWAIlks, changelog, dSValueMap, dataMap, enable, spotMap, vatMap]);

  return { erc20Map, loading: loading || loadingChangelog };
};

const getPrice = async (osm: string, position: number) => {
  const val = await infuraCurrentProvider.getStorageAt(osm, position);

  return ethers.BigNumber.from(`0x${val.substring(34)}`);
};

const useGetPrice = (changelog: any) => {
  const [dataMap, setDataMap] = useState(new Map());
  const [loading, setLoading] = useState(false);

  const loadData = async (changeLog: any) => {
    const dataMapTmp = new Map();

    const multi: Contract = buildContract(changelog.MULTICALL, 'Multi');

    const tokenAddressMap: Map<string, string> = getCollateralsTokenAddress(changeLog);

    const tokensContractsMap: Map<string, Contract> = getContractFromTokens(changelog);

    const allIlks = getCollateralsKeys(changeLog);

    const addressesMap = getCollateralsJoinAddress(changeLog);

    const ethIlkCalls = await Promise.all(allIlks.map(async (ilk: string) => {
        const ilkTokenName = getTokeNameFromIlkName(ilk).replace('-', '_');

        const mcdName: string = ilk.split('-').join('_');

        const mapAddress: string = addressesMap.get(mcdName);

        const tokenAddress: string = (tokenAddressMap.get(ilkTokenName.replace('PSM_', '')) as string);

        const contractAddress: string = (tokensContractsMap.get(ilkTokenName) as Contract)
          .interface.encodeFunctionData('balanceOf', [mapAddress]);

        return [tokenAddress, contractAddress];
      }),
    );

    const ilkPromises = await multi.callStatic.aggregate([...ethIlkCalls]);

    const medianPromises = await Object.values(additionalAddresses.MEDIAN)
      .map((median) => getPrice(median, POSITION_MEDIAN_VAL));

    const data = await Promise.all([ilkPromises, ...medianPromises]);

    const [ilksData, ...priceMedians] = await data;

    allIlks.forEach((ilk: string, i) => {
      const lockedData = ilksData[1][i];

      const ilkTokenName = getTokeNameFromIlkName(ilk).replace('PSM-', '');

      let balanceOf: ethers.BigNumber = (tokensContractsMap.get(ilkTokenName) as Contract)
        .interface.decodeFunctionResult('balanceOf', lockedData)[0];

      if (!balanceOf) {
        balanceOf = ethers.BigNumber.from('0');
      }

      dataMapTmp.set(`${ilk}--balanceOf`, balanceOf);
    });

    Object.keys(additionalAddresses.MEDIAN).forEach((median, i) => {
      let priceMedian = priceMedians[i];
      if (priceMedian === undefined) {
        priceMedian = ethers.BigNumber.from('0');
      }
      dataMapTmp.set(`median--${median}`, priceMedian);
    });

    setDataMap(dataMapTmp);
    setLoading(false);
  };

  useEffect(() => {
    if (changelog && changelog.MULTICALL) {
      setLoading(true);
      loadData(changelog);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [changelog]);

  return { dataMap, loading };
};

export default useLoadERC20Contract;

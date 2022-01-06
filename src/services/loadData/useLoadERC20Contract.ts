/* eslint-disable @typescript-eslint/no-explicit-any */
import { ethers } from 'ethers';
import { useEffect, useMemo, useState } from 'react';
import additionalAddresses from '../addresses/AdditionalAddresses';
import {
  getCollateralsPipsAddress,
  getCollateralsJoinAddress,
  getCollateralsKeys,
  getCollateralsTokenAddress,
  getCollateralsTokenKeys,
  getTokeNameFromIlkName,
} from '../addresses/addressesUtils';
import changelog from '../addresses/changelog.json';
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

const RWAIlks = getCollateralsTokenKeys(changelog).filter((key) =>
  /RWA.*/.test(key),
);

const useLoadERC20Contract = ({
  spotMap,
  vatMap,
  dSValueMap,
  enable,
}: {
  spotMap: Map<any, any>;
  vatMap: Map<any, any>;
  dSValueMap: Map<any, any>;
  enable?: boolean;
}) => {
  const { dataMap, loading } = useGetPrice();
  const erc20Map = useMemo(() => {
    const erc20MapTmp = new Map();
    if (!enable) return erc20MapTmp;
    const allIlks = getCollateralsKeys(changelog);
    allIlks.forEach((ilk: string) => {
      let lockedBN;
      let locked;
      let price;
      const ilkTokenName = getTokeNameFromIlkName(ilk).replace('PSM-', '');
      let balanceOf = dataMap.get(`${ilk}--balanceOf`);
      if (!balanceOf) {
        balanceOf = ethers.BigNumber.from('0');
      }
      let priceMedian = dataMap.get(`median--${ilkTokenName}`);
      if (!priceMedian) {
        priceMedian = ethers.BigNumber.from('0');
      }
      if (
        ['USDC', 'TUSD', 'USDP', 'PAXUSD', 'GUSD', 'ADAI'].includes(
          ilkTokenName,
        )
      ) {
        price = ethers.BigNumber.from(1).mul(DP10);
        let tmp;
        if (['TUSD', 'USDP', 'PAXUSD', 'ADAI'].includes(ilkTokenName)) {
          tmp = balanceOf.mul(price);
        } else if (['GUSD'].includes(ilkTokenName)) {
          tmp = balanceOf.mul(DP2).mul(price);
        } else {
          tmp = balanceOf.mul(DP7).mul(price);
        }
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
  }, [dSValueMap, dataMap, enable, spotMap, vatMap]);
  return {
    erc20Map,
    loading,
  };
};

const useGetPrice = () => {
  const [dataMap, setDataMap] = useState(new Map());
  const [loading, setLoading] = useState(false);
  const multi = useMemo(
    () => buildContract(changelog.MULTICALL, 'MulticallSmartContract'),
    [],
  );
  const collateralsTokenAddress = useMemo(
    () => getCollateralsTokenAddress(changelog),
    [],
  );

  const contractsMap = useMemo(() => getContractFromTokens(), []);
  const POSITION_MEDIAN_VAL = 1;
  useEffect(() => {
    const getPrice = async (osm: string, position: number) => {
      const val = await infuraCurrentProvider.getStorageAt(osm, position);
      return ethers.BigNumber.from(`0x${val.substring(34)}`);
    };

    const loadData = async () => {
      setLoading(true);
      const allIlks = getCollateralsKeys(changelog);
      const addressesMap = getCollateralsJoinAddress(changelog);
      const ethIlkCalls = await Promise.all(
        allIlks.map(async (ilk: string) => {
          const ilkTokenName = getTokeNameFromIlkName(ilk).replace('-', '_');
          const mcdName = ilk.split('-').join('_');
          const madAddress = addressesMap.get(mcdName);
          const tokenAddress = collateralsTokenAddress.get(
            ilkTokenName.replace('PSM_', ''),
          );
          return [
            tokenAddress,
            contractsMap
              .get(ilkTokenName)
              .interface.encodeFunctionData('balanceOf', [madAddress]),
          ];
        }),
      );
      const ilkPromises = multi.callStatic.aggregate([...ethIlkCalls]);
      const medianPromises = Object.values(additionalAddresses.MEDIAN).map(
        (median) => getPrice(median, POSITION_MEDIAN_VAL),
      );
      const data = await Promise.all([ilkPromises, ...medianPromises]);
      const [ilksData, ...priceMedians] = data;

      const dataMapTmp = new Map();

      allIlks.forEach((ilk: string, i) => {
        const lockedData = ilksData[1][i];
        const ilkTokenName = getTokeNameFromIlkName(ilk).replace('PSM-', '');
        let balanceOf: ethers.BigNumber = contractsMap
          .get(ilkTokenName)
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
    loadData();
  }, [collateralsTokenAddress, contractsMap, multi.callStatic]);

  return { dataMap, loading };
};

const getContractFromTokens = () => {
  const tokens = getCollateralsTokenKeys(changelog);
  const collateralsAddress = getCollateralsPipsAddress(changelog);

  const contracts = tokens.map((ilk: string) => {
    const collateralAddress = collateralsAddress.get(ilk);
    const contractName = 'ERC20';
    const contract = buildContract(collateralAddress, contractName);
    return contract;
  });
  const contractsMap = new Map();
  tokens.forEach((token, i) => {
    contractsMap.set(token, contracts[i]);
  });
  return contractsMap;
};

export default useLoadERC20Contract;

/* eslint-disable @typescript-eslint/no-explicit-any */
import { gql, useQuery } from '@apollo/client';
import { ethers } from 'ethers';
import moment from 'moment';
import { useMemo } from 'react';
import { getTokeNameFromIlkName } from '../addresses/addressesUtils';
import apolloClients from '../apolloClients';
import { addresses, addressMap } from '../constants/addresses';
import { buildContract } from '../contracts/contractsUtils';
import { infuraCurrentProvider } from '../infura';
import { getCollateralNameFromVaultIdentifier } from '../models/collateral';
import factoryVaults from '../models/vault';
import { getAllIlksQuery } from '../queries';
import {
  fromRad,
  ilkSpotToPrice,
  parseDaiSupply,
  parseFeesCollected,
} from '../utils/mathUtils';

const { formatUnits, formatBytes32String, formatEther } = ethers.utils;

const POSITION_MEDIAN_VAL = 1;
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

const pipIlks = [
  'RWA001-A',
  'RWA002-A',
  'RWA003-A',
  'RWA004-A',
  'RWA005-A',
  'RWA006-A',
  'PSM-USDC-A',
  'PSM-PAX-A',
];

export const useLoadCollaterals = () => {
  const { data: allIlksRowsData, loading: loadingAllIlksRows } = useQuery(
    getAllIlksQuery,
    {
      client: apolloClients.apiMakerdao,
    },
  );

  const vaults: Definitions.Vault[] = useMemo(() => {
    if (loadingAllIlksRows || !allIlksRowsData) return [];
    return allIlksRowsData.allIlks.nodes
      .map((ilk: Definitions.Ilk) => factoryVaults(ilk))
      .filter((v: Definitions.Vault) => v.dai > 0);
  }, [allIlksRowsData, loadingAllIlksRows]);

  const sortedVaults = useMemo(() => {
    if (loadingAllIlksRows || !allIlksRowsData) return [];
    return vaults.sort((a, b) => (a.dai < b.dai ? 1 : -1));
  }, [allIlksRowsData, loadingAllIlksRows, vaults]);

  const collateralsNames = useMemo(() => {
    const newCollaterals: Definitions.Collateral[] = [];
    sortedVaults.forEach((vault) => {
      const name = getCollateralNameFromVaultIdentifier(vault.identifier);
      const currCollateral = newCollaterals.find((c) => c.name === name);
      const currIndex = newCollaterals.findIndex((c) => c.name === name);

      if (currCollateral == null) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        newCollaterals.push({ name, vaults: [vault] } as any);
      } else {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        newCollaterals[currIndex] = {
          name,
          vaults: [...currCollateral.vaults, vault],
        } as any;
      }
    });
    return newCollaterals;
  }, [sortedVaults]);
  // query to get fees
  const { dataMap: ilkSnapshot, loading: loadingTimeIlkSnapshot } =
    useTimeIlkSnapshotQuery(vaults);

  return {
    ilkSnapshot,
    collateralsNames,
    loading: loadingAllIlksRows || loadingTimeIlkSnapshot,
  };
};

const useTimeIlkSnapshotQuery = (vaults?: Definitions.Vault[]) => {
  const query = useMemo(() => {
    if (!vaults || !vaults.length) return '';
    const timeIlkByVaults = vaults.map(
      ({ identifier }, i) =>
        `i${i}: ${factoryTimeIlkSnapshotsQuery(identifier)}`,
    );
    return timeIlkByVaults.join(',');
  }, [vaults]);
  const { data: dataQuery, loading } = useQuery(
    query ? gql`{${query}}` : defaultQuery,
    {
      client: apolloClients.apiMakerdao,
      skip: !query,
    },
  );
  const { dataMap, data } = useMemo(() => {
    const dataMapCallback = new Map();
    const dataCallback = Object.entries(dataQuery || [])
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      .map(([_, d]: any) => {
        let lastRate = null;
        let lastArt = null;
        return d.nodes
          .filter((n: any) => n != null)
          .map((n: any) => {
            lastRate = n.rate;
            lastArt = n.art;
            const newNode = {
              ...n,
              dai: n.art != null ? parseDaiSupply(n.art, n.rate) : 0,
              feesCollected:
                n.art != null && n.rate != null
                  ? parseFeesCollected(lastArt, n.art, lastRate, n.rate)
                  : 0,
              price:
                n.spot != null && n.mat != null
                  ? ilkSpotToPrice(n.spot, n.mat)
                  : null,
              debtCeiling: n.line != null ? fromRad(n.line) : 0,
              id: `ilk-${n.ilkIdentifier}`,
              token: getCollateralNameFromVaultIdentifier(n.ilkIdentifier),
              asset: n.ilkIdentifier,
            };
            const curr = dataMapCallback.get(n.ilkIdentifier) || [];
            dataMapCallback.set(n.ilkIdentifier, [...curr, newNode]);
            return newNode;
          });
      })
      .filter((d: any[]) => d.length > 0);
    return { dataMap: dataMapCallback, data: dataCallback };
  }, [dataQuery]);

  return { dataMap, data, loading };
};

const factoryTimeIlkSnapshotsQuery = (identifier: string) => `
    timeIlkSnapshots(
      first: 1000,
      ilkIdentifier: "${identifier}",
      rangeStart: "${moment().subtract(1, 'year').toISOString()}",
      rangeEnd: "${moment().toISOString()}",
      bucketInterval: { years:1 }
       ) {
            nodes {
        bucketStart,
          bucketEnd,
          ilkIdentifier,
          blockNumber,
          updated,
          rate,
          art,
          spot,
          line,
          rho,
          duty,
          mat
      }
    }

    `;

const defaultQuery = gql`
  {
    query {
      __type(name: "") {
        fields {
          name
        }
      }
    }
  }
`;

export default async function loadCollaterals() {
  const multi = await buildContract(addresses.MULTICALL, 'Multicall');
  const contractsMap = await getContractFromTokens();
  const vatJugSpotMap = await getVatJugSpot();
  const pipsMap = await getPips();

  const allIlks = Object.keys(addressMap.ILKS);

  const ethIlkCalls = await Promise.all(
    allIlks.map(async (ilk: string) => {
      const ilkTokenName = getTokeNameFromIlkName(ilk);
      const mcdName = `MCD_JOIN_${ilk.replaceAll('-', '_')}`;
      const madAddress = (addressMap.MCD_JOIN as Record<string, string>)[
        mcdName
      ];
      const tokenAddress = (addressMap.TOKENS as Record<string, string>)[
        ilkTokenName
      ];
      return [
        tokenAddress,
        contractsMap
          .get(ilkTokenName)
          .interface.encodeFunctionData('balanceOf', [madAddress]),
      ];
    }),
  );

  const ilkPromises = multi.callStatic.aggregate([...ethIlkCalls]);
  const medianPromises = Object.values(addressMap.MEDIAN).map((median) =>
    getPrice(median, POSITION_MEDIAN_VAL),
  );
  const data = await Promise.all([ilkPromises, ...medianPromises]);
  const [ilksData, ...priceMedians] = data;

  const priceMediansMap = new Map();
  Object.keys(addressMap.MEDIAN).forEach((median, i) => {
    priceMediansMap.set(median, priceMedians[i]);
  });

  const ilks = allIlks.map((ilk: string, i) => {
    let lockedBN;
    let locked;
    let price;
    const lockedData = ilksData[1][i];
    const ilkTokenName = getTokeNameFromIlkName(ilk);
    const priceMedian = priceMediansMap.get(ilkTokenName);
    const lockedBalanceOf: ethers.BigNumber = contractsMap
      .get(ilkTokenName)
      .interface.decodeFunctionResult('balanceOf', lockedData)[0];
    const vatIlk = vatJugSpotMap.get(`${ilk}--${addressMap.TOKENS.VAT}`);
    const jugIlk = vatJugSpotMap.get(`${ilk}--${addressMap.TOKENS.JUG}`);
    const spotIlk = vatJugSpotMap.get(`${ilk}--${addressMap.TOKENS.SPOT}`);

    if (
      ['USDC', 'TUSD', 'USDP', 'PAXUSD', 'GUSD', 'ADAI'].includes(ilkTokenName)
    ) {
      price = ethers.BigNumber.from(1).mul(DP10);
      let tmp;
      if (['TUSD', 'USDP', 'PAXUSD', 'ADAI'].includes(ilkTokenName)) {
        tmp = lockedBalanceOf.mul(price);
      } else if (['GUSD'].includes(ilkTokenName)) {
        tmp = lockedBalanceOf.mul(DP2).mul(price);
      } else {
        tmp = lockedBalanceOf.mul(DP7).mul(price);
      }
      lockedBN = tmp.mul(WAD);
      locked = formatUnits(tmp, 27);
    } else if (['USDT'].includes(ilkTokenName)) {
      lockedBN = lockedBalanceOf.mul(DP6).mul(priceMedian.mul(DP10));
      locked = formatUnits(lockedBN, 45);
    } else if (['RENBTC', 'WBTC'].includes(ilkTokenName)) {
      lockedBN = lockedBalanceOf.mul(DP8).mul(priceMedian.mul(DP10));
      locked = formatUnits(lockedBN, 45);
    } else if (uniIlks.includes(ilk)) {
      price = spotIlk.mat.mul(vatIlk.spot).div(RAY);
      lockedBN = lockedBalanceOf.mul(price);
      locked = formatUnits(lockedBN, 45);
    } else if (pipIlks.includes(ilk)) {
      const priceRwa = pipsMap.get(
        `${ilk}--${
          (addressMap.PIP as Record<string, string>)[ilkTokenName]
        }--read`,
      );
      if (['PSM-USDC-A'].includes(ilk)) {
        lockedBN = lockedBalanceOf.mul(
          ethers.BigNumber.from(priceRwa).mul(DP10).mul(DP7),
        );
      } else if (['PSM-USDP-A'].includes(ilk)) {
        lockedBN = lockedBalanceOf.mul(
          ethers.BigNumber.from(priceRwa).mul(DP10).mul(DP18),
        );
      } else {
        lockedBN = lockedBalanceOf.mul(
          ethers.BigNumber.from(priceRwa).mul(DP10),
        );
      }
      locked = formatUnits(lockedBN, 45);
    } else {
      lockedBN = lockedBalanceOf.mul(priceMedian.mul(DP10));
      locked = formatUnits(lockedBN, 45);
    }

    let art = formatEther(vatIlk.Art);
    if (['PSM-USDC-A'].includes(ilk)) {
      art = formatUnits(lockedBalanceOf, 6);
    }
    if (['PSM-PAX-A'].includes(ilk)) {
      art = formatUnits(lockedBalanceOf, 18);
    }

    let rate = formatUnits(vatIlk.rate, 27);
    if (['PSM-USDC-A', 'PSM-PAX-A'].includes(ilk)) {
      rate = '1';
    }

    return {
      id: `ilk-${ilk}`,
      token: ilkTokenName,
      address: (addressMap.ILKS as Record<string, string>)[ilkTokenName],
      asset: ilkTokenName === 'PAXUSD' ? 'USDP' : ilk,
      art,
      rate,
      duty: jugIlk.duty.toString(),
      line: formatUnits(vatIlk.line, 45),
      dust: formatUnits(vatIlk.dust, 45),
      mat: spotIlk.mat.toString(),
      locked,
      lockedBN,
      name: '',
      vaults: [],
    };
  });

  return ilks;
}

const getContractFromTokens = async () => {
  const tokens = Object.keys(addressMap.TOKENS);
  const contracts = await Promise.all(
    tokens.map(async (ilk: string) => {
      const tokenAddress = (addressMap.TOKENS as Record<string, string>)[ilk];
      const contractName = 'ERC20';
      const contract = await buildContract(tokenAddress, contractName);
      return contract;
    }),
  );
  const contractsMap = new Map();
  tokens.forEach((token, i) => {
    contractsMap.set(token, contracts[i]);
  });
  return contractsMap;
};

export async function getVatJugSpot() {
  const multi = await buildContract(addressMap.MULTICALL, 'Multicall');
  const vat = await buildContract(addressMap.TOKENS.VAT, 'vat');
  const jug = await buildContract(addressMap.TOKENS.JUG, 'jug');
  const spot = await buildContract(addressMap.TOKENS.SPOT, 'spot');
  const allIlks = Object.keys(addressMap.ILKS);
  let ilkCalls: string[][] = [];
  allIlks.forEach((ilk) => {
    const ilkBytes = formatBytes32String(ilk);
    const tmp = [
      [
        addressMap.TOKENS.VAT,
        vat.interface.encodeFunctionData('ilks', [ilkBytes]),
      ],
      [
        addressMap.TOKENS.JUG,
        jug.interface.encodeFunctionData('ilks', [ilkBytes]),
      ],
      [
        addressMap.TOKENS.SPOT,
        spot.interface.encodeFunctionData('ilks', [ilkBytes]),
      ],
    ];
    ilkCalls = [...ilkCalls, ...tmp];
  });
  const ilkPromises = multi.callStatic.aggregate(ilkCalls);
  const data = await Promise.all([ilkPromises]);
  const count = 3;
  const dataMap = new Map();
  const values = data[0][1];
  allIlks.forEach((ilk, i) => {
    const offset = count * i;
    const vatIlk = vat.interface.decodeFunctionResult('ilks', values[offset]);
    const jugIlk = jug.interface.decodeFunctionResult(
      'ilks',
      values[offset + 1],
    );
    const spotIlk = spot.interface.decodeFunctionResult(
      'ilks',
      values[offset + 2],
    );
    dataMap.set(`${ilk}--${addressMap.TOKENS.VAT}`, vatIlk);
    dataMap.set(`${ilk}--${addressMap.TOKENS.JUG}`, jugIlk);
    dataMap.set(`${ilk}--${addressMap.TOKENS.SPOT}`, spotIlk);
  });
  return dataMap;
}

export async function getPips() {
  const multi = await buildContract(addressMap.MULTICALL, 'Multicall');
  const rwaPips = await Promise.all(
    Object.keys(addressMap.PIP).map(async (key) =>
      buildContract((addressMap.PIP as Record<string, string>)[key], 'DSValue'),
    ),
  );
  let ilkCalls: string[][] = [];
  pipIlks.forEach((ilk) => {
    const ilkTokenName = getTokeNameFromIlkName(ilk);
    const tmp = rwaPips.map((rwaPip) => [
      (addressMap.PIP as Record<string, string>)[ilkTokenName],
      rwaPip.interface.encodeFunctionData('read', []),
    ]);
    ilkCalls = [...ilkCalls, ...tmp];
  });
  const ilkPromises = multi.callStatic.aggregate(ilkCalls);
  const data = await Promise.all([ilkPromises]);
  const count = Object.keys(addressMap.PIP).length;
  const dataMap = new Map();
  const values = data[0][1];

  pipIlks.forEach((ilk, i) => {
    const ilkTokenName = getTokeNameFromIlkName(ilk);
    const offset = count * i;
    rwaPips.forEach((rwaPip) => {
      const read = rwaPip.interface.decodeFunctionResult(
        'read',
        values[offset],
      )[0];
      dataMap.set(
        `${ilk}--${
          (addressMap.PIP as Record<string, string>)[ilkTokenName]
        }--read`,
        read,
      );
    });
  });
  return dataMap;
}

const getPrice = async (osm: string, position: number) => {
  const val = await infuraCurrentProvider.getStorageAt(osm, position);
  return ethers.BigNumber.from(`0x${val.substring(34)}`);
};

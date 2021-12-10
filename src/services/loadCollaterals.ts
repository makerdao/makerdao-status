import { ethers } from 'ethers';
import { addressMap } from './constants/addresses';
import {
  getCollateralsAddress,
  getCollateralsTokenAddress,
  getCollateralsTokenKeys,
  getTokeNameFromIlkName,
} from './constants/addressesUtils';
import { buildContract } from './Contracts';
import { infuraCurrentProvider } from './infura';
import changelog from './loadData/changelog.json';
import { formatWadRate } from './utils/formatsFunctions';
import Formatter from './utils/Formatter';

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

const RWAIlks = getCollateralsTokenKeys(changelog)
  .filter((key) => /RWA.*/.test(key))
  .map((key) => key.concat('-A'));

export default async function loadCollaterals() {
  const collateralsTokenAddress = getCollateralsTokenAddress(changelog);
  const multi = buildContract(changelog.MULTICALL, 'MULTICALL');
  const contractsMap = await getContractFromTokens();
  const vatJugSpotMap = await getVatJugSpot();
  const dssAutoLineMap = await getDssAutoLine();
  const clipperMap = await getClipper();
  const clipperMomMap = await getClipperMom();
  const dogMap = await getDog();
  const flapMap = await getFlap();
  const pipsMap = await getPips();
  const dssPmsMap = await getDssPms();

  const allIlks = Object.keys(addressMap.ILKS);

  const ethIlkCalls = await Promise.all(
    allIlks.map(async (ilk: string) => {
      const ilkTokenName = getTokeNameFromIlkName(ilk);
      const mcdName = `MCD_JOIN_${ilk.replaceAll('-', '_')}`;
      const madAddress = (addressMap.MCD_JOIN as Record<string, string>)[
        mcdName
      ];
      const tokenAddress = collateralsTokenAddress.get(ilkTokenName);
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
    const vatIlk = vatJugSpotMap.get(`${ilk}--${changelog.MCD_VAT}`);
    const vatLine = vatJugSpotMap.get(`${ilk}--${changelog.MCD_VAT}--Line`)[0];
    const jugIlk = vatJugSpotMap.get(`${ilk}--${changelog.MCD_JUG}`);
    const spotIlk = vatJugSpotMap.get(`${ilk}--${changelog.MCD_SPOT}`);
    const dssAutoLineIlks = dssAutoLineMap.get(`${ilk}--ilks`);
    const dogIlk = dogMap.get(`${ilk}--${changelog.MCD_DOG}`);
    const dogHole = dogMap.get(`${ilk}--Hole`)[0];
    const flapBeg = flapMap.get(`${ilk}--beg`)[0];
    const clipperCalcArray = clipperMap.get(`${ilk}--calc`);
    const clipperCalc = clipperCalcArray ? clipperCalcArray[0] : undefined;
    const clipperCuspArray = clipperMap.get(`${ilk}--cusp`);
    const clipperCusp = clipperCuspArray ? clipperCuspArray[0] : undefined;
    const clipperTailArray = clipperMap.get(`${ilk}--tail`);
    const clipperTail = clipperTailArray ? clipperTailArray[0] : undefined;
    const clipperChipArray = clipperMap.get(`${ilk}--chip`);
    const clipperChip = clipperChipArray ? clipperChipArray[0] : undefined;
    const clipperTipArray = clipperMap.get(`${ilk}--tip`);
    const clipperTip = clipperTipArray ? clipperTipArray[0] : undefined;
    const clipperBufArray = clipperMap.get(`${ilk}--buf`);
    const clipperBuf = clipperBufArray ? clipperBufArray[0] : undefined;
    const toleranceArray = clipperMomMap.get(`${ilk}--tolerance`);
    const tolerance = toleranceArray ? toleranceArray[0] : undefined;
    const dssPmsTinArray = dssPmsMap.get(`${ilk}--tin`);
    const tin = dssPmsTinArray ? dssPmsTinArray[0] : undefined;
    const dssPmsToutArray = dssPmsMap.get(`${ilk}--tout`);
    const tout = dssPmsToutArray ? dssPmsToutArray[0] : undefined;
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
    } else if (RWAIlks.includes(ilk)) {
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
      vat_Line: formatUnits(vatLine, 45),
      dust: formatUnits(vatIlk.dust, 45),
      mat: spotIlk.mat.toString(),
      dog_chop: formatWadRate(dogIlk.chop.toString()),
      dog_hole: formatUnits(dogIlk.hole, 45),
      dog_Hole: formatUnits(dogHole, 45),
      flap_beg: formatUnits(flapBeg, 18),
      clip_calc: clipperCalc ? formatUnits(clipperCalc, 45) : undefined,
      clip_cusp: clipperCusp ? formatUnits(clipperCusp, 27) : undefined,
      clip_tail: clipperTail,
      clip_chip: clipperChip ? formatUnits(clipperChip, 18) : undefined,
      clip_buf: clipperBuf ? formatUnits(clipperBuf, 27) : undefined,
      clip_tip: clipperTip
        ? Formatter.formatAmount(formatUnits(clipperTip, 45), 0)
        : undefined,
      dss_auto_line_line: formatUnits(dssAutoLineIlks.line, 45),
      dss_auto_line_gap: formatUnits(dssAutoLineIlks.gap, 45),
      dss_auto_line_ttl: dssAutoLineIlks.ttl,
      tolerance: tolerance ? formatUnits(tolerance, 27) : undefined,
      dssPms_tin: tin ? formatEther(tin) : undefined,
      dssPms_tout: tout ? formatEther(tout) : undefined,
      locked,
      lockedBN,
    };
  });

  return ilks;
}

const getContractFromTokens = async () => {
  const tokens = getCollateralsTokenKeys(changelog);
  const collateralsAddress = getCollateralsAddress(changelog);

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

export async function getVatJugSpot() {
  const multi = buildContract(changelog.MULTICALL, 'MULTICALL');
  const vat = buildContract(changelog.MCD_VAT, 'vat');
  const jug = buildContract(changelog.MCD_JUG, 'jug');
  const spot = buildContract(changelog.MCD_SPOT, 'spot');
  const allIlks = Object.keys(addressMap.ILKS);
  let ilkCalls: string[][] = [];
  allIlks.forEach((ilk) => {
    const ilkBytes = formatBytes32String(ilk);
    const tmp = [
      [changelog.MCD_VAT, vat.interface.encodeFunctionData('ilks', [ilkBytes])],
      [changelog.MCD_VAT, vat.interface.encodeFunctionData('Line', [])],
      [changelog.MCD_JUG, jug.interface.encodeFunctionData('ilks', [ilkBytes])],
      [
        changelog.MCD_SPOT,
        spot.interface.encodeFunctionData('ilks', [ilkBytes]),
      ],
    ];
    ilkCalls = [...ilkCalls, ...tmp];
  });
  const ilkPromises = multi.callStatic.aggregate(ilkCalls);
  const data = await Promise.all([ilkPromises]);
  const count = 4;
  const dataMap = new Map();
  const values = data[0][1];
  allIlks.forEach((ilk, i) => {
    const offset = count * i;
    const vatIlk = vat.interface.decodeFunctionResult('ilks', values[offset]);
    const vatLine = vat.interface.decodeFunctionResult(
      'Line',
      values[offset + 1],
    );
    const jugIlk = jug.interface.decodeFunctionResult(
      'ilks',
      values[offset + 2],
    );
    const spotIlk = spot.interface.decodeFunctionResult(
      'ilks',
      values[offset + 3],
    );
    dataMap.set(`${ilk}--${changelog.MCD_VAT}`, vatIlk);
    dataMap.set(`${ilk}--${changelog.MCD_VAT}--Line`, vatLine);
    dataMap.set(`${ilk}--${changelog.MCD_JUG}`, jugIlk);
    dataMap.set(`${ilk}--${changelog.MCD_SPOT}`, spotIlk);
  });
  return dataMap;
}

export async function getDssAutoLine() {
  const multi = buildContract(changelog.MULTICALL, 'MULTICALL');
  const dssAutoLine = buildContract(changelog.MCD_IAM_AUTO_LINE, 'dssAutoLine');
  const allIlks = Object.keys(addressMap.ILKS);
  let ilkCalls: string[][] = [];
  allIlks.forEach((ilk) => {
    const ilkBytes = formatBytes32String(ilk);
    const tmp = [
      [
        changelog.MCD_IAM_AUTO_LINE,
        dssAutoLine.interface.encodeFunctionData('ilks', [ilkBytes]),
      ],
    ];
    ilkCalls = [...ilkCalls, ...tmp];
  });
  const ilkPromises = multi.callStatic.aggregate(ilkCalls);
  const data = await Promise.all([ilkPromises]);
  const count = 1;
  const dataMap = new Map();
  const values = data[0][1];
  allIlks.forEach((ilk, i) => {
    const offset = count * i;
    const contractIlks = dssAutoLine.interface.decodeFunctionResult(
      'ilks',
      values[offset],
    );
    dataMap.set(`${ilk}--ilks`, contractIlks);
  });
  return dataMap;
}

export async function getDssPms() {
  const multi = buildContract(changelog.MULTICALL, 'MULTICALL');
  const allIlks = Object.keys(addressMap.ILKS);
  let ilkCalls: string[][] = [];
  const allIlksFilter = allIlks.filter((ilk) => {
    const clipName = `MCD_PSM_${ilk.replace('-', '_')}`;
    return (changelog as Record<string, string>)[clipName];
  });
  allIlksFilter.forEach((ilk) => {
    const clipName = `MCD_PSM_${ilk.replace('-', '_')}`;
    const address = (changelog as Record<string, string>)[clipName];
    const dssPsm = buildContract(address, 'DssPsm');
    const tmp = [
      [address, dssPsm.interface.encodeFunctionData('tin', [])],
      [address, dssPsm.interface.encodeFunctionData('tout', [])],
    ];
    ilkCalls = [...ilkCalls, ...tmp];
  });
  const ilkPromises = multi.callStatic.aggregate(ilkCalls);
  const data = await Promise.all([ilkPromises]);
  const count = 2;
  const dataMap = new Map();
  const values = data[0][1];
  allIlksFilter.forEach((ilk, i) => {
    const offset = count * i;
    const clipName = `MCD_PSM_${ilk.replace('-', '_')}`;
    const address = (changelog as Record<string, string>)[clipName];
    const dssPsm = buildContract(address, 'DssPsm');
    const contractTin = dssPsm.interface.decodeFunctionResult(
      'tin',
      values[offset],
    );
    const contractTout = dssPsm.interface.decodeFunctionResult(
      'tout',
      values[offset],
    );
    dataMap.set(`${ilk}--tin`, contractTin);
    dataMap.set(`${ilk}--tout`, contractTout);
  });
  return dataMap;
}

export async function getDog() {
  const multi = buildContract(changelog.MULTICALL, 'MULTICALL');
  const dog = buildContract(changelog.MCD_DOG, 'dog');
  const allIlks = Object.keys(addressMap.ILKS);
  let ilkCalls: string[][] = [];
  allIlks.forEach((ilk) => {
    const ilkBytes = formatBytes32String(ilk);
    const tmp = [
      [changelog.MCD_DOG, dog.interface.encodeFunctionData('ilks', [ilkBytes])],
      [changelog.MCD_DOG, dog.interface.encodeFunctionData('Hole', [])],
    ];
    ilkCalls = [...ilkCalls, ...tmp];
  });
  const ilkPromises = multi.callStatic.aggregate(ilkCalls);
  const data = await Promise.all([ilkPromises]);
  const count = 2;
  const dataMap = new Map();
  const values = data[0][1];
  allIlks.forEach((ilk, i) => {
    const offset = count * i;
    const dogIlk = dog.interface.decodeFunctionResult('ilks', values[offset]);
    const dogHole = dog.interface.decodeFunctionResult(
      'Hole',
      values[offset + 1],
    );
    dataMap.set(`${ilk}--${changelog.MCD_DOG}`, dogIlk);
    dataMap.set(`${ilk}--Hole`, dogHole);
  });

  return dataMap;
}

export async function getFlap() {
  const multi = buildContract(changelog.MULTICALL, 'MULTICALL');
  const flap = buildContract(changelog.MCD_FLAP, 'flap');
  const allIlks = Object.keys(addressMap.ILKS);
  let ilkCalls: string[][] = [];
  allIlks.forEach(() => {
    const tmp = [
      [changelog.MCD_FLAP, flap.interface.encodeFunctionData('beg', [])],
    ];
    ilkCalls = [...ilkCalls, ...tmp];
  });
  const ilkPromises = multi.callStatic.aggregate(ilkCalls);
  const data = await Promise.all([ilkPromises]);
  const count = 1;
  const dataMap = new Map();
  const values = data[0][1];
  allIlks.forEach((ilk, i) => {
    const offset = count * i;
    const flapIlk = flap.interface.decodeFunctionResult('beg', values[offset]);
    dataMap.set(`${ilk}--beg`, flapIlk);
  });

  return dataMap;
}

export async function getClipper() {
  const multi = buildContract(changelog.MULTICALL, 'MULTICALL');
  const allIlks = Object.keys(addressMap.ILKS);
  let ilkCalls: string[][] = [];
  const allIlksFilter = allIlks.filter((ilk) => {
    const clipName = `MCD_CLIP_${ilk.replace('-', '_')}`;
    return (changelog as Record<string, string>)[clipName];
  });
  allIlksFilter.forEach((ilk) => {
    const clipName = `MCD_CLIP_${ilk.replace('-', '_')}`;
    const address = (changelog as Record<string, string>)[clipName];
    const clip = buildContract(address, 'clipper');
    const tmp = [
      [address, clip.interface.encodeFunctionData('calc', [])],
      [address, clip.interface.encodeFunctionData('cusp', [])],
      [address, clip.interface.encodeFunctionData('tail', [])],
      [address, clip.interface.encodeFunctionData('chip', [])],
      [address, clip.interface.encodeFunctionData('tip', [])],
      [address, clip.interface.encodeFunctionData('buf', [])],
    ];
    ilkCalls = [...ilkCalls, ...tmp];
  });
  const ilkPromises = multi.callStatic.aggregate(ilkCalls);
  const data = await Promise.all([ilkPromises]);
  const count = 6;
  const dataMap = new Map();
  const values = data[0][1];
  allIlksFilter.forEach((ilk, i) => {
    const offset = count * i;
    const clipName = `MCD_CLIP_${ilk.replace('-', '_')}`;
    const address = (changelog as Record<string, string>)[clipName];
    const clip = buildContract(address, 'clipper');
    const flapCalc = clip.interface.decodeFunctionResult(
      'calc',
      values[offset],
    );
    const clipCusp = clip.interface.decodeFunctionResult(
      'cusp',
      values[offset + 1],
    );
    const clipTail = clip.interface.decodeFunctionResult(
      'tail',
      values[offset + 2],
    );
    const clipChip = clip.interface.decodeFunctionResult(
      'chip',
      values[offset + 3],
    );
    const clipTip = clip.interface.decodeFunctionResult(
      'tip',
      values[offset + 4],
    );
    const clipBuf = clip.interface.decodeFunctionResult(
      'buf',
      values[offset + 5],
    );
    dataMap.set(`${ilk}--calc`, flapCalc);
    dataMap.set(`${ilk}--cusp`, clipCusp);
    dataMap.set(`${ilk}--tail`, clipTail);
    dataMap.set(`${ilk}--chip`, clipChip);
    dataMap.set(`${ilk}--tip`, clipTip);
    dataMap.set(`${ilk}--buf`, clipBuf);
  });

  return dataMap;
}

export async function getClipperMom() {
  const multi = buildContract(changelog.MULTICALL, 'MULTICALL');
  const allIlks = Object.keys(addressMap.ILKS);
  let ilkCalls: string[][] = [];
  const contractName = 'clipperMom';
  const allIlksFilter = allIlks.filter((ilk) => {
    const clipName = `MCD_CLIP_${ilk.replace('-', '_')}`;
    return (changelog as Record<string, string>)[clipName];
  });
  allIlksFilter.forEach((ilk) => {
    const clipName = `MCD_CLIP_${ilk.replace('-', '_')}`;
    const address = (changelog as Record<string, string>)[clipName];
    const contract = buildContract(address, contractName);
    const tmp = [
      [
        changelog.CLIPPER_MOM,
        contract.interface.encodeFunctionData('tolerance', [address]),
      ],
    ];
    ilkCalls = [...ilkCalls, ...tmp];
  });
  const ilkPromises = multi.callStatic.aggregate(ilkCalls);
  const data = await Promise.all([ilkPromises]);
  const count = 1;
  const dataMap = new Map();
  const values = data[0][1];
  allIlksFilter.forEach((ilk, i) => {
    const offset = count * i;
    const clipName = `MCD_CLIP_${ilk.replace('-', '_')}`;
    const address = (changelog as Record<string, string>)[clipName];
    const contract = buildContract(address, contractName);
    const tolerance = contract.interface.decodeFunctionResult(
      'tolerance',
      values[offset],
    );
    dataMap.set(`${ilk}--tolerance`, tolerance);
  });

  return dataMap;
}

export async function getPips() {
  const multi = buildContract(changelog.MULTICALL, 'MULTICALL');
  const collateralsAddress = getCollateralsAddress(changelog);
  const rwaPips = Array.from(collateralsAddress.keys())
    .filter((key) => /RWA.*/.test(key))
    .map((key) => buildContract(collateralsAddress.get(key), 'DSValue'));
  let ilkCalls: string[][] = [];

  RWAIlks.forEach((ilk) => {
    const ilkTokenName = getTokeNameFromIlkName(ilk);
    const tmp = rwaPips.map((rwaPip) => [
      collateralsAddress.get(ilkTokenName),
      rwaPip.interface.encodeFunctionData('read', []),
    ]);
    ilkCalls = [...ilkCalls, ...tmp];
  });

  const ilkPromises = multi.callStatic.aggregate(ilkCalls);
  const data = await Promise.all([ilkPromises]);
  const count = Object.keys(addressMap.PIP).length;
  const dataMap = new Map();
  const values = data[0][1];

  RWAIlks.forEach((ilk, i) => {
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

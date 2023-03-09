import { Contract } from 'ethers';
import { buildContract } from '../loadData/useEthCall';

export const getTokeNameFromIlkName = (ilk: string) => {
  if (ilk === 'DIRECT-AAVEV2-DAI') return 'ADAI';
  if (ilk === 'PSM-PAX-A') return 'PSM-PAX';

  const ilkArray = ilk.split('-');

  const tmp = ilkArray.slice(0, -1);

  return tmp.length ? tmp.join('-') : ilk;
};

export function getCollateralsTokenKeys(addresses: Record<string, string>) {
  return Object.entries(addresses)
    .filter(([key]) => /PIP_.*/.test(key) || /MCD_PSM_.*/.test(key))
    .map(([key]) =>
      key
        .replace('PIP_', '')
        .replace('MCD_', '')
        .replace('_A', '')
        .replace('_B', '')
        .replace('_C', ''),
    );
}

export function getCollateralsKeys(addresses: Record<string, string>) {
  return Object.entries(addresses).filter(([key]) => /MCD_JOIN_(.*)/.test(key) && key !== 'MCD_JOIN_TELEPORT_FW_A')
    .map(([key]) => key.replace('MCD_JOIN_', '').split('_').join('-'))
    .filter((key) => !['DAI'].includes(key));
}

export function getCollateralsJoinAddress(addresses: Record<string, string>) {
  const dataMap = new Map();

  Object.entries(addresses).filter(([key]) => /MCD_JOIN_(.*)/.test(key) && key !== 'MCD_JOIN_TELEPORT_FW_A')
    .forEach(([key]) => {
      const add = key.replace('MCD_JOIN_', '');
      dataMap.set(add, addresses[key]);
    });

  return dataMap;
}

export function getCollateralsAddresses(addresses: Record<string, string>) {
  const dataMap = new Map();
  Object.entries(addresses)
    .filter(([key]) => /MCD_JOIN_(.*)/.test(key) && key !== 'MCD_JOIN_TELEPORT_FW_A')
    .filter(([key]) => !['DAI'].includes(key))
    .forEach(([key]) => {
      const asset = key.replace('MCD_JOIN_', '').split('_').join('-');
      dataMap.set(asset, addresses[key]);
    });
  return dataMap;
}

export function getCollateralsPipsAddress(addresses: Record<string, string>): Map<string, string> {
  const dataMap = new Map();

  Object.entries(addresses).filter(([key]) => /PIP_.*/.test(key) || /MCD_PSM_.*/.test(key))
    .forEach(([key]) => {
      const add = key
        .replace('PIP_', '')
        .replace('MCD_', '')
        .replace('_A', '')
        .replace('_B', '')
        .replace('_C', '');

        dataMap.set(add, addresses[key]);
    });

  return dataMap;
}

export function getCollateralsTokenAddress(addresses: Record<string, string>) {
  const dataMap = new Map();

  getCollateralsTokenKeys(addresses)
    .forEach((address) => { dataMap.set(address, addresses[address]); });

  return dataMap;
}

export function getContractFromTokens(addresses: Record<string, string>) {
  const contractsMap = new Map();

  const tokens: string[] = getCollateralsTokenKeys(addresses);

  const collateralsAddress: Map<string, string> = getCollateralsPipsAddress(addresses);

  const contracts: Contract[] = tokens.map(
    (ilk: string) => buildContract((collateralsAddress.get(ilk) as string), 'erc20a'),
  );

  tokens.forEach((token, i) => {
    contractsMap.set(token, contracts[i]);
  });

  return contractsMap as Map<string, Contract>;
}

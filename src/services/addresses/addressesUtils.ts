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
    .filter(([key]) => key !== 'ETH')
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
  return Object.entries(addresses)
    .filter(([key]) => /MCD_JOIN_(.*)/.test(key))
    .map(([key]) => key.replace('MCD_JOIN_', '').replaceAll('_', '-'))
    .filter((key) => !['DAI'].includes(key));
}

export function getCollateralsAddresses(addresses: Record<string, string>) {
  const dataMap = new Map();
  Object.entries(addresses)
    .filter(([key]) => /MCD_JOIN_(.*)/.test(key))
    .filter(([key]) => !['DAI'].includes(key))
    .forEach(([key]) => {
      const asset = key.replace('MCD_JOIN_', '').replaceAll('_', '-');
      dataMap.set(asset, addresses[key]);
    });
  return dataMap;
}

export function getCollateralsPipsAddress(addresses: Record<string, string>) {
  const dataMap = new Map();
  Object.entries(addresses)
    .filter(([key]) => /PIP_.*/.test(key) || /MCD_PSM_.*/.test(key))
    .filter(([key]) => key !== 'ETH')
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

export function getCollateralsJoinAddress(addresses: Record<string, string>) {
  const dataMap = new Map();
  Object.entries(addresses)
    .filter(([key]) => /MCD_JOIN_(.*)/.test(key))
    .filter(([key]) => key !== 'ETH')
    .forEach(([key]) => {
      const add = key.replace('MCD_JOIN_', '');
      dataMap.set(add, addresses[key]);
    });
  return dataMap;
}

export function getCollateralsTokenAddress(addresses: Record<string, string>) {
  const dataMap = new Map();
  getCollateralsTokenKeys(addresses).forEach((address) => {
    dataMap.set(address, addresses[address]);
  });
  return dataMap;
}

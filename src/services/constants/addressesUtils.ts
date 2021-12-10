export const getTokeNameFromIlkName = (ilk: string) => {
  if (ilk === 'DIRECT-AAVEV2-DAI') return 'ADAI';
  const ilkArray = ilk.split('-');
  const tmp = ilkArray.slice(0, -1);
  return tmp.length ? tmp.join('-') : ilk;
};

export function getCollateralsTokenKeys(addresses: Record<string, string>) {
  return Object.entries(addresses)
    .filter(([key]) => /PIP_.*/.test(key))
    .filter(([key]) => key !== 'ETH')
    .map(([key]) => key.replace('PIP_', ''));
}

export function getCollateralsAddress(addresses: Record<string, string>) {
  const dataMap = new Map();
  Object.entries(addresses)
    .filter(([key]) => /PIP_.*/.test(key))
    .filter(([key]) => key !== 'ETH')
    .forEach(([key]) => {
      const add = key.replace('PIP_', '');
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

export function getCollateralJoinContracts(addresses: Record<string, string>) {
  return Object.entries(addresses)
    .filter(([key]) => /MCD_JOIN_(.*)/.test(key))
    .map(([key, address]) => [
      key.replace('MCD_JOIN_', '').replace('_', '-'),
      address,
    ])
    .reduce(
      (acc, [ilk, address]) => ({ ...acc, [ilk]: address }),
      {} as Record<string, string>,
    );
}

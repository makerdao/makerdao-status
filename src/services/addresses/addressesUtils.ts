import * as ERC20 from '../abi/maker/ERC20.json';

export const getTokeNameFromIlkName = (ilk: string) => {
  if (ilk === 'DIRECT-AAVEV2-DAI') return 'ADAI';
  const ilkArray = ilk.split('-');
  const tmp = ilkArray.slice(0, -1);
  return tmp.length ? tmp.join('-') : ilk;
};

export function getCollateralsKeys(addresses: Record<string, string>) {
  return Object.entries(addresses)
    .filter(([key]) => /PIP_.*/.test(key))
    .filter(([key]) => key !== 'ETH')
    .map(([key]) => key.replace('PIP_', ''));
}

export function getCollateralTokens(addresses: Record<string, string>) {
  return getCollateralsKeys(addresses)
    .map((token) => ({ [token]: { abi: ERC20, address: addresses[token] } }))
    .reduce((acc, v) => ({ ...acc, ...v }), {});
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

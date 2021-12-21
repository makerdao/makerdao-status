/* eslint-disable @typescript-eslint/no-explicit-any */

export function getEtherscanContractLinkFromAddress(
  addresses: any,
  contract: string | number,
) {
  const contractAddress = (addresses as any)[contract] || contract;
  return `https://etherscan.io/address/${contractAddress}`;
}

export function getEtherscanAddressLinkFromHash(value: string) {
  return `https://etherscan.io/address/${value}`;
}

export function getEtherscanTokenLinkFromHash(value: string) {
  return `https://etherscan.io/token/${value}`;
}

export function getIpfsLinkFromHash(value: string) {
  return `https://ipfs.io/ipfs/${value}`;
}

/* eslint-disable @typescript-eslint/no-explicit-any */

export function getEtherscanContractLinkFromAddress(
  addresses: any,
  contract: string | number,
) {
  const contractAddress = (addresses as any)[contract] || contract;
  return `https://etherscan.io/address/${contractAddress}`;
}

export function getEtherscanTxLinkFromHash(value: string) {
  return `https://etherscan.io/tx/${value}`;
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

export const EXEC_PROPOSAL_INDEX =
  'https://raw.githubusercontent.com/makerdao/community/master/governance/votes/active/proposals.json';

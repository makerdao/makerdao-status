/* eslint-disable @typescript-eslint/no-explicit-any */
export async function fetchSpellMetadata() {
  const metadataUrl =
    'https://cms-gov.makerfoundation.com/content/all-spells?network=mainnet';
  const response = await fetch(metadataUrl);
  const json = await response.json();
  return json;
}

export function getEtherscanLinkFromAddress(
  addresses: any,
  contract: string | number,
) {
  const contractAddress = (addresses as any)[contract] || contract;
  return `https://etherscan.io/address/${contractAddress}`;
}

export function getEtherscanLinkFromHash(value: any) {
  return `https://etherscan.io/address/${value}`;
}

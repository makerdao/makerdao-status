// eslint-disable-next-line import/prefer-default-export
export async function fetchSpellMetadata() {
  const metadataUrl =
    'https://cms-gov.makerfoundation.com/content/all-spells?network=mainnet';
  const response = await fetch(metadataUrl);
  const json = await response.json();
  return json;
}

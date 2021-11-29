// eslint-disable-next-line import/prefer-default-export
export const getCollateralNameFromVaultIdentifier = (
  vaultIdentifier: string,
) => {
  const collateralParts = vaultIdentifier.split('-');
  const collateralPart =
    collateralParts.length >= 2
      ? collateralParts.slice(0, collateralParts.length - 1).join('-')
      : collateralParts[0];

  const collateralGroups = ['UNIV2', 'BTC', 'USD'];
  const collateralGroup = collateralGroups.find(
    (g) => collateralPart.indexOf(g) >= 0,
  );

  return collateralGroup ?? collateralPart;
};

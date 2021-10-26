import { useState } from 'react';

let collateralsConfigImported = { filters: [], categories: [] };
try {
  // eslint-disable-next-line global-require
  collateralsConfigImported = require('../../collateral-structure.yaml');
} catch (error) {
  collateralsConfigImported = { filters: [], categories: [] };
}

// eslint-disable-next-line import/prefer-default-export
export const useLoadConfigs = () => {
  const [collateralsConfig] = useState<
    | {
        filters?: Definitions.CollateralFilter[];
        categories?: Definitions.CollateralCategory[];
      }
    | undefined
  >(collateralsConfigImported);

  return { collateralsConfig };
};

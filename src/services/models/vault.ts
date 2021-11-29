import { parseDaiSupply } from '../utils/mathUtils';

const factoryVaults = (data: Definitions.Ilk) => ({
  id: Math.random(),
  ilk: data.id,
  identifier: data.id,
  name: data.id,
  dai: data.art != null ? parseDaiSupply(data.art, data.rate) : 0,
});

export default factoryVaults;

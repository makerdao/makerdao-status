import Maker from '@makerdao/dai';
import GovernancePlugin, { MKR } from '@makerdao/dai-plugin-governance';
import McdPlugin from '@makerdao/dai-plugin-mcd';
import { MakerClass } from '@makerdao/dai/dist/Maker';
import { infuraKey } from '../providers';
import { SupportedNetworks } from '../utils/constants';

export const { ETH } = Maker.currencies;
export const { USD } = Maker.currencies;
export { MKR };

type MakerSingletons = {
  [SupportedNetworks.MAINNET]: undefined | Promise<MakerClass>;
  [SupportedNetworks.KOVAN]: undefined | Promise<MakerClass>;
  [SupportedNetworks.GOERLI]: undefined | Promise<MakerClass>;
  [SupportedNetworks.TESTNET]: undefined | Promise<MakerClass>;
};

const makerSingletons: MakerSingletons = {
  [SupportedNetworks.MAINNET]: undefined,
  [SupportedNetworks.KOVAN]: undefined,
  [SupportedNetworks.GOERLI]: undefined,
  [SupportedNetworks.TESTNET]: undefined,
};

async function getMaker(network?: SupportedNetworks): Promise<MakerClass> {
  const currentNetwork = network || SupportedNetworks.MAINNET;

  if (!makerSingletons[currentNetwork]) {
    const instance = Maker.create('http', {
      plugins: [
        [McdPlugin, { prefetch: false }],
        [GovernancePlugin, { network: currentNetwork, staging: true }],
      ],
      provider: {
        url: `https://mainnet.infura.io/v3/${infuraKey}`,
        type: 'HTTP',
      },
      web3: {
        pollingInterval: null,
      },
      log: false,
      multicall: true,
    });

    makerSingletons[currentNetwork] = instance;
  }

  return makerSingletons[currentNetwork] as Promise<MakerClass>;
}

export default getMaker;

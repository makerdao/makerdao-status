/* eslint-disable import/prefer-default-export */
import { InfuraProvider } from '@ethersproject/providers';
import { infuraKey } from './constants/infuraKey';

export const infuraCurrentProvider = new InfuraProvider('mainnet', infuraKey);

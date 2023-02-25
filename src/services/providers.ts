// import { InfuraProvider } from '@ethersproject/providers';
// export const infuraKey = "2c010c2fdb8b4ef1a7617571553fc982";
// export const infuraCurrentProvider = new InfuraProvider('mainnet', infuraKey);
import { ethers } from 'ethers';

export const infuraKey = '30b97714b3d04bedad988cd6c00bfea5';

export const infuraCurrentProvider = new ethers.providers.InfuraProvider('mainnet', infuraKey);

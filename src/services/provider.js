import { InfuraProvider } from "@ethersproject/providers";
import { infuraKey } from "../constants/infuraKey";


export  const provider = new InfuraProvider("mainnet", infuraKey);

import { InfuraProvider } from "@ethersproject/providers";
import { infuraKey } from "../utils/constants/infuraKey";


export  const provider = new InfuraProvider("mainnet", infuraKey);

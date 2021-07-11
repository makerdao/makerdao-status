import { Provider } from "ethcall";
import { formatDuration, formatWadRate } from "../utils/formatsFunctions";
import { flapContract, flopContract } from "./Contracts";
import { provider } from "./provider";

export default async function loadFlapFlop() {
  const ethcallProvider = new Provider();
  await ethcallProvider.init(provider);

  const flapBegCall = flapContract.beg();
  const flapTtlCall = flapContract.ttl();
  const flapTauCall = flapContract.tau();
  const flopBegCall = flopContract.beg();
  const flopTtlCall = flopContract.ttl();
  const flopTauCall = flopContract.tau();
  const flopPadCall = flopContract.pad();

  const calls = [
    flapBegCall,
    flapTtlCall,
    flapTauCall,
    flopBegCall,
    flopTtlCall,
    flopTauCall,
    flopPadCall,
  ];

  const data = await ethcallProvider.all(calls);

  const state = {
    flapBeg: formatWadRate(data[0].toString()),
    flapTtl: formatDuration(data[1]),
    flapTau: formatDuration(data[2]),

    flopBeg: formatWadRate(data[3].toString()),
    flopTtl: formatDuration(data[4]),
    flopTau: formatDuration(data[5]),
    flopPad: formatWadRate(data[6].toString()),
  };

  return state;
}

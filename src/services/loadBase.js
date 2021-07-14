import { Provider } from "ethcall";
import {
  formatDaiAmount,
  formatFee,
  formatWadRate,
} from "./utils/formatsFunctions";
import {
  catContract,
  jugContract,
  potContract,
  vatContract,
} from "./Contracts";
import { provider } from "./provider";

export default async function loadBase() {
  const ethcallProvider = new Provider();
  await ethcallProvider.init(provider);

  const vatLineCall = vatContract.Line();
  const jugBaseCall = jugContract.base();
  const potDsrCall = potContract.dsr();
  const catBoxCall = catContract.box();

  const data = await ethcallProvider.all([
    vatLineCall,
    jugBaseCall,
    potDsrCall,
    catBoxCall,
  ]);

  const state = {
    vatLine: formatDaiAmount(data[0].toString()) + " DAI",
    jugBase: formatWadRate(data[1].toString()),
    potDsr: formatFee(data[2].toString()),
    catBox: formatDaiAmount(data[3].toString()),
  };

  return state;
}

import { Provider } from "ethcall";
import {
  formatAmount,
  formatDaiAmount,
  formatDuration,
} from "./utils/formatsFunctions";
import { vowContract } from "./Contracts";
import { provider } from "./provider";

export default async function loadVow() {
  const ethcallProvider = new Provider();
  await ethcallProvider.init(provider);

  const humpCall = vowContract.hump();
  const bumpCall = vowContract.bump();
  const sumpCall = vowContract.sump();
  const dumpCall = vowContract.dump();
  const waitCall = vowContract.wait();

  const calls = [humpCall, bumpCall, sumpCall, dumpCall, waitCall];

  const data = await ethcallProvider.all(calls);

  const state = {
    hump: formatDaiAmount(data[0].toString()) + " DAI",
    bump: formatDaiAmount(data[1].toString()) + " DAI",
    sump: formatDaiAmount(data[2].toString()) + " DAI",
    dump: formatAmount(data[3].toString()) + " MKR",
    wait: formatDuration(data[4].toNumber()),
  };
  return state;
}

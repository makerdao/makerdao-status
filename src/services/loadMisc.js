import { Provider } from "ethcall";
import { endContract, esmContract, pauseContract } from "./Contracts";
import { formatAmount, formatDuration } from "../utils/formatsFunctions";
import { provider } from "./provider";

export async function loadMisc() {
  const ethcallProvider = new Provider();
  await ethcallProvider.init(provider);

  const pauseDelayCall = pauseContract.delay();
  const esmMinCall = esmContract.min();
  const endWaitCall = endContract.wait();

  const calls = [pauseDelayCall, esmMinCall, endWaitCall];

  const data = await ethcallProvider.all(calls);
  const pauseDelay = data[0];
  const esmMin = data[1];
  const endWait = data[2];

  let state = {
    pauseDelay: formatDuration(pauseDelay.toNumber()),
    esmMin: formatAmount(esmMin.toString()),
    endWait: formatDuration(endWait.toNumber()),
  };

  return state;
}

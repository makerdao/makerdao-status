import { Contract, Provider } from 'ethcall';
import flipAbi from './abi/maker/flip.json';
import { addressMap } from './addresses/addresses';
import { infuraCurrentProvider } from './infura';

export default async function loadFlips() {
  const ethcallProvider = new Provider();
  await ethcallProvider.init(infuraCurrentProvider);

  const flipIds = Object.keys(addressMap.FLIP);
  const count = flipIds.length;
  const flipContracts = flipIds.map((flipId) => {
    const flipAddress = (addressMap.FLIP as Record<string, string>)[flipId];
    const flipContract = new Contract(flipAddress, flipAbi);
    return flipContract;
  });
  const begCalls = flipContracts.map((flipContract) => {
    const begCall = flipContract.beg();
    return begCall;
  });
  const ttlCalls = flipContracts.map((flipContract) => {
    const ttlCall = flipContract.ttl();
    return ttlCall;
  });
  const tauCalls = flipContracts.map((flipContract) => {
    const tauCall = flipContract.tau();
    return tauCall;
  });
  const flipCalls = begCalls.concat(ttlCalls).concat(tauCalls);

  const data = await ethcallProvider.all(flipCalls);
  return flipIds.map((id) => {
    const index = flipIds.indexOf(id);
    return {
      id: `flip-${id}`,
      asset: id,
      beg: data[index].toString(),
      ttl: data[count + index],
      tau: data[2 * count + index],
    };
  });
}

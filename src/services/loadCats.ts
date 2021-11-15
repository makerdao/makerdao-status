import { formatBytes32String } from '@ethersproject/strings';
import { Provider } from 'ethcall';
import { addressMap } from './constants/addresses';
import { catContract } from './Contracts';
import { infuraCurrentProvider } from './infura';

export default async function loadCats() {
  const ethcallProvider = new Provider();
  await ethcallProvider.init(infuraCurrentProvider);
  const ilkIds = Object.keys(addressMap.ILKS);
  const caltIdBytes = ilkIds.map((id) => formatBytes32String(id));
  const catIlkCalls = caltIdBytes.map((ilk) => catContract.ilks(ilk));

  const data = await ethcallProvider.all(catIlkCalls);
  return ilkIds.map((id) => {
    const index = ilkIds.indexOf(id);
    const cat = data[index];
    return {
      id: `cat-${id}`,
      asset: id,
      chop: cat.chop.toString(),
      dunk: cat.dunk.toString(),
    };
  });
}

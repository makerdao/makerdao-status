import { formatBytes32String } from '@ethersproject/strings';
import { Provider, Contract } from 'ethcall';
import { addressMap } from '../addresses/addresses';
import { infuraCurrentProvider } from '../providers';
import changelog from '../addresses/changelog.json';
import catAbi from '../abi/maker/cat.json';

const catContract = new Contract(changelog.MCD_CAT, catAbi);

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

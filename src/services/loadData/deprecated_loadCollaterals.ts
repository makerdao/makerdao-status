/* eslint-disable @typescript-eslint/naming-convention */
import { Provider } from 'ethcall';
import { ethers } from 'ethers';
import { deprecated_ilkIds } from '../constants/deprecated_ilkIds';
import {
  jugContract,
  spotContract,
  vatContract,
} from '../contracts/contractsUtils';
import { infuraCurrentProvider } from '../infura';

const { formatEther, formatUnits, formatBytes32String } = ethers.utils;

export default async function deprecated_loadCollaterals() {
  const ethcallProvider = new Provider();
  await ethcallProvider.init(infuraCurrentProvider);
  const count = deprecated_ilkIds.length;
  const collateralIdBytes = deprecated_ilkIds.map((id: string) =>
    formatBytes32String(id),
  );
  const jugIlkCalls = collateralIdBytes.map((ilk: string) =>
    jugContract.ilks(ilk),
  );
  const vatIlkCalls = collateralIdBytes.map((ilk: string) =>
    vatContract.ilks(ilk),
  );
  const spotIlkCalls = collateralIdBytes.map((ilk: string) =>
    spotContract.ilks(ilk),
  );
  const ilkCalls = jugIlkCalls.concat(vatIlkCalls).concat(spotIlkCalls);
  const data = await ethcallProvider.all(ilkCalls);

  return deprecated_ilkIds.map((id: string) => {
    const index = deprecated_ilkIds.indexOf(id);
    return {
      id: `ilk-${id}`,
      address: ilkCalls[index].contract.address,
      asset: id,
      art: formatEther(data[count + index].Art),
      rate: formatUnits(data[count + index].rate, 27),
      duty: data[index].duty.toString(),
      line: data[count + index].line.toString(),
      dust: data[count + index].dust.toString(),
      mat: data[2 * count + index].mat.toString(),
    };
  });
}

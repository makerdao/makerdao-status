/* eslint-disable no-console */
import { Provider } from 'ethcall';
import { Call } from 'ethcall/lib/call';
import { ethers } from 'ethers';

export default function tryAll(provider: Provider, calls: Call[]) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return new Promise<any[]>((resolve) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const responses: any[] = Array.from({ length: calls.length });
    let count = 0;

    calls.forEach(async (call, index) => {
      const response = await provider.all([call]).catch((error) => {
        console.log('Error trying execute call', index, call);
        console.error(error);
        return [ethers.BigNumber.from('0')];
      });
      // eslint-disable-next-line prefer-destructuring
      responses[index] = response[0];

      // eslint-disable-next-line no-plusplus
      if (++count === calls.length) {
        resolve(responses);
      }
    });
  });
}

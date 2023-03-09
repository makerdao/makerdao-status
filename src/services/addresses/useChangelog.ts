import { useEffect, useState } from 'react';
import axios from 'axios';

const URL = 'https://chainlog.makerdao.com/api/mainnet/active.json';

const PreviousAddresses = {
  // MCD_CLIP_CALC_GUSD_A: '0xF7e80359Cb9C4E6D178E6689eD8A6A6f91060747',
  // MCD_CLIP_CALC_PAXUSD_A: '0xAB98De83840b8367046383D2Adef9959E130923e',
  // MCD_CLIP_CALC_TUSD_A: '0x059acdf311E38aAF77139638228d393Ff27639bF',
  // MCD_CLIP_CALC_USDC_A: '0x0FCa4ba0B80123b5d22dD3C8BF595F3E561d594D',
  // MCD_FLASH: '0x1EB4CF3A948E7D72A198fe073cCb8C7a948cD853',
  // FAUCET: '0x0000000000000000000000000000000000000000',
  // MCD_CLIP_CALC_DIRECT_AAVEV2_DAI: '0x786DC9b69abeA503fd101a2A9fa95bcE82C20d0A',
  // MCD_CLIP_DIRECT_AAVEV2_DAI: '0xa93b98e57dDe14A3E301f20933d59DC19BF8212E',
  // MCD_JOIN_DIRECT_AAVEV2_DAI: '0xa13C0c8eB109F5A13c6c90FC26AFb23bEB3Fb04a',
};

const useChangelog = () => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | undefined>();

  useEffect(() => {
    axios.get(URL)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .then((res: any) => {
        setData({ ...res.data, ...PreviousAddresses });
        setLoading(false);
      })
      .catch(() => setError('Error'));
  }, []);

  return { data, loading, error };
};

export default useChangelog;

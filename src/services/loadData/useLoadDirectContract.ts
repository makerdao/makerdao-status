/* eslint-disable @typescript-eslint/no-explicit-any */
import { Contract, Provider } from 'ethcall';
import { ethers } from 'ethers';
import { useEffect, useState } from 'react';
import { useChangelogContext } from '../../context/ChangelogContext';
import DssDirectDepositAaveDai from '../abi/maker/DssDirectDepositAaveDai.json';
import { infuraCurrentProvider } from '../providers';
import { formatDuration } from '../utils/formatsFunctions';

const { formatUnits } = ethers.utils;

const useLoadDirectContract = () => {
  const [directMap, setData] = useState<Map<any, any>>(new Map());
  const [loading, setLoading] = useState(false);
  const {
    state: { changelog },
    loading: loadingChangelog,
  } = useChangelogContext();

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      const d3mAdaiContract = new Contract(
        changelog.MCD_JOIN_DIRECT_AAVEV2_DAI,
        DssDirectDepositAaveDai,
      );
      const ethcallProvider = new Provider();

      await ethcallProvider.init(infuraCurrentProvider);
      const data = await ethcallProvider.all([
        d3mAdaiContract.bar(),
        d3mAdaiContract.tau(),
      ]);
      const newMap = new Map();
      newMap.set('DIRECT-AAVEV2-DAI--bar', formatUnits(data[0], 25));
      newMap.set('DIRECT-AAVEV2-DAI--tau', formatDuration(data[1]));
      setData(newMap);
      setLoading(false);
    };

    if (changelog) loadData();
  }, [changelog]);

  return {
    directMap,
    loading: loading || loadingChangelog,
  };
};

export default useLoadDirectContract;

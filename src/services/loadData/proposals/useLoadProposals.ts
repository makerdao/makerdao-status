import { useEffect, useMemo, useState } from 'react';
import { getExecutiveProposals } from './fetchExecutives';

// eslint-disable-next-line import/prefer-default-export
const useLoadProposals = () => {
  const [proposals, setProposals] = useState<Definitions.CMSProposal[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  useEffect(() => {
    const getProposals = async () => {
      try {
        setLoading(true);
        const proposalsTmp = await getExecutiveProposals();
        setProposals(proposalsTmp);
        setLoading(false);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        setError(err?.message || '');
      }
    };
    getProposals();
  }, []);

  const proposalsMap = useMemo(() => {
    const dataMap = new Map<string, Definitions.CMSProposal>();
    proposals.forEach((ele) => {
      dataMap.set(ele.address, ele);
    });
    return dataMap;
  }, [proposals]);

  return { proposals, proposalsMap, loading, error };
};

export default useLoadProposals;

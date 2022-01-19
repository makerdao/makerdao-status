/* eslint-disable @typescript-eslint/no-explicit-any */

import { useEffect, useMemo, useState } from 'react';
import getMaker from '../../maker/getMaker';
import getSpells from './getSpells';

// eslint-disable-next-line import/prefer-default-export
export const useLoadSpell = (addresses: string[]) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error>();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [spells, setSpells] = useState<Definitions.SpellData[]>([]);
  useEffect(() => {
    const getSpellsData = async () => {
      setLoading(true);
      const maker = await getMaker();

      const spellData = (
        await Promise.all(
          // eslint-disable-next-line consistent-return
          addresses.map(async (address) => {
            try {
              return await getSpells(address, maker);
            } catch (err: any) {
              setError(err);
            }
          }),
        )
      ).filter((x) => x) as Definitions.SpellData[];
      setSpells(spellData);
      setLoading(false);
    };
    getSpellsData();
  }, [addresses]);

  const spellsMap = useMemo(() => {
    const dataMap = new Map<string, Definitions.SpellData>();
    spells.forEach((ele) => {
      dataMap.set(ele.address, ele);
    });
    return dataMap;
  }, [spells]);

  return { spells, spellsMap, loading, error };
};

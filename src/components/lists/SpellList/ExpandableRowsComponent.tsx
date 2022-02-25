import React, { useCallback, useEffect, useState } from 'react';
import { getChanges } from '../../../services/loadData/spells/useGetSpells';
import transformSpellChanges from '../../../services/utils/transformSpellChanges';
import ChangeList from './ChangeList';

interface PropsExpandableRowsComponent {
  data: Definitions.Spell & { id: number };
  onClose: (id: string) => () => void;
}

const ExpandableRowsComponent = ({
  onClose,
  data: rowData,
}: PropsExpandableRowsComponent) => {
  const [changes, setChanges] = useState<Definitions.SpellChange[]>([]);
  const [loading, setLoading] = useState(false);
  const { id, spell, impact } = rowData;

  const testApiCall = useCallback(async () => {
    setLoading(true);

    const spellsChanges = await getChanges({ spell });

    const transformedChanges = transformSpellChanges(spellsChanges);

    setChanges(transformedChanges as unknown as Definitions.SpellChange[]);

    setLoading(false);
  }, [spell]);

  useEffect(() => {
    if (impact) {
      testApiCall();
    }
  }, [impact, testApiCall]);

  return impact ? (
    <ChangeList changes={changes} onClose={onClose(id)} loading={loading} />
  ) : null;
};

export default ExpandableRowsComponent;

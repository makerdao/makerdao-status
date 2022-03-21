import React from 'react';
import useLoadChanges from '../../../services/loadData/spells/useLoadChanges';
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
  const { id, spell, impact } = rowData;
  const { changes, loading } = useLoadChanges({ spell });

  return impact ? (
    <ChangeList
      changes={
        transformSpellChanges(changes || []) as Definitions.SpellChange[]
      }
      onClose={onClose(id)}
      loading={loading}
    />
  ) : null;
};

export default ExpandableRowsComponent;

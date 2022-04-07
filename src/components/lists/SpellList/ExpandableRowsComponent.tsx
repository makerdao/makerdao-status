import moment from 'moment';
import React, { useMemo } from 'react';
import { useHistory } from 'react-router-dom';
import useLoadChanges from '../../../services/loadData/spells/useLoadChanges';
import { defaultPageLimit } from '../../../services/utils/constants';
import transformSpellChanges from '../../../services/utils/transformSpellChanges';
import ChangeList from './ChangeList';

interface PropsExpandableRowsComponent {
  data: Definitions.Spell & { id: number };
  onClose: (id: string) => () => void;
}

const format = 'YYYY-MM-DD';

const ExpandableRowsComponent = ({
  onClose,
  data: rowData,
}: PropsExpandableRowsComponent) => {
  const { id, spell, impact } = rowData;

  const {
    location: { search: urlQuery },
  } = useHistory();

  const urlSearchParams = useMemo(() => {
    const startDateParam =
      new URLSearchParams(urlQuery).get('startDate') || undefined;
    const endDateParam =
      new URLSearchParams(urlQuery).get('endDate') || undefined;
    const search = new URLSearchParams(urlQuery).get('search') || '';
    const selectedSpell =
      new URLSearchParams(urlQuery).get('selectedSpell') || '';
    const ilk = new URLSearchParams(urlQuery).get('ilk') || '';
    const parameter = new URLSearchParams(urlQuery).get('parameter') || '';
    const limit = (new URLSearchParams(urlQuery).get('limit') ||
      defaultPageLimit) as number;
    const skip = (new URLSearchParams(urlQuery).get('skip') || 0) as number;

    return {
      startDate: startDateParam ? moment(startDateParam, format) : undefined,
      endDate: endDateParam ? moment(endDateParam, format) : undefined,
      search,
      selectedSpell,
      ilk,
      parameter,
      limit,
      skip,
    };
  }, [urlQuery]);

  const { ilk, parameter } = urlSearchParams;

  const { changes, loading } = useLoadChanges({ spell, ilk, parameter });

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

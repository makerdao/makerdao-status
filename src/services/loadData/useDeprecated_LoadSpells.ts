/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery } from '@apollo/client';
import { useMemo } from 'react';
import { useChangelogContext } from '../../context/ChangelogContext';
import apolloClients from '../apolloClients';
import { getSpellsChangesQuery } from '../queries';
import {
  getAssetFromParam,
  getParamName,
  getSpellStatus,
  getTermName,
  getValue,
  Status,
} from '../utils/formatsFunctions';
import useLoadProposals from './proposals/useLoadProposals';
import { useLoadSpell } from './spells/useLoadSpells';

// eslint-disable-next-line import/prefer-default-export
export const useDeprecatedLoadSpell = () => {
  const {
    state: { changelog = {} },
    loading: loadingChangelog,
  } = useChangelogContext();
  const {
    proposals,
    proposalsMap,
    loading: loadingProposals,
  } = useLoadProposals();
  const addresses = useMemo(() => proposals.map((m) => m.address), [proposals]);

  const { spells: spellsData, loading: loadingData } = useLoadSpell(addresses);

  const { data: changesResponse, loading: loadingChanges } = useQuery(
    getSpellsChangesQuery,
    {
      client: apolloClients.MakerClient,
    },
  );

  const changes = useMemo(
    () => (changesResponse?.changes as any[]) || [],
    [changesResponse?.changes],
  );

  const changeMap = useMemo(() => {
    const oldValuesRegister = {} as Record<any, any>;
    const changeMapVar = new Map();
    if (!changes.length || loadingChanges) {
      return changeMapVar;
    }
    // eslint-disable-next-line no-restricted-syntax
    for (const change of changes) {
      const { id, timestamp, param, value } = change;

      const oldValueFormatted = getValue(
        param,
        oldValuesRegister[param],
        changelog,
      );
      const newValueFormatted = getValue(param, value, changelog);
      if (
        oldValueFormatted === newValueFormatted &&
        oldValueFormatted !== undefined
      ) {
        // eslint-disable-next-line no-continue
        continue;
      }
      const currItems = changeMapVar.get(timestamp) || [];

      changeMapVar.set(timestamp, [
        ...currItems,
        {
          id,
          param: getParamName(param, changelog),
          term: getTermName(param, changelog),
          oldValueFormatted,
          newValueFormatted,
          value,
          asset: getAssetFromParam(param, changelog),
        },
      ]);
      oldValuesRegister[param] = value;
    }
    return changeMapVar;
  }, [changelog, changes, loadingChanges]);

  const spells = useMemo(() => {
    const changesTransactions = [
      ...(new Set(
        changes?.map((change: { txHash: string }) => change.txHash),
      ) as any),
    ];
    const spellsFromChanges = changesTransactions?.map((txHash) => {
      const sc = changes?.filter(
        (change: { txHash: string }) => change.txHash === txHash,
      );
      const timestamp = sc && sc.length ? sc[0].timestamp : '';
      const spellChanges = changeMap.get(timestamp) || [];
      return {
        id: `${timestamp.toString()}-${Math.random()}`,
        status: Status.Pending as Definitions.Status,
        address: '',
        title: '',
        created: timestamp.toString(),
        casted: timestamp.toString(),
        changes: spellChanges,
      };
    });

    const latestSpell = !!spellsData?.length && spellsData[0];
    const latestPassedSpell =
      !!spellsData?.length &&
      spellsData?.filter((spell) => spell.hasBeenCast)[0];
    const metadataSpells = spellsData.map((subgraphSpell) => {
      const {
        address,
        dateExecuted,
        datePassed: lifted,
        hasBeenScheduled: casted,
      } = subgraphSpell;

      const status = getSpellStatus(
        address,
        latestSpell,
        latestPassedSpell,
        lifted,
      ) as Definitions.Status;
      const currMetadata = proposalsMap.get(address);

      const title = currMetadata ? currMetadata.title : 'Spell';
      const changesMap = changeMap.get(casted) || [];
      return {
        id: address,
        status,
        address,
        title,
        created: dateExecuted?.getTime(),
        casted,
        changes: changesMap,
      };
    });

    const spellsLocal = [...spellsFromChanges, ...metadataSpells];

    // eslint-disable-next-line no-confusing-arrow
    const spellSort = spellsLocal.sort((a, b) =>
      a.created < b.created ? 1 : -1,
    );

    return spellSort;
  }, [changeMap, changes, proposalsMap, spellsData]);

  return {
    spells,
    loading:
      loadingChanges || loadingData || loadingProposals || loadingChangelog,
  };
};

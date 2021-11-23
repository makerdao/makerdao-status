/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery } from '@apollo/client';
import { useMemo } from 'react';
import apolloClients from './apolloClients';
import {
  getSpellsQuery,
  getSpellsChangesQuery,
  getSpellsMetadataQuery,
} from './queries';
import {
  getAssetFromParam,
  getParamName,
  getSpellStatus,
  getTermName,
  getValue,
  Status,
} from './utils/formatsFunctions';

// eslint-disable-next-line import/prefer-default-export
export const useLoadSpell = () => {
  const { data: governanceSpellsResponse, loading: loadingSubgraphSpells } =
    useQuery(getSpellsQuery, {
      client: apolloClients.MakerGovernance,
    });

  const { data: changesResponse, loading: loadingChanges } = useQuery(
    getSpellsChangesQuery,
    {
      client: apolloClients.MakerClient,
    },
  );

  const { data: spellMetadata, loading: loadingSpellMetadata } = useQuery(
    getSpellsMetadataQuery,
    {
      client: apolloClients.restClient,
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

      const oldValueFormatted = getValue(param, oldValuesRegister[param]);
      const newValueFormatted = getValue(param, value);
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
          param: getParamName(param),
          term: getTermName(param),
          oldValueFormatted,
          newValueFormatted,
          value,
          asset: getAssetFromParam(param),
        },
      ]);
      oldValuesRegister[param] = value;
    }
    return changeMapVar;
  }, [changes, loadingChanges]);

  const metadataMap = useMemo(() => {
    const metadataMapVar = new Map();
    if (!spellMetadata || !spellMetadata.data || loadingSpellMetadata) {
      return metadataMapVar;
    }
    // eslint-disable-next-line no-restricted-syntax
    for (const metadata of spellMetadata.data) {
      const address = metadata.source.toLowerCase();
      metadataMapVar.set(address, {
        ...metadata,
        // eslint-disable-next-line no-underscore-dangle
        id: metadata._id || `artificialId-${Math.random()}`,
      });
    }
    return metadataMapVar;
  }, [loadingSpellMetadata, spellMetadata]);

  const spells = useMemo(() => {
    const governanceSpells = governanceSpellsResponse?.spells || [];

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
        status: Status.Pending,
        address: '',
        title: '',
        created: timestamp.toString(),
        casted: timestamp.toString(),
        changes: spellChanges,
      };
    });

    const latestSpell = governanceSpells && governanceSpells[0];
    const latestPassedSpell = governanceSpells.filter(
      (spell: any) => spell.casted,
    )[0];
    const metadataSpells = governanceSpells.map((subgraphSpell: any) => {
      const { id: address, timestamp: created, lifted, casted } = subgraphSpell;
      const status = getSpellStatus(
        address,
        latestSpell,
        latestPassedSpell,
        lifted,
      );
      const currMetadata = metadataMap.get(address);
      const title = currMetadata ? currMetadata.title : 'Spell';
      const id =
        address && currMetadata
          ? currMetadata.id
          : `artificialId-${Math.random()}`;
      const changesMap = changeMap.get(casted) || [];
      return {
        id,
        status,
        address,
        title,
        created,
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
  }, [changeMap, changes, governanceSpellsResponse, metadataMap]);

  return {
    spells,
    loading: loadingChanges || loadingSubgraphSpells || loadingSpellMetadata,
  };
};

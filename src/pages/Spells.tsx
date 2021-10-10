/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';

import { useQuery } from '@apollo/client';
import styled from 'styled-components';
import {
  getSpells as getSpellsQuery,
  getSpellsChanges,
} from '../services/queries';
import clients from '../services/apolloClients';
import {
  fetchSpellMetadata,
  getParamName,
  getSpellStatus,
  getTermName,
  getValue,
  Status,
} from '../services/utils/formatsFunctions';
import WrapperPage from '../components/wrappers/WrapperPage';

const { MakerGovernance, MakerClient } = clients;

export default function Spells() {
  const [spells, setSpells] = useState<any[]>([]);
  const { data: subgraphSpellsResponse } = useQuery(getSpellsQuery, {
    client: MakerGovernance,
  });
  console.log('subgraphSpellsResponse', subgraphSpellsResponse);

  const { data: changesResponse } = useQuery(getSpellsChanges, {
    client: MakerClient,
  });

  const getSpells = async () => {
    const subgraphSpells = subgraphSpellsResponse?.spells;
    const changes = changesResponse?.changes as any[] | undefined;
    const spellMetadata = await fetchSpellMetadata();

    console.log('{ changes, subgraphSpells, spellMetadata }', {
      changes,
      subgraphSpells,
      spellMetadata,
    });

    if (
      changes?.length === 0 ||
      subgraphSpells?.length === 0 ||
      spellMetadata?.length === 0
    ) {
      return [];
    }

    const values = {} as Record<any, any>;
    const spellMap = {} as Record<any, any>;

    // eslint-disable-next-line no-restricted-syntax
    for (const change of changes || []) {
      const { id, timestamp, param, value } = change;
      if (!(timestamp in spellMap)) {
        spellMap[timestamp] = [];
      }
      const oldValue = getValue(param, values[param]);
      const newValue = getValue(param, value);
      if (oldValue === newValue) {
        // eslint-disable-next-line no-continue
        continue;
      }
      spellMap[timestamp].push({
        id,
        param: getParamName(param),
        term: getTermName(param),
        oldValue,
        newValue,
      });
      values[param] = value;
    }

    console.log({
      spellMap,
      values,
      lengths: `${Object.keys(spellMap).length} ${Object.keys(values).length}`,
    });

    const metadataMap = {} as Record<any, any>;
    // eslint-disable-next-line no-restricted-syntax
    for (const metadata of spellMetadata) {
      const address = metadata.source.toLowerCase();
      metadataMap[address] = metadata;
    }

    const newSpellChanges = changes?.filter(
      (change: { timestamp: number }) => change.timestamp > 1607349675,
    );
    const newSpellTransactions = [
      ...(new Set(newSpellChanges?.map((change) => change.txHash)) as any),
    ];
    const newSpells = newSpellTransactions?.map((txHash) => {
      const sc = changes?.filter((change) => change.txHash === txHash);
      const timestamp = sc && sc.length ? sc[0].timestamp : '';
      const spellChanges = spellMap[timestamp || ''] || [];
      return {
        status: Status.Pending,
        address: '',
        title: '',
        created: timestamp.toString(),
        casted: timestamp.toString(),
        changes: spellChanges,
      };
    });
    newSpells.reverse();

    const latestSpell = subgraphSpells && subgraphSpells[0];
    const latestPassedSpell = subgraphSpells.filter(
      (spell: any) => spell.casted,
    )[0];
    const metadataSpells = subgraphSpells.map((subgraphSpell: any) => {
      const { id: address, timestamp: created, lifted, casted } = subgraphSpell;
      const status = getSpellStatus(
        address,
        latestSpell,
        latestPassedSpell,
        lifted,
      );
      const title = metadataMap[address] ? metadataMap[address].title : 'Spell';
      const changesMap = spellMap[casted || ''] || [];
      return {
        status,
        address,
        title,
        created,
        casted,
        changes: changesMap,
      };
    });

    const spellsLocal = [...newSpells, ...metadataSpells];
    console.log({ spells: spellsLocal });

    return spells;
  };

  const getData = async () => {
    const spellsGetted = await getSpells();
    setSpells(spellsGetted);
  };
  const readyData = !!(
    subgraphSpellsResponse?.spells && changesResponse?.changes
  );
  useEffect(() => {
    if (readyData) getData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [changesResponse?.changes, subgraphSpellsResponse?.spells]);

  return (
    <WrapperPage header={{ title: 'Spells (changelogs)', iconName: 'spells' }}>
      <Container>
        {readyData && spells.length > 0 && (
          <div>
            <div>{`Spells: ${spells.length}`}</div>
          </div>
        )}
      </Container>
    </WrapperPage>
  );
}

const Container = styled.div`
  margin-left: 70px;
  margin-top: 80px;
`;

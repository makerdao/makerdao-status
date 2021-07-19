
import React, { useEffect, useState } from 'react'

import { useQuery } from '@apollo/client'
import { Maker } from '../services/queries';
import clients from '../services/apolloClients';
import { fetchSpellMetadata, getParamName, getSpellStatus, getTermName, getValue, Status } from '../services/utils/formatsFunctions';

const { MakerGovernance, MakerClient } = clients

export default function Spells() {

    const [spells, setSpells] = useState([])
    const { data: subgraphSpellsResponse } = useQuery(Maker.GET_SPELLS, {
        client: MakerGovernance,
    });

    const { data: changesResponse } = useQuery(Maker.GET_CHANGES, {
        client: MakerClient,
    });

    const getSpells = async () => {
        const subgraphSpells = subgraphSpellsResponse?.spells;
        const changes = changesResponse?.changes;
        const spellMetadata = await fetchSpellMetadata();

        console.log({ changes, subgraphSpells, spellMetadata });

        if (changes?.length === 0 ||
            subgraphSpells?.length === 0 ||
            spellMetadata?.length === 0) {
            return [];
        }

        const values = {};
        const spellMap = {};

        for (let change of changes || []) {
            const { id, timestamp, param, value } = change;
            if (!(timestamp in spellMap)) {
                spellMap[timestamp] = [];
            }
            const oldValue = getValue(param, values[param]);
            const newValue = getValue(param, value);
            if (oldValue === newValue) {
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
console.log({spellMap})
        const metadataMap = {};
        for (const metadata of spellMetadata) {
            const address = metadata.source.toLowerCase();
            metadataMap[address] = metadata;
        }

        const newSpellChanges = changes?.filter(change => change.timestamp > 1607349675);
        const newSpellTransactions = [...new Set(newSpellChanges?.map(change => change.txHash))];
        const newSpells = newSpellTransactions?.map(txHash => {
            const sc = changes.filter(change => change.txHash === txHash);
            const timestamp = sc[0].timestamp;
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
console.log({newSpells})
        const latestSpell = subgraphSpells && subgraphSpells[0];
        const latestPassedSpell = subgraphSpells.filter(spell => spell.casted)[0];
        const metadataSpells = subgraphSpells.map(subgraphSpell => {
            const { id: address, timestamp: created, lifted, casted } = subgraphSpell;
            const status = getSpellStatus(address, latestSpell, latestPassedSpell, lifted);
            const title = metadataMap[address]
                ? metadataMap[address].title
                : 'Spell';
            const changes = spellMap[casted || ''] || [];
            return {
                status,
                address,
                title,
                created,
                casted,
                changes,
            };
        });

        const spells = [...newSpells, ...metadataSpells];
        console.log({ spells });

        return spells;



    }



    const getData = async () => {

        const spellsGetted = await getSpells();
        setSpells(spellsGetted)
    }
    const readyData = !!(subgraphSpellsResponse?.spells && changesResponse?.changes)
    useEffect(() => {

        if (readyData)
            getData()

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [changesResponse?.changes, subgraphSpellsResponse?.spells])


    return (
        <div >
            {readyData && spells.length > 0 && <div>
                <div>{'Spells: ' + spells.length}</div>
            </div>}

        </div>
    )
}

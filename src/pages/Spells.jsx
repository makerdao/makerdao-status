
import React, { useEffect } from 'react'

import { useQuery } from '@apollo/client'
import { Maker } from '../services/queries';
import clients from '../services/apolloClients';

const { MakerGovernance, MakerClient } = clients

export default function Spells() {


    const { data: subgraphSpellsResponse } = useQuery(Maker.GET_SPELLS, {
        client: MakerGovernance,
    });


    const { data: changesResponse } = useQuery(Maker.GET_CHANGES, {
        client: MakerClient,
    });


    const getData = async () => {
        const subgraphSpells = subgraphSpellsResponse?.spells;
        const changes = changesResponse?.changes;


        console.log({ changes, subgraphSpells });
    }

    useEffect(() => {

        if (subgraphSpellsResponse?.spells && changesResponse?.changes)
            getData()
    })



    return (
        <div>
            Hello Spells!
        </div>
    )
}

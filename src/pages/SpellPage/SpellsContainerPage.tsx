/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Spinner } from '../../components/styledComponents';
import { useLoadSpell } from '../../services/loadSpells';
import SpellsPage from './SpellsPage';

export default function SpellsContainerPage() {
  const { spells, loading } = useLoadSpell();

  if (loading) return <Spinner />;

  return <SpellsPage spells={spells} />;
}

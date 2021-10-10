import { loader } from 'graphql.macro';

const compoundQueries = loader('./compound.graphql');
const getSpell = loader('./getSpell.graphql');
const getSpells = loader('./getSpells.graphql');
const getSpellTimeline = loader('./getSpellTimeline.graphql');
const getSpellsChanges = loader('./getSpellsChanges.graphql');
const getSpellsChangesAmount = loader('./getSpellsChangesAmount.graphql');
const getProxyVoterData = loader('./getProxyVoterData.graphql');

export {
  compoundQueries,
  getSpell,
  getSpellTimeline,
  getSpells,
  getSpellsChanges,
  getSpellsChangesAmount,
  getProxyVoterData,
};

import { loader } from 'graphql.macro';

const compoundQuery = loader('./compound.graphql');
const getSpellQuery = loader('./getSpell.graphql');
const getSpellsQuery = loader('./getSpells.graphql');
const getSpellTimelineQuery = loader('./getSpellTimeline.graphql');
const getSpellsChangesQuery = loader('./getSpellsChanges.graphql');
const getSpellsMetadataQuery = loader('./getSpellsMetadata.graphql');
const getSpellsChangesAmountQuery = loader('./getSpellsChangesAmount.graphql');
const getProxyVoterDataQuery = loader('./getProxyVoterData.graphql');
const getActiveContractsQuery = loader('./getActiveContracts.graphql');
const getAllIlksQuery = loader('./getAllIlks.graphql');

export {
  compoundQuery,
  getSpellQuery,
  getSpellTimelineQuery,
  getSpellsQuery,
  getSpellsChangesQuery,
  getSpellsMetadataQuery,
  getSpellsChangesAmountQuery,
  getProxyVoterDataQuery,
  getActiveContractsQuery,
  getAllIlksQuery,
};

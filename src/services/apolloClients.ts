import { ApolloClient, InMemoryCache } from '@apollo/client';

const makerClient = new ApolloClient({
  uri: 'https://api.thegraph.com/subgraphs/name/graphitetools/maker',
  cache: new InMemoryCache(),
});

const makerGovernanceClient = new ApolloClient({
  uri: 'https://api.thegraph.com/subgraphs/name/protofire/makerdao-governance',
  cache: new InMemoryCache(),
});

const clients = {
  MakerClient: makerClient,
  MakerGovernance: makerGovernanceClient,
};

export default clients;

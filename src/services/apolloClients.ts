import { ApolloClient, InMemoryCache } from '@apollo/client';

const makerClient = new ApolloClient({
  uri: 'https://api.thegraph.com/subgraphs/name/graphitetools/maker',
  cache: new InMemoryCache(),
});

const makerGovernanceClient = new ApolloClient({
  uri: 'https://api.thegraph.com/subgraphs/name/protofire/makerdao-governance',
  cache: new InMemoryCache(),
});

const makerProtocolClient = new ApolloClient({
  cache: new InMemoryCache(),
  uri: 'https://api.thegraph.com/subgraphs/name/protofire/maker-protocol',
});

const clients = {
  MakerClient: makerClient,
  MakerGovernance: makerGovernanceClient,
  makerProtocol: makerProtocolClient,
};

export default clients;

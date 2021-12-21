import { RestLink } from 'apollo-link-rest';
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

// rest clients
const restLink = new RestLink({
  uri: 'https://cms-gov.makerfoundation.com/content',
});
const restClient = new ApolloClient({
  cache: new InMemoryCache(),
  link: restLink,
});

const apolloClients = {
  MakerClient: makerClient,
  MakerGovernance: makerGovernanceClient,
  makerProtocol: makerProtocolClient,
  restClient,
};

export default apolloClients;

import { RestLink } from 'apollo-link-rest';
import { ApolloClient, InMemoryCache } from '@apollo/client';

const makerClient = new ApolloClient({
  uri: 'https://api.thegraph.com/subgraphs/name/graphitetools/maker',
  cache: new InMemoryCache(),
});

const makerGovernance = new ApolloClient({
  uri: 'https://api.thegraph.com/subgraphs/name/protofire/makerdao-governance',
  cache: new InMemoryCache(),
});

const makerProtocol = new ApolloClient({
  cache: new InMemoryCache(),
  uri: 'https://api.thegraph.com/subgraphs/name/protofire/maker-protocol',
});

const apiMakerdao = new ApolloClient({
  cache: new InMemoryCache(),
  uri: 'https://api.makerdao.com/graphql',
});

// rest clients
const restLink = new RestLink({
  uri: 'https://cms-gov.makerfoundation.com/content',
  endpoints: {
    makerFoundation: 'https://cms-gov.makerfoundation.com/content',
    activeContracts: 'https://changelog.makerdao.com',
  },
});
const restClient = new ApolloClient({
  cache: new InMemoryCache(),
  link: restLink,
});

const apolloClients = {
  makerClient,
  makerGovernance,
  makerProtocol,
  apiMakerdao,
  restClient,
};

export default apolloClients;

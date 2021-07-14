import {
  ApolloClient,
  InMemoryCache
} from "@apollo/client";

const compoundGovernanceClient = new ApolloClient({
  uri: "https://api.thegraph.com/subgraphs/name/protofire/compound-governance",

  cache: new InMemoryCache(),
});

const makerClient = new ApolloClient({
  uri: "https://api.thegraph.com/subgraphs/name/graphitetools/maker",

  cache: new InMemoryCache(),
});

const makerGovernanceClient = new ApolloClient({
  uri: "https://api.thegraph.com/subgraphs/name/protofire/makerdao-governance",

  cache: new InMemoryCache(),
});

const clients = {
  CompoundGovernance: compoundGovernanceClient,
  MakerClient: makerClient,
  MakerGovernance: makerGovernanceClient,
};

export default clients;

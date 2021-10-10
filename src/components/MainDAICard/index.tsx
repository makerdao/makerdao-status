import { gql, ApolloClient, InMemoryCache } from '@apollo/client';
import React, { useEffect } from 'react';
import { useMainContext } from '../../context/MainContext';
import { infuraCurrentProvider } from '../../services/loadBase';
import { Card, Flex } from '../styledComponents';

const cache = new InMemoryCache();

const client = new ApolloClient({
  cache,
  uri: 'https://api.thegraph.com/subgraphs/name/protofire/maker-protocol',
});

interface Props {
  blockInterval: number;
  periods: number;
}

const getHistoricalDebt = async ({ blockInterval, periods }: Props) => {
  try {
    const latestBlock = await infuraCurrentProvider.getBlockNumber();
    if (latestBlock) {
      const numberOfPoints = periods ?? latestBlock / blockInterval;

      if (numberOfPoints > 0) {
        const result = new Array(numberOfPoints);

        const fragments = Array.from({ length: numberOfPoints }, (v, i) => {
          const block = latestBlock - (i + 1) * blockInterval;

          return `
          _${
            numberOfPoints - i
          }_${block}: systemState(block: { number: ${block}}, id: "current") {
            block
            timestamp
            totalDebt
            debtCeiling: totalDebtCeiling
          }
        `;
        });

        const { data } = await client.query({
          query: gql`{${fragments.concat()}}`,
        });

        Object.entries(data).forEach(([key, value]) => {
          const [, index, block] = key.split('_');

          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          result[+index - 1] = { block: +block, ...(value as any) };
        });
        return result;
      }
    }
  } catch (err) {
    return [];
  }

  return null;
};
const GraphBar = () => {
  useEffect(() => {
    getHistoricalDebt({
      blockInterval: 5700 /* ≈ 1 day */,
      periods: 240 /* 8 months */,
    });
  }, []);
  return (
    <div
      style={{
        minHeight: '300px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {' '}
      See console
    </div>
  );
};
export default function MainDAICard() {
  const { state } = useMainContext();
  if (!state || !state.vatLine) return null;

  const sectionsTitle = [
    {
      title: 'Ceiling',
      subTitle: 'Vat_Line',
      value: state.vatLine,
    },
    {
      title: 'Base stability fee',
      subTitle: 'Jug_Base',
      value: state.jugBase,
    },
    {
      title: 'Save Rate',
      subTitle: 'Pot_dsr',
      value: state.potDsr,
    },
  ];
  return (
    <Card>
      <Flex>
        {sectionsTitle.map((item) => (
          <Flex className="sectionContainer" key={Math.random()}>
            <div className="sectionValue">{item.value}</div>
            <div className="titleGroup">
              <div className="sectionTitle">{item.title}</div>
              <div className="sectionSubTitle">{item.subTitle}</div>
            </div>
          </Flex>
        ))}
      </Flex>
      <Flex justifyCenter>
        <GraphBar />
      </Flex>
      <Flex justifyCenter>
        <Flex className="legend">
          <Flex column alignCenter>
            <div className="circle gray" />
            <div>Debt ceiling</div>
          </Flex>

          <Flex column alignCenter>
            <div className="circle dark" />
            <div>Total DAI</div>
          </Flex>
        </Flex>
      </Flex>
    </Card>
  );
}

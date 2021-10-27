import React from 'react';
import { down, up } from 'styled-breakpoints';
import styled from 'styled-components';
import { MainDAICard, ResumeData } from '../../components';
import { getIconByAsset } from '../../components/Icon/IconNames';
import { CollateralsCard } from '../../components/styledComponents';
import WrapperPage from '../../components/wrappers/WrapperPage';
import { getEtherscanAddressLinkFromHash } from '../../services/utils/links';
import { getItemsByCategory } from '../CollateralPage/mappingCollateralsData';

interface Props {
  collaterals: (Definitions.Collateral & {
    catItems?: Definitions.Cat;
    flipItems?: Definitions.Flip;
  })[];
}

export default function OverviewPage({ collaterals }: Props) {
  const getSections = (
    coll: Definitions.Collateral & {
      catItems?: Definitions.Cat;
      flipItems?: Definitions.Flip;
    },
  ) => [
    {
      title: '',
      items: getItemsByCategory(coll, []),
    },
  ];

  return (
    <WrapperPage
      header={{
        title: 'Overview',
        iconName: 'overview',
      }}
    >
      <Container>
        <MainDAICard />
        <ResumeData />
        <CardsContainer>
          {collaterals.map((coll) => (
            <CollateralsCard
              key={Math.random()}
              sections={getSections(coll)}
              header={{
                title: coll.asset,
                iconName: getIconByAsset(coll.asset),
                link: getEtherscanAddressLinkFromHash(coll.address),
              }}
            />
          ))}
        </CardsContainer>
      </Container>
    </WrapperPage>
  );
}

const Container = styled.div`
  margin-top: 45px;
  margin-left: 3rem;
  margin-right: 3rem;
  ${down('xs')} {
    margin-left: 0.5rem;
    margin-right: 0.5rem;
  }
`;

const CardsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  grid-gap: 1rem;
  align-items: flex-start;
  ${down('xs')} {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  }
  ${up('lg')} {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
  // ${down('xs')} {
  //   div:nth-child(0) {
  //     visibility: hidden;
  //   }
  // }
  // ${down('md')} {
  //   div:nth-child(3) {
  //     visibility: hidden;
  //   }
  // }
  // ${up('lg')} {
  //   grid-template-columns: 1fr 1fr 1fr 1fr;
  // }
`;

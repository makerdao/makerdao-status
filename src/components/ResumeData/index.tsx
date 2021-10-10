import React from 'react';
import styled from 'styled-components';
import { useMainContext } from '../../context/MainContext';
import DataBlockOverview from './DataBlockOverview';
import { Flex, HorizontalLine, VerticalLine } from '../styledComponents';

const ResumeContainer = styled.div`
  background: #aaa;
  padding: 3rem;
  margin: 3rem 1rem;
`;

export default function ResumeData() {
  const { state } = useMainContext();

  if (!state || !state.pauseDelay || !state.esmMin || !state.endWait) {
    return null;
  }

  const MiscBlock = {
    blockTitle: 'Misc',
    blockSubtitleLink: [
      {
        label: 'Flap',
        linkKey: 'flap',
      },
      {
        label: 'ESM',
        linkKey: 'esm',
      },
      {
        label: 'End',
        linkKey: 'end',
      },
    ],
    blockData: [
      {
        mainLabel: 'Timelock',
        secondaryLabel: 'Pause_delay',
        valueCell: state.pauseDelay,
      },
      {
        mainLabel: 'ES Amount',
        secondaryLabel: 'ESM_min',
        valueCell: state.esmMin,
      },
      {
        mainLabel: 'End Delay',
        secondaryLabel: 'End_wait',
        valueCell: state.endWait,
      },
    ],
  };

  const SurPlusBlock = {
    blockTitle: 'Surplus auction',
    blockSubtitleLink: {
      label: 'Flap',
      linkKey: 'flap',
    },
    blockData: [
      {
        mainLabel: 'Minimal bid increase',
        secondaryLabel: 'beg',
        valueCell: state.flapBeg,
      },
      {
        mainLabel: 'Bid duration',
        secondaryLabel: 'ttl',
        valueCell: state.flapTtl,
      },
      {
        mainLabel: 'Auction duration',
        secondaryLabel: 'tau',
        valueCell: state.flapTau,
      },
    ],
  };

  const DebtAuctionBlock = {
    blockTitle: 'Debt Auction',
    blockSubtitleLink: {
      label: 'Flop',
      linkKey: 'flap',
    },
    blockData: [
      {
        mainLabel: 'Minimal bid increase',
        secondaryLabel: 'beg',
        valueCell: state.flopBeg,
      },
      {
        mainLabel: 'Bid duration',
        secondaryLabel: 'ttl',
        valueCell: state.flopTtl,
      },
      {
        mainLabel: 'Auction duration',
        secondaryLabel: 'tau',
        valueCell: state.flopTau,
      },
      {
        mainLabel: 'Lot size increased',
        secondaryLabel: 'pad',
        valueCell: state.flopPad,
      },
    ],
  };

  const AccountingBlockOne = {
    blockTitle: 'Accounting',
    blockSubtitleLink: {
      label: 'vow',
      linkKey: 'vow',
    },
    blockData: [
      {
        mainLabel: 'Surplus auction buffer',
        secondaryLabel: 'hump',
        valueCell: state.hump,
      },
      {
        mainLabel: 'Surplus lot size',
        secondaryLabel: 'bump',
        valueCell: state.bump,
      },
      {
        mainLabel: 'Debt auction bid size',
        secondaryLabel: 'sump',
        valueCell: state.sump,
      },
    ],
  };

  const AccountingBlockTwo = {
    blockData: [
      {
        mainLabel: 'Debt auction initial lot size',
        secondaryLabel: 'dump',
        valueCell: state.dump,
      },
      {
        mainLabel: 'Debt auction delay',
        secondaryLabel: 'wait',
        valueCell: state.wait,
      },
    ],
  };

  return (
    <ResumeContainer>
      <Flex>
        <div style={{ width: '250%' }}>
          <Flex>
            <DataBlockOverview data={MiscBlock} />
            <VerticalLine />

            <DataBlockOverview data={SurPlusBlock} />
          </Flex>
          <HorizontalLine />
          <Flex>
            <DataBlockOverview data={AccountingBlockOne} />
            <DataBlockOverview data={AccountingBlockTwo} />
          </Flex>
        </div>
        <VerticalLine />

        <DataBlockOverview data={DebtAuctionBlock} />
      </Flex>
    </ResumeContainer>
  );
}

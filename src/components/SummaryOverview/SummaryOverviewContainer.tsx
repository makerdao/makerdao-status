import React from 'react';
import { Spinner } from '..';
import { useMainContext } from '../../context/MainContext';
import Formatter from '../../services/utils/Formatter';
import SummaryOverview from './SummaryOverview';

export default function SummaryOverviewContainer() {
  const {
    state: {
      pauseDelay,
      esmMin,
      endWait,
      flapBeg,
      flapTtl,
      flapTau,
      flopBeg,
      flopTtl,
      flopTau,
      flopPad,
      hump,
      bump,
      sump,
      dump,
      wait,
      flashLine,
      flashToll,
      d3mAdaiBar,
    },
    loading,
  } = useMainContext();

  if (loading) return <Spinner />;

  const accounting = {
    title: 'Accounting',
    data: [
      {
        label: 'Surplus auction buffer',
        enframedLabel: 'hump',
        value: hump || '',
      },
      {
        label: 'Surplus lot size',
        enframedLabel: 'bump',
        value: bump || '',
      },
      {
        label: 'Debt auction bid size',
        enframedLabel: 'sump',
        value: sump || '',
      },
      {
        label: 'Debt auction initial lot size',
        enframedLabel: 'dump',
        value: dump || '',
      },
      {
        label: 'Debt auction delay',
        enframedLabel: 'wait',
        value: wait || '',
      },
    ],
  };

  const misc = {
    title: 'Misc',
    data: [
      {
        label: 'Timelock',
        enframedLabel: 'Pause_delay',
        value: pauseDelay || '',
      },
      {
        label: 'ES amount',
        enframedLabel: 'ESM_min',
        value: esmMin || '',
      },
      {
        label: 'End delay',
        enframedLabel: 'End_wait',
        value: endWait || '',
      },
      {
        label: 'Target D3M Rate',
        enframedLabel: 'bar',
        value: d3mAdaiBar
          ? Formatter.formatPercent.format(Number(d3mAdaiBar))
          : '',
      },
    ],
  };

  const debtAuction = {
    title: 'Debt Auction',
    data: [
      {
        label: 'Minimal bid increase',
        enframedLabel: 'beg',
        value: flopBeg || '',
      },
      {
        label: 'Bid duration',
        enframedLabel: 'ttl',
        value: flopTtl || '',
      },
      {
        label: 'Auction duration',
        enframedLabel: 'tau',
        value: flopTau || '',
      },
      {
        label: 'Lot size increased',
        enframedLabel: 'pad',
        value: flopPad || '',
      },
    ],
  };

  const surPlus = {
    title: 'Surplus auction',
    data: [
      {
        label: 'Minimal bid increase',
        enframedLabel: 'beg',
        value: flapBeg || '',
      },
      {
        label: 'Bid duration',
        enframedLabel: 'ttl',
        value: flapTtl || '',
      },
      {
        label: 'Auction duration',
        enframedLabel: 'tau',
        value: flapTau || '',
      },
    ],
  };

  const flashLoans = {
    title: 'Flash Loans',
    data: [
      {
        label: 'Debt ceiling',
        enframedLabel: 'max',
        value: flashLine || '',
      },
      {
        label: 'Minting fee',
        enframedLabel: 'toll',
        value: flashToll || '',
      },
    ],
  };

  const summaries = [accounting, misc, debtAuction, surPlus, flashLoans];

  return <SummaryOverview summaries={summaries} />;
}

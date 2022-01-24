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
        termsLink:
          'md-viewer/?url=https://github.com/makerdao/community/blob/master/governance/parameter-docs/param-system-surplus-buffer.md#system-surplus-buffer',
      },
      {
        label: 'Surplus lot size',
        enframedLabel: 'bump',
        value: bump || '',
        termsLink:
          'md-viewer/?url=https://github.com/makerdao/community/blob/master/governance/parameter-docs/param-surplus-lot-size.md#surplus-lot-size',
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
        termsLink:
          'md-viewer/?url=https://github.com/makerdao/governance-manual/blob/main/parameter-index/debt-auction/param-debt-auction-delay.md#debt-auction-delay',
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
        termsLink:
          'md-viewer/?url=https://github.com/makerdao/community/blob/master/governance/parameter-docs/param-gsm-pause-delay.md#gsm-pause-delay.md',
      },
      {
        label: 'ES amount',
        enframedLabel: 'ESM_min',
        value: esmMin || '',
        termsLink:
          'md-viewer/?url=https://github.com/makerdao/community/blob/master/governance/parameter-docs/param-min-bid-increase-flap.md#min-bid-increase-flap',
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
        termsLink:
          'md-viewer/?url=https://github.com/makerdao/community/blob/master/governance/parameter-docs/param-min-bid-increase-flap.md#min-bid-increase-flap',
      },
      {
        label: 'Bid duration',
        enframedLabel: 'ttl',
        value: flopTtl || '',
        termsLink:
          'md-viewer/?url=https://github.com/makerdao/community/blob/master/governance/parameter-docs/param-bid-duration-flap.md#bid-duration-flap',
      },
      {
        label: 'Auction duration',
        enframedLabel: 'tau',
        value: flopTau || '',
        termsLink:
          'md-viewer/?url=https://github.com/makerdao/governance-manual/blob/main/parameter-index/debt-auction/param-auction-duration-flop.md#auction-duration-flop',
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
        termsLink:
          'md-viewer/?url=https://github.com/makerdao/community/blob/master/governance/parameter-docs/param-min-bid-increase-flap.md#min-bid-increase-flap' ||
          '',
      },
      {
        label: 'Bid duration',
        enframedLabel: 'ttl',
        value: flapTtl || '',
        termsLink:
          'md-viewer/?url=https://github.com/makerdao/community/blob/master/governance/parameter-docs/param-bid-duration-flop.md#bid-duration-flop',
      },
      {
        label: 'Auction duration',
        enframedLabel: 'tau',
        value: flapTau || '',
        termsLink:
          'md-viewer/?url=https://github.com/makerdao/governance-manual/blob/main/parameter-index/surplus-auction/param-auction-duration-flap.md#auction-duration-flap',
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
        termsLink:
          'md-viewer/?url=https://github.com/makerdao/community/blob/master/governance/parameter-docs/param-debt-ceiling.md#debt-ceiling' ||
          '',
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

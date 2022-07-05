import React from 'react';
import { Spinner } from '..';
import { useMainContext } from '../../context/MainContext';
import SummaryOverview from './SummaryOverview';
import { linkToCollateralSpellView } from '../lists/CollateralList/mappingCollateralsData';

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
        paramsLink: linkToCollateralSpellView('Vow_hump'),
      },
      {
        label: 'Surplus lot size',
        enframedLabel: 'bump',
        value: bump || '',
        termsLink:
          'md-viewer/?url=https://github.com/makerdao/community/blob/master/governance/parameter-docs/param-surplus-lot-size.md#surplus-lot-size',
        paramsLink: linkToCollateralSpellView('Vow_bump'),
      },
      {
        label: 'Debt auction bid size',
        enframedLabel: 'sump',
        value: sump || '',
        paramsLink: linkToCollateralSpellView('Vow_sump'),
      },
      {
        label: 'Debt auction initial lot size',
        enframedLabel: 'dump',
        value: dump || '',
        paramsLink: linkToCollateralSpellView('Vow_dump'),
      },
      {
        label: 'Debt auction delay',
        enframedLabel: 'wait',
        value: wait || '',
        termsLink:
          'md-viewer/?url=https://github.com/makerdao/governance-manual/blob/main/parameter-index/debt-auction/param-debt-auction-delay.md#debt-auction-delay',
        paramsLink: linkToCollateralSpellView('Vow_wait'),
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
        paramsLink: linkToCollateralSpellView('Pause_delay'),
      },
      {
        label: 'ES amount',
        enframedLabel: 'ESM_min',
        value: esmMin || '',
        paramsLink: linkToCollateralSpellView('ESM_min'),
      },
      {
        label: 'End delay',
        enframedLabel: 'End_wait',
        value: endWait || '',
        paramsLink: linkToCollateralSpellView('Shutdown_wait'),
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
          'md-viewer/?url=https://github.com/makerdao/governance-manual/blob/main/parameter-index/debt-auction/param-min-bid-decrease-flop.md',
        paramsLink: linkToCollateralSpellView('Flopper_beg'),
      },
      {
        label: 'Bid duration',
        enframedLabel: 'ttl',
        value: flopTtl || '',
        termsLink:
          'md-viewer/?url=https://github.com/makerdao/community/blob/master/governance/parameter-docs/param-bid-duration-flop.md#bid-duration-flop',
        paramsLink: linkToCollateralSpellView('Flopper_ttl'),
      },
      {
        label: 'Auction duration',
        enframedLabel: 'tau',
        value: flopTau || '',
        termsLink:
          'md-viewer/?url=https://github.com/makerdao/governance-manual/blob/main/parameter-index/debt-auction/param-auction-duration-flop.md#auction-duration-flop',
        paramsLink: linkToCollateralSpellView('Flopper_tau'),
      },
      {
        label: 'Lot size increased',
        enframedLabel: 'pad',
        value: flopPad || '',
        paramsLink: linkToCollateralSpellView('Flopper_pad'),
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
          'md-viewer/?url=https://github.com/makerdao/governance-manual/blob/main/parameter-index/surplus-auction/param-min-bid-increase-flap.md',
        paramsLink: linkToCollateralSpellView('Flapper_beg'),
      },
      {
        label: 'Bid duration',
        enframedLabel: 'ttl',
        value: flapTtl || '',
        termsLink:
          'md-viewer/?url=https://github.com/makerdao/community/blob/master/governance/parameter-docs/param-bid-duration-flap.md#bid-duration-flap',
        paramsLink: linkToCollateralSpellView('Flapper_ttl'),
      },
      {
        label: 'Auction duration',
        enframedLabel: 'tau',
        value: flapTau || '',
        termsLink:
          'md-viewer/?url=https://github.com/makerdao/governance-manual/blob/main/parameter-index/surplus-auction/param-auction-duration-flap.md#auction-duration-flap',
        paramsLink: linkToCollateralSpellView('Flapper_tau'),
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
        paramsLink: linkToCollateralSpellView('Flash_line'),
      },
      {
        label: 'Minting fee',
        enframedLabel: 'toll',
        value: flashToll || '',
        paramsLink: linkToCollateralSpellView('Flash_toll'),
      },
    ],
  };

  const summaries = [accounting, misc, debtAuction, surPlus, flashLoans];

  return <SummaryOverview summaries={summaries} />;
}

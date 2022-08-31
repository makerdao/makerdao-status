import { intersection } from 'lodash';
import {
  formatAmount,
  formatDaiAmountAsMultiplier,
  formatDuration,
  formatFees,
  formatPercent,
  // formatRate,
  formatRawDaiAmount,
} from './FormattingFunctions';
import { getIpfsLinkFromHash } from '../utils/links';

export const getItemsByCategory = (
  coll: Definitions.Collateral & {
    catItems?: Definitions.Cat;
    flipItems?: Definitions.Flip;
  },
  selectedTags: string[],
  collateralConfig: Definitions.CollateralsStructure,
  fields?: {
    categoryName?: string;
    name?: string;
    link?: string;
    paramsLink?: string;
    filters: string[];
  }[],
) => {
  let fieldsToShow: {
    name: string;
    link?: string;
  }[] = [];

  if (fields) {
    const collConfigs = collateralConfig?.flavours_by_collaterals?.filter(
      (e) => e.names.includes(coll.asset)) || [];

    fieldsToShow = fields.filter((field) => {
        const exclude = collConfigs.some((collConfig) => {
          const { flavours } = collConfig;

          return flavours.some((flavourName) => {
            const currFlavours = collateralConfig.flavours?.find((f) => f.name === flavourName);
            return currFlavours?.exclude?.some((exc) => exc === field.name);
          });
        });

        if (exclude) return false;
        if (selectedTags.includes(field.categoryName || '')) return true;
        if (!field.name && selectedTags.length) return false;

        const intercepted = intersection(field.filters, selectedTags);

        return selectedTags.length ? intercepted.length : true;
      })
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .map(({ link, name }) => ({ link, name })) as any as {
      name: string;
      link?: string;
    }[];
  }

  const commonKeys = { selected: false };

  return fieldsToShow?.map(({ name, link }) => {
    switch (name) {
      case 'direct_bar': {
        const params = 'bar';
        return {
          label: 'Target Borrow Rate',
          enframedLabel: params,
          termsLink: link,
          value: coll.direct_bar
            ? formatPercent.format(Number(coll.direct_bar))
            : '',
          paramsLink: linkToSpellView(coll.asset, params),
          ...commonKeys,
        };
      }
      case 'jug_duty': {
        const params = 'Jug_duty';
        return {
          label: 'Stability fee',
          enframedLabel: params,
          termsLink: link,
          value: coll.jug_duty ? formatFees(coll.jug_duty.toString()) : '',
          paramsLink: linkToSpellView(coll.asset, params),
          ...commonKeys,
        };
      }
      case 'vat_line': {
        const params = 'Vat_line';
        return {
          label: 'Debt Ceiling',
          enframedLabel: params,
          termsLink: link,
          value: coll.vat_line
            ? formatDaiAmountAsMultiplier(coll.vat_line, 2)
            : '',
          paramsLink: linkToSpellView(coll.asset, params),
          ...commonKeys,
        };
      }
      case 'dss_auto_line_line': {
        const params = 'DssAutoLine_line';
        return {
          label: 'Maximum Debt Ceiling',
          enframedLabel: params,
          termsLink: link,
          value: coll.dss_auto_line_line
            ? formatDaiAmountAsMultiplier(coll.dss_auto_line_line, 2)
            : '',
          paramsLink: linkToSpellView(coll.asset, params),
          ...commonKeys,
        };
      }
      case 'spot_mat': {
        const params = 'Spot_mat';
        return {
          label: 'Liquidation Ratio',
          enframedLabel: params,
          termsLink: link,
          value: coll.spot_mat ? formatPercent.format(Number(coll.spot_mat)) : '',
          paramsLink: linkToSpellView(coll.asset, params),
          ...commonKeys,
        };
      }
      case 'dog_chop': {
        const params = 'Dog_chop';
        return {
          label: 'Liquidation Penalty',
          enframedLabel: params,
          termsLink: link,
          value: coll.dog_chop ? formatPercent.format(Number(coll.dog_chop)) : '',
          paramsLink: linkToSpellView(coll.asset, params),
          ...commonKeys,
        };
      }
      case 'dss_pms_tin': {
        const params = 'PSM.tin';
        return {
          label: 'Fee In',
          enframedLabel: params,
          termsLink: link,
          value:
            coll.dss_pms_tin !== undefined
              ? formatPercent.format(Number(coll.dss_pms_tin))
              : '',
          paramsLink: linkToSpellView(coll.asset, params),
          ...commonKeys,
        };
      }
      case 'dss_pms_tout': {
        const params = 'PSM.tout';
        return {
          label: 'Fee Out',
          enframedLabel: params,
          termsLink: link,
          value:
            coll.dss_pms_tout !== undefined
              ? formatPercent.format(Number(coll.dss_pms_tout))
              : '',
          paramsLink: linkToSpellView(coll.asset, params),
          ...commonKeys,
        };
      }
      case 'dog_hole': {
        const params = 'Dog_hole';
        return {
          label: 'Local Liquidation Limit',
          enframedLabel: params,
          termsLink: link,
          value: formatDaiAmountAsMultiplier(coll.dog_hole),
          paramsLink: linkToSpellView(coll.asset, params),
          ...commonKeys,
        };
      }
      case 'clip_cusp': {
        const params = 'Clip_cusp';
        return {
          label: 'Max Auction Drawdown',
          enframedLabel: params,
          termsLink: link,
          value: coll.clip_cusp ? formatPercent.format(Number(coll.clip_cusp)) : '',
          paramsLink: linkToSpellView(coll.asset, params),
          ...commonKeys,
        };
      }
      case 'clip_tail': {
        const params = 'Clip_tail';
        return {
          label: 'Max Auction Duration',
          enframedLabel: params,
          termsLink: link,
          value: formatDuration(Number(coll.clip_tail) || 0) || '',
          paramsLink: linkToSpellView(coll.asset, params),
          ...commonKeys,
        };
      }
      case 'clipMom_tolerance': {
        const params = 'ClipMom_tolerance';
        return {
          label: 'Breaker Price Tolerance',
          enframedLabel: params,
          termsLink: link,
          value: coll.clipMom_tolerance ? formatAmount(coll.clipMom_tolerance, 2, 2) : '',
          paramsLink: linkToSpellView(coll.asset, params),
          ...commonKeys,
        };
      }
      case 'clip_chip': {
        const params = 'Clip_chip';
        return {
          label: 'Proportional Kick Incentive',
          enframedLabel: params,
          termsLink: link,
          value: coll.clip_chip
            ? formatPercent.format(Number(coll.clip_chip))
            : '',
          paramsLink: linkToSpellView(coll.asset, params),
          ...commonKeys,
        };
      }
      case 'clip_tip': {
        const params = 'Clip_tip';
        return {
          label: 'Flat Kick Incentive',
          enframedLabel: params,
          termsLink: link,
          value: coll.clip_tip ? formatRawDaiAmount(coll.clip_tip, 0) : '',
          paramsLink: linkToSpellView(coll.asset, params),
          ...commonKeys,
        };
      }
      case 'dss_auto_line_gap': {
        const params = 'DssAutoLine_gap';
        return {
          label: 'Target Available Debt',
          enframedLabel: params,
          termsLink: link,
          value: coll.dss_auto_line_gap ? formatDaiAmountAsMultiplier(coll.dss_auto_line_gap, 2) : '',
          paramsLink: linkToSpellView(coll.asset, params),
          ...commonKeys,
        };
      }
      case 'vat_dust': {
        const params = 'Vat_dust';
        return {
          label: 'Debt Floor',
          enframedLabel: params,
          termsLink: link,
          value: coll.vat_dust ? formatDaiAmountAsMultiplier(coll.vat_dust, 0) : '',
          paramsLink: linkToSpellView(coll.asset, params),
          ...commonKeys,
        };
      }
      case 'dss_auto_line_ttl': {
        const params = 'DssAutoLine_tll';
        return {
          label: 'Ceiling Increase Cooldown',
          enframedLabel: params,
          termsLink: link,
          value: formatDuration(coll.dss_auto_line_ttl) || '',
          paramsLink: linkToSpellView(coll.asset, params),
          ...commonKeys,
        };
      }
      case 'calc_cut': {
        const params = 'cut';
        return {
          label: 'Price Change Multiplier',
          enframedLabel: params,
          termsLink: link,
          value: coll.calc_cut ? formatAmount(Number(coll.calc_cut), 2, 2) : '',
          paramsLink: linkToSpellView(coll.asset, params),
          ...commonKeys,
        };
      }
      case 'calc_step': {
        const params = 'step';
        return {
          label: 'Price Change Interval',
          enframedLabel: params,
          termsLink: link,
          value: coll.calc_step || '',
          paramsLink: linkToSpellView(coll.asset, params),
          ...commonKeys,
        };
      }
      case 'doc': {
        const params = 'doc';
        return {
          label: 'RWA Agreement',
          enframedLabel: params,
          termsLink: link,
          value: coll.doc ? ' ' : '',
          paramsLink: coll.doc ? getIpfsLinkFromHash(coll.doc) : '',
          blank: true,
          ...commonKeys,
        };
      }
      case 'clip_calc': {
        const params = 'Clip_calc';
        return {
          label: 'Auction Price Function',
          enframedLabel: params,
          termsLink: link,
          value: coll.clip_calc
            ? `${formatRawDaiAmount(coll.clip_calc)}`
            : '',
          paramsLink: linkToSpellView(coll.asset, params),
          ...commonKeys,
        };
      }
      case 'clip_buf': {
        const params = 'Clip_buf';
        return {
          label: 'Auction Price Multiplier',
          enframedLabel: params,
          termsLink: link,
          value: coll.clip_buf ? formatAmount(Number(coll.clip_buf), 2, 2) : '',
          paramsLink: linkToSpellView(coll.asset, params),
          ...commonKeys,
        };
      }
      case 'dunk': {
        const params = 'dunk';
        return {
          label: 'Auction size',
          enframedLabel: params,
          termsLink: link,
          value: coll.catItems?.dunk
            ? `${formatDaiAmountAsMultiplier(coll.catItems?.dunk)}`
            : '',
          paramsLink: linkToSpellView(coll.asset, params),
          ...commonKeys,
        };
      }
      case 'ttl': {
        const params = 'ttl';
        return {
          label: 'Bid duration',
          enframedLabel: params,
          termsLink: link,
          value: coll.flipItems?.ttl ? formatDuration(Number(coll.flipItems?.ttl)) : '',
          paramsLink: linkToSpellView(coll.asset, params),
          ...commonKeys,
        };
      }
      case 'tau': {
        const params = 'tau';
        return {
          label: 'Auction size',
          enframedLabel: params,
          termsLink: link,
          value: coll.flipItems?.tau ? formatDuration(Number(coll.flipItems?.tau)) : '',
          paramsLink: linkToSpellView(coll.asset, params),
          ...commonKeys,
        };
      }
      case 'direct_tau': {
        const params = 'tau';
        return {
          label: 'Auction size',
          enframedLabel: params,
          termsLink: link,
          value: coll.direct_tau || '',
          paramsLink: linkToSpellView(coll.asset, params),
          ...commonKeys,
        };
      }
      default:
        return {
          label: '',
          enframedLabel: '',
          termsLink: link,
          paramsLink: linkToSpellView('', ''),
          value: '',
          ...commonKeys,
        };
    }
  });
};

export const linkToSpellView = (ilk: string, parameter: string) => {
  const urlParams = new URLSearchParams({
    ilk,
    parameter,
  });
  return `/collateral-spells?${urlParams.toString()}`;
};

export const linkToCollateralSpellView = (parameter: string) => {
  const urlParams = new URLSearchParams({
    parameter,
  });
  return `/collateral-spells?${urlParams.toString()}`;
};

import { intersection } from 'lodash';
import {
  formatDaiAmount,
  formatDuration,
  formatFee,
  formatRawDaiAmount,
  formatRayRatio,
} from '../../../services/utils/formatsFunctions';
import Formatter from '../../../services/utils/Formatter';
import { getIpfsLinkFromHash } from '../../../services/utils/links';

// eslint-disable-next-line import/prefer-default-export
export const getItemsByCategory = (
  coll: Definitions.Collateral & {
    catItems?: Definitions.Cat;
    flipItems?: Definitions.Flip;
  },
  selectedTags: string[],
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
    fieldsToShow = fields
      .filter((field) => {
        if (selectedTags.includes(field.categoryName || '')) return true;
        if (!field.name && selectedTags.length) return false;
        const intercepted = intersection(field.filters, selectedTags);
        return selectedTags.length ? intercepted.length : true;
      })
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .map(({ link, name }) => ({ link, name })) as any as {
      name: string;
      termsLink?: string;
    }[];
  }

  const commonKeys = { selected: false };
  return fieldsToShow?.map(({ name, link }) => {
    switch (name) {
      case 'jug_duty': {
        const params = 'Jug_duty';
        return {
          label: 'Stability fee',
          enframedLabel: params,
          termsLink: link,
          value: coll.jug_duty ? formatFee(coll.jug_duty) : '',
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
          value: coll.vat_line ? `${formatRawDaiAmount(coll.vat_line)}` : '',
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
          value:
            Formatter.formatMultiplier(Number(coll.dss_auto_line_line), 0) ||
            '',
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
          value: coll.spot_mat ? (formatRayRatio(coll.spot_mat) as string) : '',
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
          value: coll.dog_chop,
          paramsLink: linkToSpellView(coll.asset, params),
          ...commonKeys,
        };
      }
      case 'dss_pms_tin': {
        const params = 'DssPms_tin';
        return {
          label: 'Fee In',
          enframedLabel: params,
          termsLink: link,
          value:
            coll.dss_pms_tin !== undefined
              ? Formatter.formatPercentFee.format(Number(coll.dss_pms_tin))
              : '',
          paramsLink: linkToSpellView(coll.asset, params),
          ...commonKeys,
        };
      }
      case 'dss_pms_tout': {
        const params = 'DssPms_tout';
        return {
          label: 'Fee Out',
          enframedLabel: params,
          termsLink: link,
          value:
            coll.dss_pms_tout !== undefined
              ? Formatter.formatPercentFee.format(Number(coll.dss_pms_tout))
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
          value: Formatter.formatMultiplier(Number(coll.dog_hole)),
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
          value: coll.clip_cusp || '',
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
          value: Formatter.formatDuration(Number(coll.clip_tail) || 0) || '',
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
          value:
            coll.clipMom_tolerance !== undefined ? coll.clipMom_tolerance : '',
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
            ? Formatter.formatPercent.format(Number(coll.clip_chip))
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
          value: coll.clip_tip || '',
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
          value:
            Formatter.formatMultiplier(Number(coll.dss_auto_line_gap), 0) || '',
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
          value: coll.vat_dust ? `${formatRawDaiAmount(coll.vat_dust)}` : '',
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
          value: Formatter.formatDuration(coll.dss_auto_line_ttl) || '',
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
          value: coll.calc_cut || '',
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
          value: coll.clip_calc ? `${formatRawDaiAmount(coll.clip_calc)}` : '',
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
          value: coll.clip_buf || '',
          paramsLink: linkToSpellView(coll.asset, params),
          ...commonKeys,
        };
      }
      case 'dog_Hole': {
        const params = 'chop';
        return {
          label: 'Global Liquidation Limit',
          enframedLabel: params,
          termsLink: link,
          value: Formatter.formatAmount(coll.dog_Hole),
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
            ? `${formatDaiAmount(coll.catItems?.dunk)}`
            : '',
          paramsLink: linkToSpellView(coll.asset, params),
          ...commonKeys,
        };
      }
      case 'flap_beg': {
        const params = 'beg';
        return {
          label: 'Min. bid increase',
          enframedLabel: params,
          termsLink: link,
          value: coll.flap_beg || '',
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
          value: coll.flipItems?.ttl ? formatDuration(coll.flipItems?.ttl) : '',
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
          value: coll.flipItems?.tau ? formatDuration(coll.flipItems?.tau) : '',
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

export const linkToSpellView = (collateral: string, parameter: string) => {
  const urlParams = new URLSearchParams({
    collateral,
    parameter,
  });
  return `/spells?${urlParams.toString()}`;
};

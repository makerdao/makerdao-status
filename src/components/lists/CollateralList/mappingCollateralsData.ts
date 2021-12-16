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
        const params = 'Stability fee';
        return {
          label: params,
          enframedLabel: 'Jug_duty',
          termsLink: link,
          value: coll.jug_duty ? formatFee(coll.jug_duty) : '',
          paramsLink: linkToSpellView(coll.asset, params),
          ...commonKeys,
        };
      }
      case 'vat_line': {
        const params = 'Debt Ceiling';
        return {
          label: params,
          enframedLabel: 'Vat_line',
          termsLink: link,
          value: coll.vat_line ? `${formatRawDaiAmount(coll.vat_line)}` : '',
          paramsLink: linkToSpellView(coll.asset, params),
          ...commonKeys,
        };
      }
      case 'dss_auto_line_line': {
        const params = 'Maximum Debt Ceiling';
        return {
          label: params,
          enframedLabel: 'DssAutoLine_line',
          termsLink: link,
          value:
            Formatter.formatMultiplier(Number(coll.dss_auto_line_line), 0) ||
            '',
          paramsLink: linkToSpellView(coll.asset, params),
          ...commonKeys,
        };
      }
      case 'spot_mat': {
        const params = 'Liquidation Ratio';
        return {
          label: params,
          enframedLabel: 'Spot_mat',
          termsLink: link,
          value: coll.spot_mat ? (formatRayRatio(coll.spot_mat) as string) : '',
          paramsLink: linkToSpellView(coll.asset, params),
          ...commonKeys,
        };
      }
      case 'dog_chop': {
        const params = 'Liquidation Penalty';
        return {
          label: params,
          enframedLabel: 'Dog_chop',
          termsLink: link,
          value: coll.dog_chop,
          paramsLink: linkToSpellView(coll.asset, params),
          ...commonKeys,
        };
      }
      case 'dss_pms_tin': {
        const params = 'Fee In';
        return {
          label: params,
          enframedLabel: 'DssPms_tin',
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
        const params = 'Fee Out';
        return {
          label: params,
          enframedLabel: 'DssPms_tout',
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
        const params = 'Local Liquidation Limit';
        return {
          label: params,
          enframedLabel: 'Dog_hole',
          termsLink: link,
          value: Formatter.formatMultiplier(Number(coll.dog_hole)),
          paramsLink: linkToSpellView(coll.asset, params),
          ...commonKeys,
        };
      }
      case 'clip_cusp': {
        const params = 'Max Auction Drawdown';
        return {
          label: params,
          enframedLabel: 'Clip_cusp',
          termsLink: link,
          value: coll.clip_cusp || '',
          paramsLink: linkToSpellView(coll.asset, params),
          ...commonKeys,
        };
      }
      case 'clip_tail': {
        const params = 'Max Auction Duration';
        return {
          label: params,
          enframedLabel: 'Clip_tail',
          termsLink: link,
          value: Formatter.formatDuration(Number(coll.clip_tail) || 0) || '',
          paramsLink: linkToSpellView(coll.asset, params),
          ...commonKeys,
        };
      }
      case 'clipMom_tolerance': {
        const params = 'Breaker Price Tolerance';
        return {
          label: params,
          enframedLabel: 'ClipMom_tolerance',
          termsLink: link,
          value:
            coll.clipMom_tolerance !== undefined ? coll.clipMom_tolerance : '',
          paramsLink: linkToSpellView(coll.asset, params),
          ...commonKeys,
        };
      }
      case 'clip_chip': {
        const params = 'Proportional Kick Incentive';
        return {
          label: params,
          enframedLabel: 'Clip_chip',
          termsLink: link,
          value: coll.clip_chip
            ? Formatter.formatPercent.format(Number(coll.clip_chip))
            : '',
          paramsLink: linkToSpellView(coll.asset, params),
          ...commonKeys,
        };
      }
      case 'clip_tip': {
        const params = 'Flat Kick Incentive';
        return {
          label: params,
          enframedLabel: 'Clip_tip',
          termsLink: link,
          value: coll.clip_tip || '',
          paramsLink: linkToSpellView(coll.asset, params),
          ...commonKeys,
        };
      }
      case 'dss_auto_line_gap': {
        const params = 'Target Available Debt';
        return {
          label: params,
          enframedLabel: 'DssAutoLine_gap',
          termsLink: link,
          value:
            Formatter.formatMultiplier(Number(coll.dss_auto_line_gap), 0) || '',
          paramsLink: linkToSpellView(coll.asset, params),
          ...commonKeys,
        };
      }
      case 'vat_dust': {
        const params = 'Debt Floor';
        return {
          label: params,
          enframedLabel: 'Vat_dust',
          termsLink: link,
          value: coll.vat_dust ? `${formatRawDaiAmount(coll.vat_dust)}` : '',
          paramsLink: linkToSpellView(coll.asset, params),
          ...commonKeys,
        };
      }
      case 'dss_auto_line_ttl': {
        const params = 'Ceiling Increase Cooldown';
        return {
          label: params,
          enframedLabel: 'DssAutoLine_tll',
          termsLink: link,
          value: Formatter.formatDuration(coll.dss_auto_line_ttl) || '',
          paramsLink: linkToSpellView(coll.asset, params),
          ...commonKeys,
        };
      }
      case 'calc_cut': {
        const params = 'Price Change Multiplier';
        return {
          label: params,
          enframedLabel: 'cut',
          termsLink: link,
          value: coll.calc_cut || '',
          paramsLink: linkToSpellView(coll.asset, params),
          ...commonKeys,
        };
      }
      case 'calc_step': {
        const params = 'Price Change Interval';
        return {
          label: params,
          enframedLabel: 'step',
          termsLink: link,
          value: coll.calc_step || '',
          paramsLink: linkToSpellView(coll.asset, params),
          ...commonKeys,
        };
      }
      case 'doc': {
        const params = 'RWA Agreement';
        return {
          label: params,
          enframedLabel: 'doc',
          termsLink: link,
          value: coll.doc ? ' ' : '',
          paramsLink: coll.doc ? getIpfsLinkFromHash(coll.doc) : '',
          blank: true,
          ...commonKeys,
        };
      }

      case 'clip_calc': {
        const params = 'Auction Price Function';
        return {
          label: params,
          enframedLabel: 'Clip_calc',
          termsLink: link,
          value: coll.clip_calc ? `${formatRawDaiAmount(coll.clip_calc)}` : '',
          paramsLink: linkToSpellView(coll.asset, params),
          ...commonKeys,
        };
      }
      case 'clip_buf': {
        const params = 'Auction Price Multiplier';
        return {
          label: params,
          enframedLabel: 'Clip_buf',
          termsLink: link,
          value: coll.clip_buf || '',
          paramsLink: linkToSpellView(coll.asset, params),
          ...commonKeys,
        };
      }
      case 'dog_Hole': {
        const params = 'Global Liquidation Limit';
        return {
          label: params,
          enframedLabel: 'chop',
          termsLink: link,
          value: Formatter.formatAmount(coll.dog_Hole),
          paramsLink: linkToSpellView(coll.asset, params),
          ...commonKeys,
        };
      }
      case 'dunk': {
        const params = 'Auction size';
        return {
          label: params,
          enframedLabel: 'dunk',
          termsLink: link,
          value: coll.catItems?.dunk
            ? `${formatDaiAmount(coll.catItems?.dunk)}`
            : '',
          paramsLink: linkToSpellView(coll.asset, params),
          ...commonKeys,
        };
      }
      case 'flap_beg': {
        const params = 'Min. bid increase';
        return {
          label: params,
          enframedLabel: 'beg',
          termsLink: link,
          value: coll.flap_beg || '',
          paramsLink: linkToSpellView(coll.asset, params),
          ...commonKeys,
        };
      }
      case 'ttl': {
        const params = 'Bid duration';
        return {
          label: params,
          enframedLabel: 'ttl',
          termsLink: link,
          value: coll.flipItems?.ttl ? formatDuration(coll.flipItems?.ttl) : '',
          paramsLink: linkToSpellView(coll.asset, params),
          ...commonKeys,
        };
      }
      case 'tau': {
        const params = 'Auction size';
        return {
          label: params,
          enframedLabel: 'tau',
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

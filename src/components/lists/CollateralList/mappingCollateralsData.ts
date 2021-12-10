import { intersection } from 'lodash';
import {
  formatDaiAmount,
  formatDuration,
  formatFee,
  formatRatio,
  formatRawDaiAmount,
  formatRayRatio,
  getUtilization,
} from '../../../services/utils/formatsFunctions';
import Formatter from '../../../services/utils/Formatter';

// eslint-disable-next-line import/prefer-default-export
export const getItemsByCategory = (
  coll: Definitions.Collateral & {
    catItems?: Definitions.Cat;
    flipItems?: Definitions.Flip;
  },
  selectedTags: string[],
  fields?: {
    name?: string | undefined;
    termsLink?: string | undefined;
    paramsLink?: string | undefined;
    filters: string[];
  }[],
) => {
  let fieldsToShow: {
    name: string;
    termsLink?: string;
  }[] = [];
  if (fields) {
    fieldsToShow = fields
      .filter((field) => {
        if (!field.name && selectedTags.length) return false;
        const intercepted = intersection(field.filters, selectedTags);
        return selectedTags.length ? intercepted.length : true;
      })
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .map(({ termsLink, name }) => ({ termsLink, name })) as any as {
      name: string;
      termsLink?: string;
    }[];
  }

  const commonKeys = { selected: false };
  return fieldsToShow?.map(({ name, termsLink }) => {
    switch (name) {
      case 'Spot_mat': {
        const params = 'Liquidation Ratio';
        return {
          label: params,
          enframedLabel: 'Spot_mat',
          termsLink,
          value: coll.mat ? (formatRayRatio(coll.mat) as string) : '',
          paramsLink: linkToSpellView(coll.asset, params),
          ...commonKeys,
        };
      }
      case 'Jug_duty': {
        const params = 'Stability fee';
        return {
          label: params,
          enframedLabel: 'Jug_duty',
          termsLink,
          value: coll.duty ? formatFee(coll.duty) : '',
          paramsLink: linkToSpellView(coll.asset, params),
          ...commonKeys,
        };
      }
      case 'Vat_dust': {
        const params = 'Debt Floor';
        return {
          label: params,
          enframedLabel: 'Vat_dust',
          termsLink,
          value: coll.dust ? `${formatRawDaiAmount(coll.dust)}` : '',
          paramsLink: linkToSpellView(coll.asset, params),
          ...commonKeys,
        };
      }
      case 'vat_Line': {
        const params = 'Global Debt Ceiling';
        return {
          label: params,
          enframedLabel: 'Vat_Line',
          termsLink,
          value: coll.vat_Line ? `${formatRawDaiAmount(coll.vat_Line)}` : '',
          paramsLink: linkToSpellView(coll.asset, params),
          ...commonKeys,
        };
      }
      case 'vat_line': {
        const params = 'Debt Ceiling';
        return {
          label: params,
          enframedLabel: 'Vat_line',
          termsLink,
          value: coll.line ? `${formatRawDaiAmount(coll.line)}` : '',
          paramsLink: linkToSpellView(coll.asset, params),
          ...commonKeys,
        };
      }
      case 'clip_calc': {
        const params = 'Auction Price Function';
        return {
          label: params,
          enframedLabel: 'Clip_calc',
          termsLink,
          value: coll.clip_calc ? `${formatRawDaiAmount(coll.clip_calc)}` : '',
          paramsLink: linkToSpellView(coll.asset, params),
          ...commonKeys,
        };
      }
      case 'clip_cusp': {
        const params = 'Max Auction Drawdown';
        return {
          label: params,
          enframedLabel: 'Clip_cusp',
          termsLink,
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
          termsLink,
          value: Formatter.formatDuration(Number(coll.clip_tail) || 0) || '',
          paramsLink: linkToSpellView(coll.asset, params),
          ...commonKeys,
        };
      }
      case 'clip_chip': {
        const params = 'Proportional Kick Incentive';
        return {
          label: params,
          enframedLabel: 'Clip_chip',
          termsLink,
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
          termsLink,
          value: coll.clip_tip || '',
          paramsLink: linkToSpellView(coll.asset, params),
          ...commonKeys,
        };
      }
      case 'clip_buf': {
        const params = 'Auction Price Multiplier';
        return {
          label: params,
          enframedLabel: 'Clip_buf',
          termsLink,
          value: coll.clip_buf || '',
          paramsLink: linkToSpellView(coll.asset, params),
          ...commonKeys,
        };
      }
      case 'dss_auto_line_line': {
        const params = 'Maximum Debt Ceiling';
        return {
          label: params,
          enframedLabel: 'DssAutoLine_line',
          termsLink,
          value: Formatter.formatAmount(coll.dss_auto_line_line, 2) || '',
          paramsLink: linkToSpellView(coll.asset, params),
          ...commonKeys,
        };
      }
      case 'dss_auto_line_gap': {
        const params = 'Target Available Debt';
        return {
          label: params,
          enframedLabel: 'DssAutoLine_gap',
          termsLink,
          value: Formatter.formatAmount(coll.dss_auto_line_gap, 2) || '',
          paramsLink: linkToSpellView(coll.asset, params),
          ...commonKeys,
        };
      }
      case 'dss_auto_line_ttl': {
        const params = 'Ceiling Increase Cooldown';
        return {
          label: params,
          enframedLabel: 'DssAutoLine_tll',
          termsLink,
          value: Formatter.formatDuration(coll.dss_auto_line_ttl) || '',
          paramsLink: linkToSpellView(coll.asset, params),
          ...commonKeys,
        };
      }
      case 'dssPms_tin': {
        const params = 'Fee In';
        return {
          label: params,
          enframedLabel: 'DssPms_tin',
          termsLink,
          value:
            coll.dssPms_tin !== undefined
              ? Formatter.formatPercentFee.format(Number(coll.dssPms_tin))
              : '',
          paramsLink: linkToSpellView(coll.asset, params),
          ...commonKeys,
        };
      }
      case 'dssPms_tout': {
        const params = 'Fee Out';
        return {
          label: params,
          enframedLabel: 'DssPms_tout',
          termsLink,
          value:
            coll.dssPms_tout !== undefined
              ? Formatter.formatPercentFee.format(Number(coll.dssPms_tout))
              : '',
          paramsLink: linkToSpellView(coll.asset, params),
          ...commonKeys,
        };
      }
      case 'tolerance': {
        const params = 'Breaker Price Tolerance';
        return {
          label: params,
          enframedLabel: 'ClipMom_tolerance',
          termsLink,
          value: coll.tolerance !== undefined ? coll.tolerance : '',
          paramsLink: linkToSpellView(coll.asset, params),
          ...commonKeys,
        };
      }
      case 'debt-ceiling': {
        let value = '';
        if (coll.asset && coll.art && coll.rate && coll.line) {
          const utilization = getUtilization(
            coll.asset,
            coll.art,
            coll.rate,
            coll.line,
          );
          value = formatRatio(utilization || '') as string;
        }
        const params = 'Ceiling Utilization';
        return {
          label: params,
          enframedLabel: '',
          termsLink,
          value,
          paramsLink: linkToSpellView(coll.asset, params),
          ...commonKeys,
        };
      }
      case 'chop': {
        const params = 'Liquidation Penalty';
        return {
          label: params,
          enframedLabel: 'chop',
          termsLink,
          value: coll.dog_chop,
          paramsLink: linkToSpellView(coll.asset, params),
          ...commonKeys,
        };
      }
      case 'dog_Hole': {
        const params = 'Global Liquidation Limit';
        return {
          label: params,
          enframedLabel: 'chop',
          termsLink,
          value: Formatter.formatAmount(coll.dog_Hole),
          paramsLink: linkToSpellView(coll.asset, params),
          ...commonKeys,
        };
      }
      case 'dog_hole': {
        const params = 'Local Liquidation Limit';
        return {
          label: params,
          enframedLabel: 'hole',
          termsLink,
          value: Formatter.formatAmount(coll.dog_hole),
          paramsLink: linkToSpellView(coll.asset, params),
          ...commonKeys,
        };
      }
      case 'dunk': {
        const params = 'Auction size';
        return {
          label: params,
          enframedLabel: 'dunk',
          termsLink,
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
          termsLink,
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
          termsLink,
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
          termsLink,
          value: coll.flipItems?.tau ? formatDuration(coll.flipItems?.tau) : '',
          paramsLink: linkToSpellView(coll.asset, params),
          ...commonKeys,
        };
      }
      default:
        return {
          label: '',
          enframedLabel: '',
          termsLink,
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

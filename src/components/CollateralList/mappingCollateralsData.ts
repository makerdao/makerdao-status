import { intersection } from 'lodash';
import {
  formatDaiAmount,
  formatFee,
  formatRatio,
  formatRayRatio,
  formatWadRate,
  getUtilization,
} from '../../services/utils/formatsFunctions';

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
        const params = 'Col. ratio';
        return {
          label: params,
          enframedLabel: 'Spot_mat',
          termsLink,
          value: coll.mat ? formatRayRatio(coll.mat) : '',
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
        const params = 'Min. per Vault';
        return {
          label: params,
          enframedLabel: 'Vat_dust',
          termsLink,
          value: coll.dust ? `${formatDaiAmount(coll.dust)}` : '',
          paramsLink: linkToSpellView(coll.asset, params),
          ...commonKeys,
        };
      }
      case 'Vat_line': {
        const params = 'Ceiling';
        return {
          label: params,
          enframedLabel: 'Vat_line',
          termsLink,
          value: coll.line ? `${formatDaiAmount(coll.line)}` : '',
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
          value = formatRatio(utilization || '');
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
        const params = 'Penalty';
        return {
          label: params,
          enframedLabel: 'chop',
          termsLink,
          value: coll.catItems?.chop ? formatWadRate(coll.catItems?.chop) : '',
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
      case 'beg': {
        const params = 'Min. bid increase';
        return {
          label: params,
          enframedLabel: 'beg',
          termsLink,
          value: coll.flipItems?.beg ? formatWadRate(coll.flipItems?.beg) : '',
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
          value: coll.flipItems?.ttl
            ? formatDaiAmount(coll.flipItems?.ttl)
            : '',
          paramsLink: linkToSpellView(coll.asset, params),
          ...commonKeys,
        };
      }
      case 'tau': {
        const params = 'Auction size';
        return {
          label: params,
          enframedLabel: 'dunk',
          termsLink,
          value: coll.flipItems?.tau
            ? formatDaiAmount(coll.flipItems?.tau)
            : '',
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

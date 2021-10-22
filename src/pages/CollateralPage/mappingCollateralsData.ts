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
    link?: string | undefined;
    filters: string[];
  }[],
) => {
  let fieldsToShow = [];
  if (selectedTags.length && fields) {
    fieldsToShow = fields
      .filter((field) => {
        if (!field.name) return false;
        const intercepted = intersection(field.filters, selectedTags);
        return intercepted.length;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      })
      .map(({ link, name }) => ({ link, name })) as any as {
      name: string;
      link?: string;
    }[];
  } else {
    fieldsToShow = [
      'Spot_mat',
      'Jug_duty',
      'Vat_dust',
      'Vat_line',
      'debt-ceiling',
      'chop',
      'dunk',
      'beg',
      'ttl',
      'tau',
    ].map((m) => ({
      name: m,
      link: 'https://makerdao.com/en/',
    })) as { name: string; link?: string }[];
  }

  const commonKeys = { selected: false, onAction: () => {} };
  return fieldsToShow?.map(({ name, link }) => {
    switch (name) {
      case 'Spot_mat':
        return {
          label: 'Col. ratio',
          enframedLabel: 'Spot_mat',
          link,
          value: coll.mat ? formatRayRatio(coll.mat) : '',
          ...commonKeys,
        };
      case 'Jug_duty':
        return {
          label: 'Stability fee',
          enframedLabel: 'Jug_duty',
          link,
          value: coll.duty ? formatFee(coll.duty) : '',
          ...commonKeys,
        };
      case 'Vat_dust':
        return {
          label: 'Min. per Vault',
          enframedLabel: 'Vat_dust',
          link,
          value: coll.dust ? `${formatDaiAmount(coll.dust)}` : '',
          ...commonKeys,
        };
      case 'Vat_line':
        return {
          label: 'Ceiling',
          enframedLabel: 'Vat_line',
          link,
          value: coll.line ? `${formatDaiAmount(coll.line)}` : '',
          ...commonKeys,
        };
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
        return {
          label: 'Ceiling Utilization',
          enframedLabel: '',
          link,
          value,
          ...commonKeys,
        };
      }
      case 'chop':
        return {
          label: 'Penalty',
          enframedLabel: 'chop',
          link,
          value: coll.catItems?.chop ? formatWadRate(coll.catItems?.chop) : '',
          ...commonKeys,
        };
      case 'dunk':
        return {
          label: 'Auction size',
          enframedLabel: 'dunk',
          link,
          value: coll.catItems?.dunk
            ? `${formatDaiAmount(coll.catItems?.dunk)}`
            : '',
          ...commonKeys,
        };
      case 'beg':
        return {
          label: 'Min. bid increase',
          enframedLabel: 'beg',
          link,
          value: coll.flipItems?.beg ? formatWadRate(coll.flipItems?.beg) : '',
          ...commonKeys,
        };
      case 'ttl':
        return {
          label: 'Bid duration',
          enframedLabel: 'ttl',
          link,
          value: coll.flipItems?.ttl
            ? formatDaiAmount(coll.flipItems?.ttl)
            : '',
          ...commonKeys,
        };
      case 'tau':
        return {
          label: 'Auction size',
          enframedLabel: 'dunk',
          link,
          value: coll.flipItems?.tau
            ? formatDaiAmount(coll.flipItems?.tau)
            : '',
          ...commonKeys,
        };
      default:
        return {
          label: '',
          enframedLabel: '',
          link,
          value: '',
          ...commonKeys,
        };
    }
  });
};

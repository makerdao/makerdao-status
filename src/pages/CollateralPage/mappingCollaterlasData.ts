import { pick } from 'lodash';
import {
  formatDaiAmount,
  formatFee,
  formatRatio,
  formatRayRatio,
  formatWadRate,
  getUtilization,
} from '../../services/utils/formatsFunctions';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getCollateralsItems = (item: Record<string, any>) => {
  const picked = pick(item, ['mat', 'duty', 'dust', 'line']);
  const keys = Object.keys(picked);
  const commonKeys = { selected: false, onAction: () => {} };
  const mapped = keys.map((key) => {
    switch (key) {
      case 'mat':
        return {
          label: 'Col. ratio',
          enframedLabel: 'Spot_mat',
          value: item[key] ? formatRayRatio(item[key]) : '',
          ...commonKeys,
        };
      case 'duty':
        return {
          label: 'Stability fee',
          enframedLabel: 'Jug_duty',
          value: item[key] ? formatFee(item[key]) : '',
          ...commonKeys,
        };
      case 'dust':
        return {
          label: 'Min. per Vault',
          enframedLabel: 'Vat_dust',
          value: item[key] ? `${formatDaiAmount(item[key])} DAI` : '',
          ...commonKeys,
        };
      case 'line':
        return {
          label: 'Ceiling',
          enframedLabel: 'Vat_line',
          value: item[key] ? `${formatDaiAmount(item[key])} DAI` : '',
          ...commonKeys,
        };
      default:
        return {
          label: '',
          enframedLabel: '',
          value: '',
          ...commonKeys,
        };
    }
  });
  if (item.asset && item.art && item.rate && item.line) {
    return [
      ...mapped,
      {
        label: 'Ceiling Utilization',
        enframedLabel: '',
        value: formatRatio(
          getUtilization(item.asset, item.art, item.rate, item.line),
        ),
        ...commonKeys,
      },
    ];
  }
  return mapped;
};

export const getCatsItems = (catItems: Definitions.Cat) => {
  const picked = pick(catItems, ['chop', 'dunk']);
  const keys = Object.keys(picked);
  const commonKeys = { selected: false, onAction: () => {} };
  const mapped = keys.map((key) => {
    switch (key) {
      case 'chop':
        return {
          label: 'Penalty',
          enframedLabel: 'chop',
          value: catItems[key] ? formatWadRate(catItems[key]) : '',
          ...commonKeys,
        };
      case 'dunk':
        return {
          label: 'Auction size',
          enframedLabel: 'dunk',
          value: catItems[key] ? `${formatDaiAmount(catItems[key])} DAI` : '',
          ...commonKeys,
        };
      default:
        return {
          label: '',
          enframedLabel: '',
          value: '',
          ...commonKeys,
        };
    }
  });
  return mapped;
};

export const getFlipItems = (catItems: Definitions.Flip) => {
  const picked = pick(catItems, ['beg', 'ttl', 'tau']);
  const keys = Object.keys(picked);
  const commonKeys = { selected: false, onAction: () => {} };
  const mapped = keys.map((key) => {
    switch (key) {
      case 'beg':
        return {
          label: 'Min. bid increase',
          enframedLabel: 'beg',
          value: catItems[key] ? formatWadRate(catItems[key]) : '',
          ...commonKeys,
        };
      case 'ttl':
        return {
          label: 'Bid duration',
          enframedLabel: 'ttl',
          value: catItems[key] ? formatDaiAmount(catItems[key]) : '',
          ...commonKeys,
        };
      case 'tau':
        return {
          label: 'Auction size',
          enframedLabel: 'dunk',
          value: catItems[key] ? formatDaiAmount(catItems[key]) : '',
          ...commonKeys,
        };
      default:
        return {
          label: '',
          enframedLabel: '',
          value: '',
          ...commonKeys,
        };
    }
  });
  return mapped;
};

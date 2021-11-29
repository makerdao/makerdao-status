import moment from 'moment';

export function numberShort(long?: number) {
  if (!long) return '';
  let num = long;
  const negative = num < 0;
  if (negative) {
    num = -num;
  }

  const digits = 1;
  const si = [
    { value: 1, symbol: '' },
    { value: 1e3, symbol: 'K' },
    { value: 1e6, symbol: 'M' },
    { value: 1e9, symbol: 'B' },
    { value: 1e12, symbol: 'T' },
  ];
  const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
  let i;
  // eslint-disable-next-line no-plusplus
  for (i = si.length - 1; i > 0; i--) {
    if (num >= si[i].value) {
      break;
    }
  }
  return (
    (negative ? '-' : '') +
    (num / si[i].value).toFixed(digits).replace(rx, '$1') +
    si[i].symbol
  );
}

export function percent(num: number) {
  if (num == null) return '-';

  return `${(num * 100).toFixed(2)}%`;
}

export function dollars(num: number) {
  if (num == null) return '-';

  if (num >= 1) {
    return `$${numberShort(num)}`;
  }
  return `$${num.toFixed(3)}`;
}

export function dai(num: number) {
  if (num == null) return '-';

  return numberShort(num);
}

export function dateShort(date = moment()) {
  return date.format('DD MMM. YYYY');
}

export function dateLong(date = moment()) {
  return date.format('dddd DD MMM. YYYY');
}

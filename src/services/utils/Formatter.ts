class Formatter {
  static formatFee(fee: number) {
    const apy = fee ** (60 * 60 * 24 * 365) - 1;
    const apyPercentage = apy * 100;
    return `${apyPercentage.toFixed(2)}%`;
  }

  static formatRatio(ratio: number, asNumber = false) {
    const percentage = 100 * ratio;
    return asNumber
      ? Number(percentage.toFixed(0))
      : `${percentage.toFixed(0)}%`;
  }

  static formatRatioNumber(ratio: number) {
    const percentage = 100 * ratio;
    return percentage.toFixed(0);
  }

  static formatRate(rate: number) {
    const percentage = rate === 0 ? 100 * rate : 100 * (rate - 1);
    return `${percentage.toFixed(2)}%`;
  }

  static formatPercent = new Intl.NumberFormat('en-US', {
    style: 'percent',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  static formatPercentFee = new Intl.NumberFormat('en-US', {
    style: 'percent',
    minimumFractionDigits: 2,
    maximumFractionDigits: 4,
  });

  static formatDuration(duration: number) {
    const mins = duration / 60;
    if (duration % (60 * 60) !== 0) {
      return `${mins} mins`;
    }
    const hours = mins / 60;
    if (duration % (24 * 60 * 60) !== 0) {
      return `${hours} hrs`;
    }
    const days = hours / 24;
    return `${days} days`;
  }

  static formatAmount(amount: number | string, decimals = 0) {
    const amountNumber = Number(amount.toString());
    const options = {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    };
    return amountNumber.toLocaleString(undefined, options);
  }

  static formatAddress(address: string, length = 8) {
    if (!address) {
      return '';
    }
    const ellipsizedAddress = `${address.substr(
      0,
      2 + length / 2,
    )}…${address.substr(42 - length / 2)}`;
    return ellipsizedAddress;
  }

  static formatMultiplier(amount: number, decimals = 2, space = false) {
    const spaceValue = space ? ' ' : '';
    if (amount >= 1e6) {
      const shortAmount = amount / 1e6;
      return `${shortAmount.toFixed(decimals)}${spaceValue} M`;
    }
    if (amount >= 1e3) {
      const shortAmount = amount / 1e3;
      return `${shortAmount.toFixed(decimals)}${spaceValue} K`;
    }
    if (amount >= 1e9) {
      const shortAmount = amount / 1e3;
      return `${shortAmount.toFixed(decimals)}${spaceValue} B`;
    }
    if (amount >= 1e12) {
      const shortAmount = amount / 1e3;
      return `${shortAmount.toFixed(decimals)}${spaceValue} T`;
    }
    return amount.toFixed(decimals);
  }
}

export default Formatter;

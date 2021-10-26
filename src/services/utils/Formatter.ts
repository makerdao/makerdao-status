class Formatter {
  static formatFee(fee: number) {
    const apy = fee ** (60 * 60 * 24 * 365) - 1;
    const apyPercentage = apy * 100;
    return `${apyPercentage.toFixed(2)}%`;
  }

  static formatRatio(ratio: number) {
    const percentage = 100 * ratio;
    return `${percentage.toFixed(0)}%`;
  }

  static formatRate(rate: number) {
    const percentage = rate === 0 ? 100 * rate : 100 * (rate - 1);
    return `${percentage.toFixed(2)}%`;
  }

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

  static formatAmount(amount: number, decimals = 0) {
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

  static formatMultiplier(amount: number, decimals = 2) {
    if (amount >= 1e6) {
      const shortAmount = amount / 1e6;
      return `${shortAmount.toFixed(decimals)}M`;
    }
    if (amount >= 1e3) {
      const shortAmount = amount / 1e3;
      return `${shortAmount.toFixed(decimals)}K`;
    }
    return amount.toFixed(decimals);
  }
}

export default Formatter;

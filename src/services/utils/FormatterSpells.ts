class FormatterSpells {
  static formatFee(fee: number) {
    const apy = fee ** (60 * 60 * 24 * 365) - 1;
    const apyPercentage = apy * 100;
    return `${apyPercentage.toFixed(2)}%`;
  }

  static formatRatio(ratio: number, asNumber = false) {
    const percentage = 100 * ratio;

    return asNumber
      ? Number(this.formatDecimal(percentage, 2))
      : `${this.formatDecimal(percentage, 2)}%`;
  }

  static formatRate(rate: number) {
    const percentage = rate === 0 ? 100 * rate : 100 * (rate - 1);
    return `${this.formatDecimal(percentage, 2)}%`;
  }

  static formatPercent = new Intl.NumberFormat('en-US', {
    style: 'percent',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });

  static formatPercentFee = new Intl.NumberFormat('en-US', {
    style: 'percent',
    minimumFractionDigits: 0,
    maximumFractionDigits: 4,
  });

  static formatAmount(amount: number | string, decimals = 2) {
    const amountNumber = Number(amount.toString());
    const options = {
      minimumFractionDigits: 0,
      maximumFractionDigits: decimals,
    };
    return amountNumber.toLocaleString('en-US', options);
  }

  static formatDecimal(number:number, decimals = 2) {
    const options = {
      minimumFractionDigits: 0,
      maximumFractionDigits: decimals,
    };
    return number.toLocaleString('en-US', options);
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
    if (amount >= 1e12) {
      const shortAmount = amount / 1e12;
      return `${this.formatDecimal(shortAmount, decimals)}${spaceValue} T`;
    }
    if (amount >= 1e9) {
      const shortAmount = amount / 1e9;
      return `${this.formatDecimal(shortAmount, decimals)}${spaceValue} B`;
    }
    if (amount >= 1e6) {
      const shortAmount = amount / 1e6;
      return `${this.formatDecimal(shortAmount, decimals)}${spaceValue} M`;
    }
    if (amount >= 1e3) {
      const shortAmount = amount / 1e3;
      return `${shortAmount.toFixed(decimals)}${spaceValue} K`;
    }
    return this.formatDecimal(amount, decimals);
  }

  static formatRawDaiAmount(value: string, decimals = 2) {
    return `${this.formatAmount(value, decimals)} DAI`;
  }

  static formatDaiAmountAsMultiplier(value: string) {
    return `${this.formatMultiplier(Number(value), 0)} DAI`;
  }
}

export default FormatterSpells;

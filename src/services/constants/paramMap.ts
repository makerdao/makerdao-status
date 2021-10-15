const paramMap = {
  'Vat-Line': 'Ceiling',
  'Jug-base': 'Base stability fee',
  'Pot-dsr': 'Savings rate',
  'Cat-box': 'Total auction limit',
  'Flap-beg': 'Surplus auction min bid increase',
  'Flap-tau': 'Surplus auction duration',
  'Flap-ttl': 'Surplus auction bid duration',
  'Flop-beg': 'Debt auction min bid increase',
  'Flop-tau': 'Debt auction duration',
  'Flop-ttl': 'Debt auction bid duration',
  'Flop-pad': 'Debt auction lot size increase',
  'Vow-hump': 'Surplus auction buffer',
  'Vow-bump': 'Surplus lot size',
  'Vow-sump': 'Debt auction bid size',
  'Vow-dump': 'Debt auction initial lot size',
  'Vow-wait': 'Debt auction delay',
  'Pause-delay': 'Timelock',
} as Record<string, string>;

export default paramMap;

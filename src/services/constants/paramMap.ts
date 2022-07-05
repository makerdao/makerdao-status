const paramMap = {
  'Vat-Line': 'Ceiling',
  'Jug-base': 'Base stability fee',
  'Pot-dsr': 'Savings rate',
  'Cat-box': 'Total auction limit',
  'Flapper-beg': 'Surplus auction min bid increase',
  'Flapper-tau': 'Surplus auction duration',
  'Flapper-ttl': 'Surplus auction bid duration',
  'Flopper-beg': 'Debt auction min bid increase',
  'Flopper-tau': 'Debt auction duration',
  'Flopper-ttl': 'Debt auction bid duration',
  'Flopper-pad': 'Debt auction lot size increase',
  'Vow-hump': 'Surplus auction buffer',
  'Vow-bump': 'Surplus lot size',
  'Vow-sump': 'Debt auction bid size',
  'Vow-dump': 'Debt auction initial lot size',
  'Vow-wait': 'Debt auction delay',
  'Pause-delay': 'Timelock',
} as Record<string, string>;

export default paramMap;

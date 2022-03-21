const getParameterToFilter = ({ parameter }: Definitions.SpellPagination) => {
  if (!parameter) return '';
  const arr = parameter.split('_');
  let contract = arr[0];
  switch (arr[0].toUpperCase()) {
    case 'SPOT':
      contract = 'SPOTTER';
      break;
    case 'CLIP':
      contract = 'CLIPPER';
      break;
    case 'DSSAUTOLINE':
      contract = 'DC-IAM';
      break;
    default:
      break;
  }
  if (['DC-IAM'].includes(arr[0])) {
    return `${contract.toUpperCase()}.${arr[1]}`;
  }
  if (arr.length === 2) {
    return `${contract.toUpperCase()}.ilks.${arr[1]}`;
  }
  return parameter;
};

export default getParameterToFilter;

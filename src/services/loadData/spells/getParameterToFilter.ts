const getParameterToFilter = ({ parameter }: Definitions.SpellPagination) => {
  if (!parameter) return '';
  const arr = parameter.split('_');

  const arrFirst = arr[0].toUpperCase();
  let contract = arrFirst;

  switch (arrFirst) {
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

  if (['CLIP', 'FLAPPER', 'FLIPPER', 'FLOPPER', 'VOW', 'D3M'].includes(arrFirst)) {
    return `${contract}.${arr[1]}`;
  }
  if (arr.length === 2) {
    return `${contract}.ilks.${arr[1]}`;
  }
  return parameter;
};

export default getParameterToFilter;

/* eslint-disable import/prefer-default-export */
export const getColorFromStatus = (status: Definitions.Status) => {
  switch (status) {
    case 'Hat':
      return '#2F80ED';
    case 'Passed':
      return '#20A558';
    case 'Pending':
      return '#9B51E0';
    case 'Skipped':
      return '#F2994A';
    case 'Expired':
      return '#EB5757';
    default:
      return '#31394d';
  }
};

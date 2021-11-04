/* eslint-disable no-useless-escape */
export const isAValidUrl = (url: string) => {
    const regexUrl = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/;

    return url?.match(regexUrl);
  };

  export const isMdUrlFile = (urlFile: string) => {
    const regexMdFileUrl = /(([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+)[A-Za-z0-9.-]+)\.md(?:#[\w]*)?/i;

    return urlFile?.match(regexMdFileUrl);
  };

  export const isAValidGithubMdUrl = (githubUrl: string) => {
    const regexToExtractGithubParameters = /^https:\/\/github\.com\/(?<user>[^\/]+)\/(?<repo>[^\/]+)\/blob\/(?<branch>[^\/]+)\/(?<address>.+\.md(?:#.*)*)$/i;

    return githubUrl?.match(regexToExtractGithubParameters);
  };

  export const isAValidRawMdUrl = (rawUrl: string) => {
    const regexToExtractGithubParameters = /^https:\/\/raw\.githubusercontent\.com\/(?<repo>[^\/]+)\/(?<user>[^\/]+)\/(?<branch>[^\/]+)\/(?<address>.+\.md(?:#.*)*)$/i;

    return rawUrl?.match(regexToExtractGithubParameters);
  };

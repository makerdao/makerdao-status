declare module '@trendmicro/react-sidenav';
declare namespace Definitions {
  export type Collaterals = {
    id: string;
    asset: string;
    art: string;
    rate: string;
    duty: string;
    line: string;
    dust: string;
    mat: string;
  }[];
  export type BasicStateType = Partial<{
    vatLine: string;
    jugBase: string;
    potDsr: string;
    catBox: string;
    flapBeg: string;
    flapTtl: string;
    flapTau: string;
    flopBeg: string;
    flopTtl: string;
    flopTau: string;
    flopPad: string;
    pauseDelay: string;
    esmMin: string;
    endWait: string;
    hump: string;
    bump: string;
    sump: string;
    dump: string;
    wait: string;
    collaterals: Definitions.Collaterals;
  }>;
}

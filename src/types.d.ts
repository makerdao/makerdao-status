declare module '@trendmicro/react-sidenav';
declare namespace Definitions {
  export type Collateral = {
    id: string;
    asset: string;
    art: string;
    rate: string;
    duty: string;
    line: string;
    dust: string;
    mat: string;
  };
  export type Cat = {
    id: string;
    asset: string;
    chop: string;
    dunk: string;
  };
  export type Flip = {
    id: string;
    asset: string;
    beg: strirng;
    ttl: string;
    tau: string;
  };
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
    collaterals: Definitions.Collateral[];
    cats: Definitions.Cat[];
    flips: Definitions.Flip[];
  }>;
}

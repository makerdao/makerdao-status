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
  export type SpellChange = {
    id: string;
    param: string;
    term: string;
    oldValueFormatted?: string;
    newValueFormatted?: string;
    value: string;
    asset?: string;
  };
  export type Status = 'Hat' | 'Passed' | 'Pending' | 'Skipped' | 'Expired';
  export type Spell = {
    status: Status;
    address: string;
    title: string;
    created: string;
    casted: string | null;
    changes: SpellChange[];
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

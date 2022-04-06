declare module '@trendmicro/react-sidenav';
declare namespace Definitions {
  export type Collateral = {
    id: string;
    token: string;
    address: string;
    asset: string;
    jug_duty: ethers.BigNumber;
    vat_line: string;
    vat_rate: string;
    vat_Art: string;
    vat_amountOfDebt: BigNumber;
    dss_auto_line_line: string;
    spot_mat: string;
    dog_chop: string;
    dss_pms_tin?: string;
    dss_pms_tout?: string;
    dog_hole: string;
    clip_cusp?: string;
    clip_tail?: string;
    clipMom_tolerance?: string;
    clip_chip?: string;
    clip_tip?: string;
    dss_auto_line_gap: string;
    vat_dust: string;
    calc_step?: string;
    calc_cut?: string;
    doc?: string;

    locked: string;
    lockedBN: ethers.BigNumber;

    clip_calc?: string;
    clip_buf?: string;
    dss_auto_line_ttl: BigNumber;

    humanReadableName?: string;
    iconImg?: string;

    direct_bar: string;
    direct_tau: string;
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
  export type SpellChangeBeforeTransform = {
    block: number;
    from_value: number;
    ilk: string;
    parameter: string;
    spell: string;
    timestamp: string;
    title: string | null;
    tx_hash: string;
    to_value: string;
    tx_hash: string;
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
    id: string;
    status: Status;
    spell: string;
    title: string;
    timestamp: string;
    impact: number;
  };
  export type ChangelogState = { changelog?: Object<string, string> };
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
    flashLine: string;
    flashToll: string;
    d3mAdaiBar: string;
    vatDebt: string;
    cats: Definitions.Cat[];
    flips: Definitions.Flip[];
  }> & {
    collaterals: Definitions.Collateral[];
  } & {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    changelog?: any;
  };
  export type CollateralsStructure = {
    filters?: Definitions.CollateralFilter[];
    categories?: Definitions.CollateralCategory[];
    default_category?: Definitions.CollateralCategory[];
    flavours_by_collaterals?: Definitions.CollateralConfig[];
    collaterals?: {
      name: string;
      human_readable_name?: string;
      icon: string;
    }[];
    flavours?: Definitions.Flavours[];
  };
  export type CollateralFilter = {
    has_clear_all?: boolean;
    color?: string;
    tags: string[];
    selected?: boolean;
    default_selected?: string[];
  };
  export type CollateralCategory = {
    name?: string;
    fields?: { name?: string; link?: string; filters: string[] }[];
    includes?: string[];
    rules?: { field: string; gt: number }[];
  };
  export type CollateralConfig = {
    flavours: string[];
    names: string[];
  };
  export type Flavours = {
    name: string;
    exclude: string[];
    include: string[];
  };
  export type HistoricalDebt = {
    block: string;
    debtCeiling: string;
    timestamp: string;
    totalDebt: string;
  };
  export type CMSProposal = {
    active: boolean;
    address: string;
    key: string;
    content?: string;
    about: string;
    proposalBlurb: string;
    title: string;
    date: string;
    proposalLink: string;
  };
  export type GithubPage = {
    name: string;
    path: string;
    url: string;
    download_url: string;
    type: string;
  };
  export type SpellData = {
    address: string;
    hasBeenCast: boolean;
    hasBeenScheduled: boolean;
    eta?: Date;
    expiration?: Date;
    nextCastTime: Date;
    datePassed?: Date;
    dateExecuted?: Date;
    mkrSupport: number;
    executiveHash?: string;
    officeHours?: boolean;
  };
  type SpellPagination = {
    spell?: string;
    limit?: number;
    skip?: number;
    ilk?: string;
    parameter?: string;
  };
}

declare module 'marked/lib/marked.js';

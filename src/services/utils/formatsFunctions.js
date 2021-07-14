import BigNumber from "bignumber.js";
import { addresses } from "../constants/addresses";
import Converter from "./Converter";
import Formatter from "./Formatter";




export const Status = {
  Hat: "Hat",
  Passed: "Passed",
  Pending: "Pending",
  Skipped: "Skipped",
};

export const ilkIds = [
  "ETH-A",
  "ETH-B",
  "USDC-A",
  "USDC-B",
  "TUSD-A",
  "USDT-A",
  "PAXUSD-A",
  "WBTC-A",
  "BAT-A",
  "KNC-A",
  "ZRX-A",
  "MANA-A",
  "LRC-A",
  "COMP-A",
  "LINK-A",
  "BAL-A",
  "YFI-A",
  "GUSD-A",
  "RENBTC-A",
  "UNI-A",
  "AAVE-A",
  "UNIV2DAIETH-A",
  // 'SAI',
];


export function getUtilization(asset, art, rate, line) {
  const artNumber = new BigNumber(art);
  return artNumber.times(rate).div(line).toNumber();
}

export function formatAmount(value) {
  return Formatter.formatMultiplier(Converter.fromWad(value), 0);
}

export function formatDaiAmount(value) {
  return Formatter.formatMultiplier(
    Converter.fromWad(Converter.fromRay(value)),
    0
  );
}

export function formatRatio(value) {
  return Formatter.formatRatio(value);
}

export function formatRayRatio(value) {
  return Formatter.formatRatio(Converter.fromRay(value));
}

export function formatRayRate(value) {
  return Formatter.formatRate(Converter.fromRay(value));
}

export function formatWadRate(value) {
  return Formatter.formatRate(Converter.fromWad(value));
}

export function formatFee(value) {
  return Formatter.formatFee(Converter.fromRay(value));
}

export function formatDuration(value) {
  return Formatter.formatDuration(value);
}

export function getEtherscanLink(contract) {
  const contractAddress = addresses[contract] || contract;
  return `https://etherscan.io/address/${contractAddress}`;
}

export function noFormat(value) {
  return value;
}

export function formatTimestamp(timestampString) {
  const timestamp = parseInt(timestampString);
  const date = new Date(timestamp * 1000);
  const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
  return date.toLocaleString('en-US', options);
}

export function formatAddress(address) {
  return Formatter.formatAddress(address);
}


export function getSpellStatus(
  address,
  latestSpell,
  latestPassedSpell,
  lifted
) {
  if (address === latestPassedSpell?.id) {
    return Status.Hat;
  } else if (lifted) {
    return Status.Passed;
  } else if (address === latestSpell?.id) {
    return Status.Pending;
  } else {
    return Status.Skipped;
  }
}

export async function fetchSpellMetadata() {
  const metadataUrl =
    "https://cms-gov.makerfoundation.com/content/all-spells?network=mainnet";
  const response = await fetch(metadataUrl);
  const json = await response.json();
  console.log({ json });
  return json;
}

export function getParamName(param) {
  const paramMap = {
    "Vat-Line": "Ceiling",
    "Jug-base": "Base stability fee",
    "Pot-dsr": "Savings rate",
    "Cat-box": "Total auction limit",
    "Flap-beg": "Surplus auction min bid increase",
    "Flap-tau": "Surplus auction duration",
    "Flap-ttl": "Surplus auction bid duration",
    "Flop-beg": "Debt auction min bid increase",
    "Flop-tau": "Debt auction duration",
    "Flop-ttl": "Debt auction bid duration",
    "Flop-pad": "Debt auction lot size increase",
    "Vow-hump": "Surplus auction buffer",
    "Vow-bump": "Surplus lot size",
    "Vow-sump": "Debt auction bid size",
    "Vow-dump": "Debt auction initial lot size",
    "Vow-wait": "Debt auction delay",
    "Pause-delay": "Timelock",
  };
  for (const ilk of ilkIds) {
    paramMap[`Vat-${ilk}-dust`] = `Min DAI in ${ilk} Vault`;
    paramMap[`Vat-${ilk}-line`] = `${ilk} Ceiling`;
    paramMap[`Spot-${ilk}-mat`] = `${ilk} col. ratio`;
    paramMap[`Jug-${ilk}-duty`] = `${ilk} stability fee`;
    paramMap[`Cat-${ilk}-chop`] = `${ilk} liquidation penalty`;
    paramMap[`Cat-${ilk}-dunk`] = `${ilk} liquidation auction size`;
    paramMap[`Cat-${ilk}-lump`] = `${ilk} liquidation lot size`;
    paramMap[`Flip-${ilk}-beg`] = `${ilk} auction min. bid increase`;
    paramMap[`Flip-${ilk}-tau`] = `${ilk} auction duration`;
    paramMap[`Flip-${ilk}-ttl`] = `${ilk} auction bid duration`;
  }
  return paramMap[param];
}

export function getTermName(param) {
  const termMap = {
    "Vat-Line": "VatLine",
    "Jug-base": "Jugbase",
    "Pot-dsr": "Potdsr",
    "Cat-box": "Catbox",
    "Flap-beg": "Flapbeg",
    "Flap-tau": "Flaptau",
    "Flap-ttl": "Flapttl",
    "Flop-beg": "Flopbeg",
    "Flop-tau": "Floptau",
    "Flop-ttl": "Flopttl",
    "Flop-pad": "Floppad",
    "Vow-hump": "Vowhump",
    "Vow-bump": "Vowbump",
    "Vow-sump": "Vowsump",
    "Vow-dump": "Vowdump",
    "Vow-wait": "Vowwait",
    "Pause-delay": "Pausedelay",
  };
  for (const ilk of ilkIds) {
    termMap[`Vat-${ilk}-dust`] = `Vat[${ilk}]dust`;
    termMap[`Vat-${ilk}-line`] = `Vat[${ilk}]line`;
    termMap[`Spot-${ilk}-mat`] = `Spot[${ilk}]mat`;
    termMap[`Jug-${ilk}-duty`] = `Jug[${ilk}]duty`;
    termMap[`Cat-${ilk}-chop`] = `Cat[${ilk}]chop`;
    termMap[`Cat-${ilk}-dunk`] = `Cat[${ilk}]dunk`;
    termMap[`Cat-${ilk}-lump`] = `Cat[${ilk}]lump`;
    termMap[`Flip-${ilk}-beg`] = `Flip[${ilk}]beg`;
    termMap[`Flip-${ilk}-tau`] = `Flip[${ilk}]tau`;
    termMap[`Flip-${ilk}-ttl`] = `Flip[${ilk}]ttl`;
  }
  return termMap[param];
}

export function getValue(param, value) {
  if (!value) {
    return;
  }
  const formatFuncMap = {
    "Vat-Line": formatDaiAmount,
    "Jug-base": formatWadRate,
    "Pot-dsr": formatFee,
    "Cat-box": formatDaiAmount,
    "Flap-beg": formatWadRate,
    "Flap-tau": formatDuration,
    "Flap-ttl": formatDuration,
    "Flop-beg": formatWadRate,
    "Flop-tau": formatDuration,
    "Flop-ttl": formatDuration,
    "Flop-pad": formatWadRate,
    "Vow-hump": formatDaiAmount,
    "Vow-bump": formatDaiAmount,
    "Vow-sump": formatDaiAmount,
    "Vow-dump": formatAmount,
    "Vow-wait": formatDuration,
    "Pause-delay": formatDuration,
  };
  for (const ilk of ilkIds) {
    formatFuncMap[`Vat-${ilk}-dust`] = formatDaiAmount;
    formatFuncMap[`Vat-${ilk}-line`] = formatDaiAmount;
    formatFuncMap[`Spot-${ilk}-mat`] = formatRatio;
    formatFuncMap[`Jug-${ilk}-duty`] = formatFee;
    formatFuncMap[`Cat-${ilk}-chop`] = formatWadRate;
    formatFuncMap[`Cat-${ilk}-dunk`] = formatDaiAmount;
    formatFuncMap[`Cat-${ilk}-lump`] = formatAmount;
    formatFuncMap[`Flip-${ilk}-beg`] = formatWadRate;
    formatFuncMap[`Flip-${ilk}-tau`] = formatDuration;
    formatFuncMap[`Flip-${ilk}-ttl`] = formatDuration;
  }
  const formatFunc = formatFuncMap[param] || noFormat;
  return formatFunc(value);
}


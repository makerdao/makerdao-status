import BigNumber from "bignumber.js";
import { addresses } from "../constants/addresses";
import Converter from "./Converter";
import Formatter from "./Formatter";

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

export function _noFormat(value) {
  return value;
}

export function _formatAmount(value) {
  return Formatter.formatAmount(Converter.fromWad(value));
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

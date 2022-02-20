/* eslint-disable no-useless-escape */
import { ethers } from 'ethers';
import matter from 'gray-matter';
import { SupportedNetworks } from '../../utils/constants';

export default function parseExecutive(
  proposalDoc: string,
  proposalIndex: Record<string, string[]>,
  proposalLink: string,
  network: SupportedNetworks,
): Definitions.CMSProposal | null {
  const {
    content,
    data: { title, summary, address, date },
  } = matter(proposalDoc);
  // Remove empty docs
  if (!(content && title && summary && address && date)) {
    return null;
  }

  // remove if address is not a valid address
  try {
    ethers.utils.getAddress(address);
  } catch (_) {
    return null;
  }

  // remove if date is invalid
  if (!(date instanceof Date) || Number.isNaN(date.getTime())) {
    return null;
  }

  // eslint-disable-next-line @typescript-eslint/no-shadow
  const editTitle = (title: string) => {
    const vStr = 'Template - [Executive Vote] ';
    const pStr = 'Template - [Executive Proposal] ';
    if (title.indexOf(vStr) === 0) return title.replace(vStr, '');
    if (title.indexOf(pStr) === 0) return title.replace(pStr, '');
    return title;
  };

  return {
    about: content,
    content,
    title: editTitle(title),
    proposalBlurb: summary,
    key: slugify(title),
    address,
    date: String(date),
    active: proposalIndex[network].includes(proposalLink),
    proposalLink,
  };
}

export function slugify(string: string) {
  const a =
    'àáâäæãåāăąçćčđďèéêëēėęěğǵḧîïíīįìłḿñńǹňôöòóœøōõőṕŕřßśšşșťțûüùúūǘůűųẃẍÿýžźż·/_,:;';
  const b =
    'aaaaaaaaaacccddeeeeeeeegghiiiiiilmnnnnoooooooooprrsssssttuuuuuuuuuwxyyzzz------';
  const p = new RegExp(a.split('').join('|'), 'g');

  return string
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(p, (c) => b.charAt(a.indexOf(c)))
    .replace(/&/g, '-and-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
}

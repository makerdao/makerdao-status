import fetchGitHubPage from '../../github/fetchGitHubPage';
import markdownToHtml from '../../markdown/markdownToHtml';
import { SupportedNetworks } from '../../utils/constants';
import { EXEC_PROPOSAL_INDEX } from '../../utils/links';
import parseExecutive from './parseExecutive';

export async function getExecutiveProposals(
  network?: SupportedNetworks,
): Promise<Definitions.CMSProposal[]> {
  const currentNetwork = network || SupportedNetworks.MAINNET;

  const proposalIndex = await (await fetch(EXEC_PROPOSAL_INDEX)).json();

  const owner = 'makerdao';
  const repo = 'community';
  const path = 'governance/votes';

  const githubResponse = await fetchGitHubPage(owner, repo, path);
  const proposalUrls = githubResponse
    .filter((x) => x.type === 'file')
    .map((x) => x.download_url)
    .filter((x) => !!x);

  const proposals = await Promise.all(
    proposalUrls.map(
      async (proposalLink): Promise<Definitions.CMSProposal | null> => {
        const proposalDoc = await (await fetch(proposalLink)).text();

        return parseExecutive(
          proposalDoc,
          proposalIndex,
          proposalLink,
          currentNetwork,
        );
      },
    ),
  );

  const filteredProposals: Definitions.CMSProposal[] = proposals.filter(
    (x) => !!x,
  ) as Definitions.CMSProposal[];

  const sortedProposals = filteredProposals
    .sort(
      (a, b) =>
        new Date(b.date || '').getTime() - new Date(a.date || '').getTime(),
    )
    .slice(0, 100);

  return sortedProposals;
}

export async function getExecutiveProposal(
  proposalId: string,
  network?: SupportedNetworks,
): Promise<Definitions.CMSProposal | null> {
  const proposals = await getExecutiveProposals(network);
  // eslint-disable-next-line @typescript-eslint/no-shadow
  const proposal = proposals.find((proposal) => proposal.key === proposalId);
  if (!proposal) return null;
  const content = await markdownToHtml(proposal.about || '');
  return {
    ...proposal,
    content,
  };
}

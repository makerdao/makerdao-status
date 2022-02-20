import { Octokit } from 'octokit';

let octokit = new Octokit({ auth: process.env.REACT_APP_GITHUB_KEY });

export default async function fetchGitHubPage(
  owner: string,
  repo: string,
  path: string,
): Promise<Definitions.GithubPage[]> {
  if (!octokit) {
    octokit = new Octokit({ auth: process.env.REACT_APP_GITHUB_KEY });
  }

  const { data } = await octokit.request(
    'GET /repos/{owner}/{repo}/contents/{path}',
    {
      owner,
      repo,
      path,
    },
  );

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return data as any as Promise<Definitions.GithubPage[]>;
}

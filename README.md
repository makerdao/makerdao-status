# Some new catflip MakerDao Status Website


## Stagin Environment
[![Netlify Status](https://api.netlify.com/api/v1/badges/d1f262dc-3865-49aa-9c7a-6d42212c8c2f/deploy-status)](https://status-makerdao-stagin.netlify.app/)

https://status-makerdao-stagin.netlify.app

<hr>

## Production Environment

http://64.225.11.50

<hr>

## General work flow

1. We recommend the following git alias:

```sh
git config --global alias.pulf "pull --ff-only origin develop"
git config --global alias.pulr "pull --rebase origin develop"
git config --global alias.pushh "push origin HEAD"
```
In UNIX based system use single quote `'` instead of `"`

2. Download the origin branch and switch to the `develop` branch
```sh
git clone https://github.com/DSpotDevelopers/makerdao-status.git

git checkout develop
```

<br>

>START OF THE RECURSIVE FLOW

<br>

3. Update the `develop` branch

```sh
git pulf
```

4. In order to make your changes (new development or bug fix), create a local working branch ex: `feature/trello-106-improvements`:

```sh
git checkout -b feature/trello-106-improvements
```


5. Make all your changes and then make the commits (try to write a descriptive message about what was done in the commit)

```sh
...

git add.
git commit -m 'xxx xxxx xxx'

...
```


6. We stronly recommend no more than 5 commits per branche

7. Once your task is finish, you switch to the `develop` branch
 
```sh
git checkout develop
```

8. And update this `develop` branch

```sh
git pulf
```

9. Switch back to your working branch

```sh
git checkout -
```

10. You update your working branch with the commits you may have in the parent branch

```sh
git pulr
```

 In case of conflict when rebase, open the WEBSTORM or your IDE, go to VCS-> Git-> Resolve conflicts and very carefully resolve the conflict(s)

11. Finally upload your branch and do the PullRequest

```sh
git pushh
```

12. In case of comments in the PullRequest

13. Make the fix/change in the code and make another commit and push the changes to your PullRequest

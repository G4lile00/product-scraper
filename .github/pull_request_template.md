## Description
<!--- Describe your changes in detail -->
<!--- Explain your changes briefly -->
<!--- What types of changes does your code introduce? Put an `x` in all the boxes that apply: -->

## Modification Type
- [ ] Bug fix (non-breaking change which fixes an issue)
- [ ] New feature (non-breaking change which adds functionality)
- [ ] Refactoring (improve a current implementation without adding a new feature or fixing a bug)
- [ ] Breaking change (fix or feature that would cause existing functionality to not work as expected)
- [ ] Documentation Update (if none of the other choices apply)
- [ ] Other (Please describe):

## How Has This Been Tested?
<!--- Describe test that cover the changes on this PR -->


## Pull Request Guideline
To have your pull request approved, make sure it follows the following rules:

### Commits
- All commits has clean and understandable messages
- Commits have minimun number of changes, and files on it
- Commits should use git features such as: 
```bash
git add -p # add patched files to commits
git reset --soft HEAD~X # reset some commits to added changes to a single commit
git commit --amend # add changes to last commit
```
use above stratagies to make clear and few commits

### Tests
- All new code added must be covered by automatic tests
- All changed/refactored code must include test coverage
- ONLY emergency fix do not need test coverage to be approved, any other case must include tests

### Clean Code
- Make sure your code is clean and readable
- Make sure your functions do not get to long or complex 

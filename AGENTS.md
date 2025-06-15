# Codex Configuration

This repository includes guidelines for using the Codex agent.

## Programmatic checks

Run `npm run lint`, `npm run stylelint`, and `npm test` before committing.

## Guidelines

- Follow the existing ESLint, Stylelint, and Prettier configurations.
- Use only functional React components with hooks.
- Ensure all new code is fully typed with TypeScript.
- Maintain the existing project architecture and folder structure.
- Add or update JSDoc comments where appropriate.
- Keep documentation up to date with any code or API changes.
- Identify and document areas of technical debt, creating tasks for future refactoring.
- Optimize for accessibility (a11y) and performance where possible.

## Branching

- Use the following branch naming conventions:
  - `feature/<short-description>` for new features.
  - `bugfix/<short-description>` for bug fixes.
  - `hotfix/<short-description>` for urgent fixes.
  - `chore/<short-description>` for maintenance tasks.
- Branch names should be lowercase and use hyphens (`-`) as separators.
- Include the task or issue ID if applicable (e.g., `feature/123-add-dark-mode`).

## Tests

- Write unit tests for all new functionality.
- Ensure tests cover edge cases and error handling.
- Run `npm test` before committing or opening a pull request.
- Keep test coverage above the project’s defined minimum threshold.
- Document any new testing utilities or approaches in the `README` or `/docs`.

## Review

- All pull requests must be reviewed and approved by at least one other team member.
- Address all review comments before merging.
- Avoid merging PRs with failing checks (tests, linting, or build).
- When applicable, include screenshots or GIFs demonstrating visual changes.

## Dependencies

- Discuss any new dependency before adding it.
- Prefer lightweight, well-maintained libraries with active support.
- Remove unused dependencies regularly.
- Check for and avoid known vulnerabilities in dependencies using `npm audit`.

## Documentation & Technical Debt

- Update `README.md` and any related documentation when introducing new features or modifying existing functionality.
- Add entries to the project’s changelog for significant changes.
- Identify and clearly document any technical debt in issues or dedicated backlog tasks.

## Pull Request Messages

Follow the [Conventional Commits](https://www.conventionalcommits.org/) specification and write messages in English.  
Summaries should highlight important changes and reference any relevant files.  
Include a **Testing** section describing the results of `npm run lint`, `npm run stylelint`, and `npm test`.  
Add context for reviewers if changes are complex or span multiple areas of the project.

## Commit Messages

Follow the [Conventional Commits](https://www.conventionalcommits.org/) specification and write messages in English.  
Commit messages should briefly explain the reason for the change and its impact.

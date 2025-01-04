# Contributing to Mindforge

First off, thank you for considering contributing to Mindforge! It's people like you that make Mindforge such a great tool for AI research and experimentation.

## Code of Conduct

This project and everyone participating in it is governed by our [Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code.

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check the issue list as you might find out that you don't need to create one. When you are creating a bug report, please include as many details as possible:

* Use a clear and descriptive title
* Describe the exact steps which reproduce the problem
* Provide specific examples to demonstrate the steps
* Describe the behavior you observed after following the steps
* Explain which behavior you expected to see instead and why
* Include screenshots if possible

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion, please include:

* A clear and descriptive title
* A detailed description of the proposed functionality
* Explain why this enhancement would be useful to most Mindforge users
* List some examples of how it would be used

### Pull Requests

1. Fork the repo and create your branch from `main`
2. If you've added code that should be tested, add tests
3. If you've changed APIs, update the documentation
4. Ensure the test suite passes
5. Make sure your code lints
6. Issue that pull request!

## Development Process

1. Create a new branch:
\`\`\`bash
git checkout -b feature/your-feature-name
\`\`\`

2. Make your changes and commit them:
\`\`\`bash
git commit -m 'Add some feature'
\`\`\`

3. Push to the branch:
\`\`\`bash
git push origin feature/your-feature-name
\`\`\`

4. Submit a pull request

## Styleguides

### Git Commit Messages

* Use the present tense ("Add feature" not "Added feature")
* Use the imperative mood ("Move cursor to..." not "Moves cursor to...")
* Limit the first line to 72 characters or less
* Reference issues and pull requests liberally after the first line

### TypeScript Styleguide

* Use TypeScript for all new code
* Follow the existing code style
* Use meaningful variable names
* Document complex code sections
* Add type annotations for function parameters and return types

### Documentation Styleguide

* Use Markdown for documentation
* Reference functions and classes with backticks: \`MyClass\`
* Include code examples when relevant
* Keep documentation up to date with code changes

## Project Structure

\`\`\`
Mindforge/
├── src/
│   ├── models/      # Data models and types
│   ├── services/    # Business logic and services
│   ├── utils/       # Helper functions and utilities
│   ├── config/      # Configuration files
│   └── types/       # TypeScript type definitions
├── tests/           # Test files
├── docs/           # Documentation
└── examples/       # Example experiments
\`\`\`

## Testing

* Write tests for new features
* Run the test suite before submitting:
\`\`\`bash
npm test
\`\`\`

## Setting Up Your Development Environment

1. Install dependencies:
\`\`\`bash
npm install
\`\`\`

2. Set up your .env file:
\`\`\`bash
cp .env.example .env
# Edit .env with your settings
\`\`\`

3. Run in development mode:
\`\`\`bash
npm run dev
\`\`\`

## Questions?

Feel free to contact the project maintainers if you have any questions or need clarification on any aspect of contributing to Mindforge.

Thank you for your contribution! 🚀 
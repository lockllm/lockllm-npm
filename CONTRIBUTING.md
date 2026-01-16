# Contributing to LockLLM JavaScript/TypeScript SDK

Thank you for your interest in contributing to LockLLM! We welcome contributions from the community to help make AI security more accessible and effective.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [How Can I Contribute?](#how-can-i-contribute)
- [Development Setup](#development-setup)
- [Pull Request Process](#pull-request-process)
- [Coding Standards](#coding-standards)
- [Testing Guidelines](#testing-guidelines)
- [Reporting Bugs](#reporting-bugs)
- [Suggesting Enhancements](#suggesting-enhancements)

## Code of Conduct

This project adheres to a Code of Conduct that all contributors are expected to follow. Please read [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md) before contributing.

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check the existing issues to avoid duplicates. When creating a bug report, include:

- A clear and descriptive title
- Detailed steps to reproduce the issue
- Expected behavior vs actual behavior
- Code samples demonstrating the issue
- Your environment (Node.js version, OS, SDK version)
- Error messages and stack traces

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When suggesting an enhancement:

- Use a clear and descriptive title
- Provide a detailed description of the proposed functionality
- Explain why this enhancement would be useful
- Include code examples if applicable

### Code Contributions

1. **Fork the repository** and create your branch from `main`
2. **Make your changes** following our coding standards
3. **Add tests** for any new functionality
4. **Update documentation** as needed
5. **Submit a pull request**

## Development Setup

### Prerequisites

- Node.js 18+ and npm
- TypeScript knowledge
- Git

### Setup Steps

1. Fork and clone the repository:
```bash
git clone https://github.com/YOUR-USERNAME/lockllm-npm.git
cd lockllm-npm
```

2. Install dependencies:
```bash
npm install
```

3. Install peer dependencies for testing:
```bash
npm install openai @anthropic-ai/sdk
```

4. Run tests to ensure everything works:
```bash
npm test
```

5. Build the project:
```bash
npm run build
```

### Available Scripts

- `npm run build` - Build both CommonJS and ESM versions
- `npm test` - Run the test suite
- `npm run test:watch` - Run tests in watch mode
- `npm run test:coverage` - Generate coverage report
- `npm run lint` - Lint the codebase
- `npm run format` - Format code with Prettier
- `npm run typecheck` - Run TypeScript type checking

## Pull Request Process

1. **Update Documentation**: Ensure README.md and relevant documentation reflect your changes

2. **Add Tests**: All new features and bug fixes must include tests

3. **Run the Full Test Suite**:
```bash
npm run typecheck
npm test
npm run lint
```

4. **Update CHANGELOG**: Add your changes to the Unreleased section

5. **Write Clear Commit Messages**:
   - Use present tense ("Add feature" not "Added feature")
   - Use imperative mood ("Move cursor to..." not "Moves cursor to...")
   - Reference issues and pull requests when relevant

6. **Submit PR**:
   - Fill out the PR template completely
   - Link related issues
   - Request review from maintainers

7. **Address Review Feedback**: Be responsive to review comments and make requested changes

## Coding Standards

### TypeScript Style

- Use TypeScript for all source code
- Enable strict mode in `tsconfig.json`
- Provide type definitions for all public APIs
- Avoid using `any` - use `unknown` or proper types

### Code Style

We use ESLint and Prettier for consistent code style:

```bash
# Format code
npm run format

# Check linting
npm run lint
```

### Naming Conventions

- **Classes**: PascalCase (e.g., `LockLLM`, `PromptInjectionError`)
- **Functions/Methods**: camelCase (e.g., `createOpenAI`, `scanPrompt`)
- **Constants**: UPPER_SNAKE_CASE (e.g., `DEFAULT_TIMEOUT`)
- **Interfaces/Types**: PascalCase (e.g., `ScanRequest`, `ClientConfig`)
- **Private members**: Prefix with underscore (e.g., `_processRequest`)

### File Organization

- Place source code in `src/`
- Place tests alongside source files with `.test.ts` extension
- Export public API through `src/index.ts`
- Keep files focused and single-purpose

## Testing Guidelines

### Test Requirements

- All new features must include tests
- Bug fixes should include regression tests
- Aim for >90% code coverage
- Tests should be isolated and deterministic

### Writing Tests

We use Vitest for testing:

```typescript
import { describe, it, expect } from 'vitest';
import { LockLLM } from '../index';

describe('LockLLM', () => {
  it('should scan input successfully', async () => {
    const client = new LockLLM({ apiKey: 'test-key' });
    const result = await client.scan({ input: 'Hello world' });
    expect(result.safe).toBe(true);
  });
});
```

### Test Categories

- **Unit Tests**: Test individual functions and classes
- **Integration Tests**: Test wrapper functions with provider SDKs
- **Error Handling Tests**: Verify proper error handling

### Running Tests

```bash
# Run all tests
npm test

# Run specific test file
npm test -- scan.test.ts

# Run with coverage
npm run test:coverage

# Run in watch mode during development
npm run test:watch
```

## Documentation

### Code Documentation

- Add JSDoc comments for all public APIs
- Include parameter descriptions and return types
- Provide usage examples in comments

Example:
```typescript
/**
 * Scans input text for security threats
 * @param request - The scan request containing input text and options
 * @returns Promise resolving to scan results with safety classification
 * @throws {AuthenticationError} If API key is invalid
 * @example
 * ```typescript
 * const result = await client.scan({
 *   input: 'User input here',
 *   sensitivity: 'medium'
 * });
 * ```
 */
async scan(request: ScanRequest): Promise<ScanResponse>
```

### README Updates

- Update feature lists when adding capabilities
- Add examples for new functionality
- Keep API reference section current
- Update performance metrics if applicable

## Security Considerations

- Never commit API keys or secrets
- Be cautious with user input in examples
- Follow security best practices
- Report security vulnerabilities privately (see [SECURITY.md](SECURITY.md))

## Questions?

- Open an issue for questions about contributing
- Email support@lockllm.com for private inquiries
- Check existing issues and pull requests for similar discussions

## License

By contributing to LockLLM, you agree that your contributions will be licensed under the MIT License.

---

Thank you for contributing to LockLLM! Your efforts help make AI applications more secure for everyone.

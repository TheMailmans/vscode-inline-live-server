# Contributing to TBX Live Server

Thank you for your interest in contributing to TBX Live Server! We welcome contributions from everyone. This document will help you get started.

## 📞 Contact Information

- **Maintainer**: Tyler Mailman (TBX Development Team)
- **Email**: [themailmaninbox@gmail.com](mailto:themailmaninbox@gmail.com)
- **Discord**: th3mailman
- **GitHub**: [@TheMailmans](https://github.com/TheMailmans)

## 🚀 Quick Start

1. **Fork** the repository
2. **Clone** your fork: `git clone https://github.com/YOUR_USERNAME/vscode-inline-live-server.git`
3. **Install** dependencies: `npm install`
4. **Open** in VS Code: `code .`
5. **Start debugging**: Press `F5`

## 📋 Development Process

### 1. Setting Up Development Environment

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/vscode-inline-live-server.git
cd vscode-inline-live-server

# Install dependencies
npm install

# Install VS Code Extension Manager (if not already installed)
npm install -g @vscode/vsce

# Open in VS Code
code .
```

### 2. Running the Extension

- Press `F5` to start debugging
- This opens a new VS Code window with the extension loaded
- Open a HTML file and test the "Go Live" functionality

### 3. Building the Extension

```bash
# Development build
npm run compile

# Production build
npm run build

# Package extension
npm run package
```

## 🐛 Reporting Bugs

### Before Reporting

1. **Search existing issues** - Someone may have already reported it
2. **Check the FAQ** - Your issue might be documented there
3. **Try the latest version** - The bug may already be fixed

### How to Report

1. Go to [GitHub Issues](https://github.com/TheMailmans/vscode-inline-live-server/issues)
2. Click **"New Issue"**
3. Choose the appropriate template:
   - **Bug Report** - For unexpected behavior
   - **Feature Request** - For new functionality
   - **Documentation** - For documentation improvements

### Bug Report Template

```markdown
## Description

[Clear description of the bug]

## Steps to Reproduce

1. [Step 1]
2. [Step 2]
3. [Step 3]

## Expected Behavior

[What should happen]

## Actual Behavior

[What actually happens]

## Environment

- VS Code Version: [e.g., 1.74.0]
- OS: [e.g., Windows 10, macOS 13.0, Ubuntu 22.04]
- Extension Version: [e.g., 6.0.0]
- Node.js Version: [e.g., 18.15.0]

## Screenshots

[If applicable, add screenshots]

## Additional Context

[Any other relevant information]
```

## ✨ Feature Requests

We love hearing about new features! Here's how to suggest one:

1. Go to [GitHub Issues](https://github.com/TheMailmans/vscode-inline-live-server/issues)
2. Click **"New Issue"**
3. Select **"Feature Request"** template
4. Fill out the template with:
   - **Problem statement** - What issue does this solve?
   - **Proposed solution** - How would you implement it?
   - **Alternatives considered** - Other ways to solve the problem
   - **Use cases** - Real-world scenarios where this would be helpful

## 🔧 Contributing Code

### Code Style

- Use **TypeScript** for all new code
- Follow **ESLint** and **Prettier** configurations
- Use **async/await** instead of callbacks where possible
- Add **JSDoc** comments for public APIs
- Write **tests** for new functionality

### Pull Request Process

1. **Fork** the repository
2. **Create** a feature branch: `git checkout -b feature/amazing-feature`
3. **Make** your changes
4. **Add tests** if applicable
5. **Update documentation** if needed
6. **Commit** your changes: `git commit -m 'Add amazing feature'`
7. **Push** to your branch: `git push origin feature/amazing-feature`
8. **Open** a Pull Request

### Pull Request Checklist

- [ ] **Tests pass** - All existing and new tests should pass
- [ ] **Code formatted** - Run `npm run format` to format code
- [ ] **Documentation updated** - Update README, docs, or inline comments
- [ ] **No breaking changes** - Or clearly document them
- [ ] **Feature complete** - The feature works as described
- [ ] **Review feedback** - Address any review comments

### Code Review Process

1. **Automated checks** will run on your PR
2. **Maintainers** will review your code
3. **Address feedback** by making additional commits
4. **Approval** from at least one maintainer required
5. **Merge** when all checks pass

## 🧪 Testing

### Running Tests

```bash
# Run all tests
npm test

# Run unit tests only
npm run test:unit

# Run end-to-end tests
npm run test:e2e

# Run tests in watch mode
npm run test:watch
```

### Writing Tests

- **Unit tests** go in `test/suite/`
- **Integration tests** go in `test/e2e/`
- **Test utilities** go in `test/test-utils.ts`
- Use **Mocha** and **Chai** for test framework
- Mock VS Code APIs using `@vscode/test-electron`

### Test Coverage

We aim for **80%+ code coverage**. You can check coverage by:

```bash
# Install coverage tools (if needed)
npm install -g nyc

# Run tests with coverage
nyc npm test
```

## 📚 Documentation

### Documentation Files

- **README.md** - Main project documentation
- **docs/settings.md** - Configuration options
- **docs/faqs.md** - Frequently asked questions
- **CHANGELOG.md** - Version history
- **CONTRIBUTING.md** - This file

### Updating Documentation

1. **Keep it current** - Update docs when features change
2. **Use clear language** - Write for developers of all levels
3. **Include examples** - Show how to use new features
4. **Add screenshots** - Visual aids help users understand
5. **Test instructions** - Make sure steps actually work

## 🎨 Design and UX

### UI/UX Guidelines

- **Consistent with VS Code** - Follow VS Code design patterns
- **Accessible** - Support keyboard navigation and screen readers
- **Responsive** - Work well in different panel sizes
- **Intuitive** - Use familiar icons and terminology
- **Non-intrusive** - Don't interrupt user workflow

### Icons and Images

- Use **SVG** format for icons
- Follow **VS Code icon guidelines**
- Provide **high-resolution** screenshots
- Include **animated demos** when helpful

## 🚀 Release Process

### Version Bumping

We use [Semantic Versioning](https://semver.org/):

- **Major** (x.0.0) - Breaking changes
- **Minor** (x.y.0) - New features, backwards compatible
- **Patch** (x.y.z) - Bug fixes, backwards compatible

### Release Checklist

- [ ] **Update CHANGELOG.md** with new version
- [ ] **Update package.json** version number
- [ ] **Run tests** to ensure everything works
- [ ] **Build extension** for production
- [ ] **Test manually** in clean VS Code instance
- [ ] **Create GitHub release** with changelog
- [ ] **Publish to Marketplace** using `vsce publish`

## 🏆 Recognition

### Contributors

All contributors are listed in the **README.md** file and receive:

- **GitHub recognition** - Added to contributor list
- **Social media shoutouts** - Featured in release announcements
- **Priority support** - Direct access to maintainers
- **Beta access** - Early access to new features

### Hall of Fame

Special recognition for outstanding contributions:

- **Core Contributors** - Major feature implementations
- **Bug Bounty Winners** - Critical bug discoveries
- **Documentation Heroes** - Comprehensive documentation improvements
- **Community Champions** - Outstanding community support

## 📞 Getting Help

### Communication Channels

- **GitHub Issues** - For bug reports and feature requests
- **GitHub Discussions** - For questions and discussions
- **Email** - For private or sensitive matters
- **Discord** - For real-time chat (th3mailman)

### Community Guidelines

- **Be respectful** - Treat everyone with kindness
- **Stay on topic** - Keep discussions relevant
- **Help others** - Share your knowledge
- **Follow the code of conduct** - See CODE_OF_CONDUCT.md

## 📄 License

By contributing, you agree that your contributions will be licensed under the same license as the original project (MIT License).

## 💖 Support the Project

If you find TBX Live Server helpful and want to support its continued development:

[![Buy Me A Coffee](https://img.shields.io/badge/Buy%20Me%20A%20Coffee-Support%20Development-orange?style=for-the-badge&logo=buy-me-a-coffee)](https://buymeacoffee.com/th3mailman)

Your support helps maintain and improve this extension for the entire community!

## 🙏 Acknowledgments

Thank you to everyone who contributes to TBX Live Server! Your efforts help make this extension better for the entire VS Code community.

---

**Questions?** Feel free to reach out via email ([themailmaninbox@gmail.com](mailto:themailmaninbox@gmail.com)) or Discord (th3mailman).

**Happy coding!** 🚀

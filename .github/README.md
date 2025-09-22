# GitHub Actions CI/CD Pipeline

This document describes the comprehensive CI/CD pipeline for the Inline Live Server VS Code extension, providing automated testing, validation, and deployment capabilities.

## 🚀 Overview

The pipeline consists of three main workflows:

1. **CI/CD Pipeline** (`ci.yml`) - Comprehensive testing and validation
2. **Deployment Pipeline** (`deploy.yml`) - VS Code marketplace publishing
3. **Test Reporting** (`test-reporting.yml`) - Detailed test analysis and coverage

## 📋 Pipeline Features

### ✅ Automated Testing
- **Multi-platform testing** (Windows, macOS, Linux)
- **Node.js version matrix** (16, 18, 20)
- **Unit tests** with @vscode/test-electron
- **Smoke tests** for critical functionality
- **End-to-end tests** with WebDriver
- **VS Code compatibility** testing across versions

### 🔒 Security & Quality
- **Pre-publish validation** with comprehensive checks
- **Security scanning** with npm audit and Snyk
- **CodeQL analysis** for vulnerability detection
- **Bundle size validation** and optimization
- **Dependency vulnerability** scanning

### 📊 Test Reporting & Coverage
- **Coverage reporting** with configurable thresholds
- **Performance benchmarking** and monitoring
- **Comprehensive test reports** with detailed analysis
- **External dashboard integration** support
- **PR commenting** with test results

### 🚀 Deployment & Publishing
- **Automated versioning** (patch, minor, major, prerelease)
- **VS Code marketplace publishing** with approval gates
- **GitHub releases** with automatic tagging
- **Rollback procedures** for failed deployments
- **Post-deployment monitoring** and health checks

## 🏃‍♂️ Quick Start

### Running CI Pipeline

The CI pipeline runs automatically on:
- Push to `main` or `develop` branches
- Pull requests to `main` or `develop` branches
- Manual trigger via GitHub Actions UI

### Manual Deployment

1. Go to **Actions** tab in GitHub repository
2. Select **Deploy to VS Code Marketplace** workflow
3. Click **Run workflow**
4. Choose deployment environment and version type
5. Confirm deployment

### Required Secrets

Set up the following secrets in your GitHub repository:

```bash
# VS Code Marketplace Personal Access Token
VSCE_PAT=your_personal_access_token

# Snyk API token (optional, for security scanning)
SNYK_TOKEN=your_snyk_token

# GitHub token (automatically provided)
GITHUB_TOKEN=automatically_provided
```

## 📁 Workflow Details

### CI/CD Pipeline (`ci.yml`)

#### Jobs Overview
1. **Lint and Type Check** - Code quality validation
2. **Unit Tests** - Multi-platform testing matrix
3. **Smoke Tests** - Critical functionality verification
4. **E2E Tests** - End-to-end testing
5. **Build and Package** - Extension packaging and validation
6. **Security Scan** - Vulnerability and security analysis
7. **Platform Compatibility** - Cross-platform testing
8. **Performance Analysis** - Bundle analysis and optimization
9. **Quality Gate** - Overall pipeline validation
10. **Notification** - Success/failure notifications

#### Test Matrix
- **Operating Systems**: Ubuntu, Windows, macOS
- **Node.js Versions**: 16, 18, 20
- **VS Code Versions**: 1.74.0, 1.80.0, 1.85.0

### Deployment Pipeline (`deploy.yml`)

#### Deployment Stages
1. **Pre-deployment Validation** - Full test suite execution
2. **Staging Deployment** - Deploy to staging environment
3. **Production Deployment** - Deploy to production (manual approval)
4. **Automated Pre-release** - Automatic beta releases from develop
5. **Rollback** - Automated rollback on failure
6. **Post-deployment Monitoring** - Health checks and monitoring

#### Version Management
- **Patch**: Bug fixes (1.0.0 → 1.0.1)
- **Minor**: New features (1.0.0 → 1.1.0)
- **Major**: Breaking changes (1.0.0 → 2.0.0)
- **Prerelease**: Beta releases (1.0.0 → 1.0.1-beta.1)

### Test Reporting (`test-reporting.yml`)

#### Coverage Configuration
- **Target Threshold**: 80%
- **Minimum Threshold**: 70%
- **Coverage Tools**: nyc, Istanbul
- **External Integration**: Codecov

#### Performance Benchmarks
- **Build Performance** - Compilation time tracking
- **Test Performance** - Test execution time
- **Package Performance** - Extension packaging time

## 🔧 Configuration

### Environment Variables
```yaml
NODE_VERSION: '18'
VSCODE_VERSION: '1.74.0'
COVERAGE_THRESHOLD: 80
MIN_COVERAGE_THRESHOLD: 70
```

### Test Configuration
- **Unit Tests**: `npm run test:unit`
- **Smoke Tests**: `npx ts-node test/smoke-tests.ts`
- **E2E Tests**: `npm run test:e2e`
- **Linting**: `npm run test:lint`

### Build Configuration
- **Development Build**: `npm run compile:dev`
- **Production Build**: `npm run compile:prod`
- **Bundle Analysis**: `npm run build:analyze`

## 📈 Monitoring & Analytics

### Test Results
All test results are automatically uploaded as artifacts:
- Unit test results and coverage reports
- Smoke test execution logs and reports
- E2E test results and screenshots
- Performance benchmark data
- Bundle analysis reports

### Quality Gates
The pipeline includes multiple quality gates:
1. **Code Quality**: Linting and type checking
2. **Test Coverage**: Minimum coverage thresholds
3. **Security**: Vulnerability scanning
4. **Performance**: Bundle size limits
5. **Compatibility**: Cross-platform validation

## 🚨 Troubleshooting

### Common Issues

#### Pipeline Failures
1. **Check job logs** in GitHub Actions UI
2. **Verify Node.js version** compatibility
3. **Review test artifacts** for detailed error information
4. **Check dependency versions** for conflicts

#### Deployment Issues
1. **Verify VSCE_PAT** secret is correctly configured
2. **Check marketplace publishing** permissions
3. **Review pre-deployment** validation results
4. **Verify version numbering** conventions

#### Test Failures
1. **Check test environment** setup
2. **Review test dependencies** and versions
3. **Verify VS Code installation** for extension tests
4. **Check platform-specific** requirements

### Debug Mode
Enable debug mode by setting:
```bash
DEBUG: vscode-live-server:*
```

## 🤝 Contributing

### Code Changes
1. All changes require passing CI pipeline
2. PRs must include test coverage
3. Code must pass linting and type checking
4. Documentation updates required for new features

### Pipeline Changes
1. Test pipeline changes locally first
2. Update documentation for any workflow changes
3. Consider impact on CI/CD performance
4. Maintain backward compatibility when possible

## 📞 Support

For pipeline issues:
1. Check the **Actions** tab for detailed logs
2. Review **artifacts** for test reports and debug information
3. Create an issue with **pipeline** label for bugs
4. Use **enhancement** label for feature requests

## 📚 Additional Resources

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [VS Code Extension Publishing](https://code.visualstudio.com/api/working-with-extensions/publishing-extension)
- [VS Code Test API](https://code.visualstudio.com/api/working-with-extensions/testing-extension)
- [WebDriver Configuration](https://webdriver.io/docs/gettingstarted)

---

**Last Updated**: $(date)
**Pipeline Version**: 1.0.0
**Maintained by**: Development Team
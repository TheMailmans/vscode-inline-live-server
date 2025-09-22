#!/usr/bin/env node

/**
 * Inline Live Server Extension Test Runner
 *
 * This script automates the testing process for the Inline Live Server extension:
 * 1. Builds the VSIX package
 * 2. Runs Playwright tests
 * 3. Generates detailed test reports
 * 4. Provides clear pass/fail feedback
 */

import { execSync, spawn } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';

interface TestResult {
  success: boolean;
  duration: number;
  error?: string;
  reportPath?: string;
}

class ExtensionTestRunner {
  private extensionPath: string;
  private vsixPath: string;
  private testResultsPath: string;
  private startTime: number;

  constructor() {
    this.extensionPath = path.resolve(__dirname, '../../');
    this.vsixPath = path.resolve(this.extensionPath, 'tbx-live-server.vsix');
    this.testResultsPath = path.resolve(this.extensionPath, 'test-results');
    this.startTime = Date.now();
  }

  /**
   * Main test execution method
   */
  async runTests(): Promise<void> {
    console.log('🚀 Starting Inline Live Server Extension Tests');
    console.log('=' .repeat(60));

    const results: TestResult[] = [];

    try {
      // Step 1: Clean previous test results
      results.push(await this.cleanTestResults());

      // Step 2: Install dependencies
      results.push(await this.installDependencies());

      // Step 3: Build extension
      results.push(await this.buildExtension());

      // Step 4: Package VSIX
      results.push(await this.packageExtension());

      // Step 5: Install Playwright browsers
      results.push(await this.installPlaywrightBrowsers());

      // Step 6: Run Playwright tests
      results.push(await this.runPlaywrightTests());

      // Step 7: Generate final report
      this.generateFinalReport(results);

    } catch (error) {
      console.error('❌ Test runner failed:', error);
      process.exit(1);
    }
  }

  /**
   * Clean previous test results
   */
  private async cleanTestResults(): Promise<TestResult> {
    const startTime = Date.now();

    try {
      console.log('🧹 Cleaning previous test results...');

      if (fs.existsSync(this.testResultsPath)) {
        fs.rmSync(this.testResultsPath, { recursive: true, force: true });
      }

      fs.mkdirSync(this.testResultsPath, { recursive: true });

      return {
        success: true,
        duration: Date.now() - startTime
      };
    } catch (error) {
      return {
        success: false,
        duration: Date.now() - startTime,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  /**
   * Install dependencies
   */
  private async installDependencies(): Promise<TestResult> {
    const startTime = Date.now();

    try {
      console.log('📦 Installing dependencies...');

      execSync('npm ci', {
        cwd: this.extensionPath,
        stdio: 'inherit'
      });

      return {
        success: true,
        duration: Date.now() - startTime
      };
    } catch (error) {
      return {
        success: false,
        duration: Date.now() - startTime,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  /**
   * Build the extension
   */
  private async buildExtension(): Promise<TestResult> {
    const startTime = Date.now();

    try {
      console.log('🔨 Building extension...');

      execSync('npm run compile:prod', {
        cwd: this.extensionPath,
        stdio: 'inherit'
      });

      return {
        success: true,
        duration: Date.now() - startTime
      };
    } catch (error) {
      return {
        success: false,
        duration: Date.now() - startTime,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  /**
   * Package the extension into VSIX
   */
  private async packageExtension(): Promise<TestResult> {
    const startTime = Date.now();

    try {
      console.log('📦 Packaging extension...');

      execSync('npx vsce package --no-dependencies', {
        cwd: this.extensionPath,
        stdio: 'inherit'
      });

      // Verify VSIX was created
      if (!fs.existsSync(this.vsixPath)) {
        throw new Error('VSIX package was not created');
      }

      const stats = fs.statSync(this.vsixPath);
      console.log(`✅ VSIX package created: ${stats.size} bytes`);

      return {
        success: true,
        duration: Date.now() - startTime
      };
    } catch (error) {
      return {
        success: false,
        duration: Date.now() - startTime,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  /**
   * Install Playwright browsers
   */
  private async installPlaywrightBrowsers(): Promise<TestResult> {
    const startTime = Date.now();

    try {
      console.log('🌐 Installing Playwright browsers...');

      execSync('npx playwright install', {
        cwd: this.extensionPath,
        stdio: 'inherit'
      });

      return {
        success: true,
        duration: Date.now() - startTime
      };
    } catch (error) {
      return {
        success: false,
        duration: Date.now() - startTime,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  /**
   * Run Playwright tests
   */
  private async runPlaywrightTests(): Promise<TestResult> {
    const startTime = Date.now();

    return new Promise((resolve) => {
      console.log('🧪 Running Playwright tests...');

      const playwright = spawn('npx playwright test', {
        cwd: this.extensionPath,
        shell: true,
        stdio: 'inherit'
      });

      playwright.on('close', (code) => {
        const duration = Date.now() - startTime;
        const success = code === 0;

        if (success) {
          console.log('✅ Playwright tests completed successfully');
        } else {
          console.log('❌ Playwright tests failed');
        }

        resolve({
          success,
          duration,
          error: success ? undefined : `Playwright tests exited with code ${code}`
        });
      });

      playwright.on('error', (error) => {
        resolve({
          success: false,
          duration: Date.now() - startTime,
          error: error.message
        });
      });
    });
  }

  /**
   * Generate final test report
   */
  private generateFinalReport(results: TestResult[]): void {
    const totalDuration = Date.now() - this.startTime;
    const successfulSteps = results.filter(r => r.success).length;
    const failedSteps = results.filter(r => !r.success).length;

    console.log('\n' + '=' .repeat(60));
    console.log('📊 TEST EXECUTION SUMMARY');
    console.log('=' .repeat(60));

    console.log(`Total Duration: ${this.formatDuration(totalDuration)}`);
    console.log(`Successful Steps: ${successfulSteps}/${results.length}`);
    console.log(`Failed Steps: ${failedSteps}/${results.length}`);

    console.log('\n📋 Step Details:');
    results.forEach((result, index) => {
      const status = result.success ? '✅' : '❌';
      const stepName = this.getStepName(index);
      const duration = this.formatDuration(result.duration);

      console.log(`  ${index + 1}. ${stepName} - ${status} (${duration})`);

      if (!result.success && result.error) {
        console.log(`     Error: ${result.error}`);
      }
    });

    // Check for test results
    const htmlReportPath = path.resolve(this.testResultsPath, 'index.html');
    if (fs.existsSync(htmlReportPath)) {
      console.log(`\n📄 HTML Report: file://${htmlReportPath}`);
    }

    const jsonReportPath = path.resolve(this.testResultsPath, 'results.json');
    if (fs.existsSync(jsonReportPath)) {
      console.log(`📄 JSON Report: ${jsonReportPath}`);
    }

    if (failedSteps > 0) {
      console.log('\n❌ Some tests failed. Check the errors above for details.');
      process.exit(1);
    } else {
      console.log('\n🎉 All tests passed successfully!');
      process.exit(0);
    }
  }

  /**
   * Get step name by index
   */
  private getStepName(index: number): string {
    const stepNames = [
      'Clean Test Results',
      'Install Dependencies',
      'Build Extension',
      'Package Extension',
      'Install Playwright Browsers',
      'Run Playwright Tests'
    ];

    return stepNames[index] || `Step ${index + 1}`;
  }

  /**
   * Format duration in human-readable format
   */
  private formatDuration(ms: number): string {
    if (ms < 1000) {
      return `${ms}ms`;
    } else if (ms < 60000) {
      return `${(ms / 1000).toFixed(1)}s`;
    } else {
      return `${(ms / 60000).toFixed(1)}m`;
    }
  }
}

// Run the test runner if this script is executed directly
if (require.main === module) {
  const runner = new ExtensionTestRunner();
  runner.runTests().catch((error) => {
    console.error('❌ Test runner failed:', error);
    process.exit(1);
  });
}

export { ExtensionTestRunner };
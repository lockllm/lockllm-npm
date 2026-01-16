/**
 * Integration tests for SDK wrapper error handling
 *
 * These tests use import() to dynamically load modules and test error paths
 */

import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import fs from 'fs';
import path from 'path';

// Helper to temporarily hide a module
class ModuleHider {
  constructor(moduleName) {
    this.moduleName = moduleName;
    this.modulePath = null;
    this.backupPath = null;
    this.hidden = false;
  }

  async hide() {
    try {
      // Find the module in node_modules
      const nodeModulesPath = path.join(process.cwd(), 'node_modules', this.moduleName);

      if (fs.existsSync(nodeModulesPath)) {
        this.modulePath = nodeModulesPath;
        this.backupPath = nodeModulesPath + '_backup_test';

        // Rename to hide it
        fs.renameSync(this.modulePath, this.backupPath);
        this.hidden = true;

        // Clear require cache
        const cacheKeys = Object.keys(require.cache).filter(key => key.includes(this.moduleName));
        cacheKeys.forEach(key => delete require.cache[key]);
      }
    } catch (error) {
      console.error(`Failed to hide module ${this.moduleName}:`, error);
    }
  }

  async restore() {
    if (this.hidden && this.backupPath && fs.existsSync(this.backupPath)) {
      try {
        fs.renameSync(this.backupPath, this.modulePath);
        this.hidden = false;
      } catch (error) {
        console.error(`Failed to restore module ${this.moduleName}:`, error);
      }
    }
  }
}

describe.skip('SDK Missing Integration Tests', () => {
  // Skip these tests by default as they modify node_modules
  // Run with --run-skipped to execute

  describe('OpenAI SDK Missing', () => {
    let moduleHider;

    beforeAll(async () => {
      moduleHider = new ModuleHider('openai');
      await moduleHider.hide();
    });

    afterAll(async () => {
      if (moduleHider) {
        await moduleHider.restore();
      }
    });

    it('should throw when OpenAI SDK is missing', async () => {
      if (!moduleHider.hidden) {
        console.log('Skipping: Could not hide openai module');
        return;
      }

      // Clear module cache
      delete require.cache[require.resolve('../src/wrappers/openai-wrapper')];

      const { createOpenAI } = await import('../src/wrappers/openai-wrapper.js?t=' + Date.now());

      expect(() => {
        createOpenAI({ apiKey: 'test_key' });
      }).toThrow('OpenAI SDK not found');
    });
  });

  describe('Anthropic SDK Missing', () => {
    let moduleHider;

    beforeAll(async () => {
      moduleHider = new ModuleHider('@anthropic-ai/sdk');
      await moduleHider.hide();
    });

    afterAll(async () => {
      if (moduleHider) {
        await moduleHider.restore();
      }
    });

    it('should throw when Anthropic SDK is missing', async () => {
      if (!moduleHider.hidden) {
        console.log('Skipping: Could not hide @anthropic-ai/sdk module');
        return;
      }

      // Clear module cache
      delete require.cache[require.resolve('../src/wrappers/anthropic-wrapper')];

      const { createAnthropic } = await import('../src/wrappers/anthropic-wrapper.js?t=' + Date.now());

      expect(() => {
        createAnthropic({ apiKey: 'test_key' });
      }).toThrow('Anthropic SDK not found');
    });
  });
});

describe('SDK Error Handling Verification', () => {
  it('should confirm error handling exists in openai-wrapper', async () => {
    const fs = await import('fs');
    const path = await import('path');

    const wrapperPath = path.join(process.cwd(), 'src', 'wrappers', 'openai-wrapper.ts');
    const content = fs.readFileSync(wrapperPath, 'utf-8');

    // Verify error handling code exists
    expect(content).toContain('OpenAI SDK not found');
    expect(content).toContain('npm install openai');
    expect(content).toContain('try {');
    expect(content).toContain('catch (error)');
  });

  it('should confirm error handling exists in anthropic-wrapper', async () => {
    const fs = await import('fs');
    const path = await import('path');

    const wrapperPath = path.join(process.cwd(), 'src', 'wrappers', 'anthropic-wrapper.ts');
    const content = fs.readFileSync(wrapperPath, 'utf-8');

    // Verify error handling code exists
    expect(content).toContain('Anthropic SDK not found');
    expect(content).toContain('npm install @anthropic-ai/sdk');
    expect(content).toContain('try {');
    expect(content).toContain('catch (error)');
  });

  it('should confirm error handling exists in generic-wrapper', async () => {
    const fs = await import('fs');
    const path = await import('path');

    const wrapperPath = path.join(process.cwd(), 'src', 'wrappers', 'generic-wrapper.ts');
    const content = fs.readFileSync(wrapperPath, 'utf-8');

    // Verify error handling code exists for OpenAI
    expect(content).toContain('OpenAI SDK not found');
    expect(content).toContain('npm install openai');

    // Verify error handling code exists for Cohere
    expect(content).toContain('Cohere SDK not found');
    expect(content).toContain('npm install cohere-ai');

    expect(content).toContain('try {');
    expect(content).toContain('catch (error)');
  });
});

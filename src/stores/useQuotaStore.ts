/**
 * Quota cache that survives route switches.
 */

import { create } from 'zustand';
import type { AntigravityQuotaState, ClaudeQuotaState, CodebuddyQuotaState, CodexQuotaState, GeminiCliQuotaState, KimiQuotaState, TraeQuotaState } from '@/types';

type QuotaUpdater<T> = T | ((prev: T) => T);

interface QuotaStoreState {
  antigravityQuota: Record<string, AntigravityQuotaState>;
  claudeQuota: Record<string, ClaudeQuotaState>;
  codebuddyQuota: Record<string, CodebuddyQuotaState>;
  codexQuota: Record<string, CodexQuotaState>;
  geminiCliQuota: Record<string, GeminiCliQuotaState>;
  kimiQuota: Record<string, KimiQuotaState>;
  traeQuota: Record<string, TraeQuotaState>;
  setAntigravityQuota: (updater: QuotaUpdater<Record<string, AntigravityQuotaState>>) => void;
  setClaudeQuota: (updater: QuotaUpdater<Record<string, ClaudeQuotaState>>) => void;
  setCodebuddyQuota: (updater: QuotaUpdater<Record<string, CodebuddyQuotaState>>) => void;
  setCodexQuota: (updater: QuotaUpdater<Record<string, CodexQuotaState>>) => void;
  setGeminiCliQuota: (updater: QuotaUpdater<Record<string, GeminiCliQuotaState>>) => void;
  setKimiQuota: (updater: QuotaUpdater<Record<string, KimiQuotaState>>) => void;
  setTraeQuota: (updater: QuotaUpdater<Record<string, TraeQuotaState>>) => void;
  clearQuotaCache: () => void;
}

const resolveUpdater = <T,>(updater: QuotaUpdater<T>, prev: T): T => {
  if (typeof updater === 'function') {
    return (updater as (value: T) => T)(prev);
  }
  return updater;
};

export const useQuotaStore = create<QuotaStoreState>((set) => ({
  antigravityQuota: {},
  claudeQuota: {},
  codebuddyQuota: {},
  codexQuota: {},
  geminiCliQuota: {},
  kimiQuota: {},
  traeQuota: {},
  setAntigravityQuota: (updater) =>
    set((state) => ({
      antigravityQuota: resolveUpdater(updater, state.antigravityQuota)
    })),
  setClaudeQuota: (updater) =>
    set((state) => ({
      claudeQuota: resolveUpdater(updater, state.claudeQuota)
    })),
  setCodebuddyQuota: (updater) =>
    set((state) => ({
      codebuddyQuota: resolveUpdater(updater, state.codebuddyQuota)
    })),
  setCodexQuota: (updater) =>
    set((state) => ({
      codexQuota: resolveUpdater(updater, state.codexQuota)
    })),
  setGeminiCliQuota: (updater) =>
    set((state) => ({
      geminiCliQuota: resolveUpdater(updater, state.geminiCliQuota)
    })),
  setKimiQuota: (updater) =>
    set((state) => ({
      kimiQuota: resolveUpdater(updater, state.kimiQuota)
    })),
  setTraeQuota: (updater) =>
    set((state) => ({
      traeQuota: resolveUpdater(updater, state.traeQuota)
    })),
  clearQuotaCache: () =>
    set({
      antigravityQuota: {},
      claudeQuota: {},
      codebuddyQuota: {},
      codexQuota: {},
      geminiCliQuota: {},
      kimiQuota: {},
      traeQuota: {}
    })
}));

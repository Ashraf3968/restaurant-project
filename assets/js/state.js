import { defaultState } from './data.js';

const STORAGE_KEY = 'aurelio-house-demo-state';
const SESSION_KEY = 'aurelio-house-session';

const clone = (value) => JSON.parse(JSON.stringify(value));

export function initState() {
  const existing = localStorage.getItem(STORAGE_KEY);
  if (!existing) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultState));
  }
}

export function getState() {
  initState();
  return JSON.parse(localStorage.getItem(STORAGE_KEY));
}

export function saveState(nextState) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(nextState));
}

export function resetState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultState));
}

export function updateState(updater) {
  const current = getState();
  const draft = clone(current);
  updater(draft);
  saveState(draft);
  return draft;
}

export function getSession() {
  const raw = sessionStorage.getItem(SESSION_KEY) || localStorage.getItem(SESSION_KEY);
  return raw ? JSON.parse(raw) : null;
}

export function setSession(user, remember = false) {
  const target = remember ? localStorage : sessionStorage;
  const other = remember ? sessionStorage : localStorage;
  other.removeItem(SESSION_KEY);
  target.setItem(SESSION_KEY, JSON.stringify(user));
}

export function clearSession() {
  sessionStorage.removeItem(SESSION_KEY);
  localStorage.removeItem(SESSION_KEY);
}

export function makeId(prefix) {
  return `${prefix}-${Date.now()}-${Math.random().toString(16).slice(2, 8)}`;
}

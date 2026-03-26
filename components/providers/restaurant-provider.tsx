'use client';

import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { ADMIN_CREDENTIALS, defaultState, type MenuItem, type Message, type Reservation, type RestaurantState, type Review, type User } from '@/lib/data';
import { makeId } from '@/lib/utils';

type SessionUser = User | null;

type RestaurantContextValue = {
  state: RestaurantState;
  session: SessionUser;
  hydrated: boolean;
  login: (email: string, password: string, remember?: boolean) => { ok: boolean; message: string; user?: User };
  signup: (payload: Omit<User, 'id' | 'role'>) => { ok: boolean; message: string; user?: User };
  logout: () => void;
  addReservation: (payload: Omit<Reservation, 'id' | 'status'>) => void;
  addReview: (payload: Omit<Review, 'id' | 'approved'>) => void;
  addMessage: (payload: Omit<Message, 'id'>) => void;
  saveMenuItem: (payload: Omit<MenuItem, 'id'> & { id?: string }) => void;
  deleteMenuItem: (id: string) => void;
  updateReservationStatus: (id: string, status: Reservation['status']) => void;
  approveReview: (id: string) => void;
  deleteReview: (id: string) => void;
  updateContent: (payload: Partial<RestaurantState['content']>) => void;
};

const RestaurantContext = createContext<RestaurantContextValue | null>(null);
const STORAGE_KEY = 'aurelio-house-next-state';
const SESSION_KEY = 'aurelio-house-next-session';

const clone = <T,>(value: T): T => JSON.parse(JSON.stringify(value));

export function RestaurantProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<RestaurantState>(defaultState);
  const [session, setSession] = useState<SessionUser>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    const sessionValue = window.localStorage.getItem(SESSION_KEY) ?? window.sessionStorage.getItem(SESSION_KEY);
    if (stored) setState(JSON.parse(stored) as RestaurantState);
    else window.localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultState));
    if (sessionValue) setSession(JSON.parse(sessionValue) as User);
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [hydrated, state]);

  const persistSession = (user: User | null, remember = false) => {
    window.localStorage.removeItem(SESSION_KEY);
    window.sessionStorage.removeItem(SESSION_KEY);
    if (user) {
      const target = remember ? window.localStorage : window.sessionStorage;
      target.setItem(SESSION_KEY, JSON.stringify(user));
    }
    setSession(user);
  };

  const value = useMemo<RestaurantContextValue>(() => ({
    state,
    session,
    hydrated,
    login: (email, password, remember) => {
      const user = state.users.find((entry) => entry.email.toLowerCase() === email.toLowerCase() && entry.password === password);
      if (!user) return { ok: false, message: 'Invalid credentials. Use the demo admin account or a sample guest profile.' };
      persistSession(user, remember);
      return { ok: true, message: 'Login successful.', user };
    },
    signup: (payload) => {
      const exists = state.users.some((entry) => entry.email.toLowerCase() === payload.email.toLowerCase());
      if (exists) return { ok: false, message: 'An account with this email already exists.' };
      const user: User = { id: makeId('user'), role: 'guest', ...payload };
      setState((current) => ({ ...clone(current), users: [user, ...current.users] }));
      persistSession(user, true);
      return { ok: true, message: 'Account created.', user };
    },
    logout: () => persistSession(null),
    addReservation: (payload) => setState((current) => ({ ...clone(current), reservations: [{ id: makeId('res'), status: 'Pending', ...payload }, ...current.reservations] })),
    addReview: (payload) => setState((current) => ({ ...clone(current), reviews: [{ id: makeId('rev'), approved: false, ...payload }, ...current.reviews] })),
    addMessage: (payload) => setState((current) => ({ ...clone(current), messages: [{ id: makeId('msg'), ...payload }, ...current.messages] })),
    saveMenuItem: (payload) => setState((current) => {
      const next = clone(current);
      const id = payload.id ?? makeId('menu');
      const existing = next.menuItems.findIndex((entry) => entry.id === id);
      const item: MenuItem = { id, ...payload };
      if (existing >= 0) next.menuItems[existing] = item;
      else next.menuItems.unshift(item);
      return next;
    }),
    deleteMenuItem: (id) => setState((current) => ({ ...clone(current), menuItems: current.menuItems.filter((item) => item.id !== id) })),
    updateReservationStatus: (id, status) => setState((current) => ({ ...clone(current), reservations: current.reservations.map((item) => item.id === id ? { ...item, status } : item) })),
    approveReview: (id) => setState((current) => ({ ...clone(current), reviews: current.reviews.map((item) => item.id === id ? { ...item, approved: true } : item) })),
    deleteReview: (id) => setState((current) => ({ ...clone(current), reviews: current.reviews.filter((item) => item.id !== id) })),
    updateContent: (payload) => setState((current) => ({ ...clone(current), content: { ...current.content, ...payload } }))
  }), [hydrated, session, state]);

  return <RestaurantContext.Provider value={value}>{children}</RestaurantContext.Provider>;
}

export function useRestaurant() {
  const context = useContext(RestaurantContext);
  if (!context) throw new Error('useRestaurant must be used within RestaurantProvider');
  return context;
}

export const isAdminSession = (user: SessionUser) => user?.email === ADMIN_CREDENTIALS.email && user?.password === ADMIN_CREDENTIALS.password;


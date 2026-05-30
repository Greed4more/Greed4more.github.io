import { getSession, getUsers } from './faceAuth';

export type Deposit = {
  id: string;
  type: 'Dry' | 'Wet' | 'Metal' | 'Plastic' | 'E-Waste';
  binId: string;
  points: number;
  at: number;
};

export type UserProfileData = {
  deposits: Deposit[];
  points: number;
  redeemed: number;
};

const KEY = 'smartbin_user_data';

function readAll(): Record<string, UserProfileData> {
  try {
    return JSON.parse(localStorage.getItem(KEY) || '{}');
  } catch {
    return {};
  }
}

function writeAll(data: Record<string, UserProfileData>) {
  localStorage.setItem(KEY, JSON.stringify(data));
}

export function getCurrentUser() {
  const session = getSession();
  if (!session) return null;
  return getUsers().find((u) => u.email.toLowerCase() === session.email.toLowerCase()) ?? null;
}

export function getUserData(email: string): UserProfileData {
  const all = readAll();
  return all[email.toLowerCase()] ?? { deposits: [], points: 0, redeemed: 0 };
}

export function addDeposit(email: string, deposit: Omit<Deposit, 'id' | 'at'>): UserProfileData {
  const all = readAll();
  const key = email.toLowerCase();
  const existing = all[key] ?? { deposits: [], points: 0, redeemed: 0 };
  const newDeposit: Deposit = {
    ...deposit,
    id: crypto.randomUUID(),
    at: Date.now(),
  };
  const updated: UserProfileData = {
    ...existing,
    deposits: [newDeposit, ...existing.deposits],
    points: existing.points + deposit.points,
  };
  all[key] = updated;
  writeAll(all);
  return updated;
}

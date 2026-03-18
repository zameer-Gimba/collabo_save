
export type KYCStatus = 'pending' | 'verified' | 'failed' | 'not_started';
export type TrustScore = 'Low Risk' | 'Medium Risk' | 'High Risk' | 'Calculating...';

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  kycStatus: KYCStatus;
  trustScore: TrustScore;
  avatar?: string;
  successfulPaymentsCount: number;
  defaultedPaymentsCount: number;
  groupsCompletedCount: number;
  groupsJoinedCount: number;
  bio?: string;
}

export interface SavingsCircle {
  id: string;
  name: string;
  targetAmount: number;
  contributionAmount: number;
  frequency: 'daily' | 'weekly' | 'biweekly' | 'monthly';
  duration: number; // in frequency units
  totalMembers: number;
  currentMembers: number;
  status: 'active' | 'completed' | 'waiting';
  createdBy: string;
  nextPayoutDate: string;
}

export interface Membership {
  id: string;
  userId: string;
  circleId: string;
  payoutPosition: number;
  depositPaid: boolean;
  totalContributed: number;
}

export interface Contribution {
  id: string;
  circleId: string;
  userId: string;
  amount: number;
  cycleNumber: number;
  status: 'Paid' | 'Pending' | 'Late';
  paidAt: string;
}

// ── DEMO USERS ──────────────────────────────────────────────────────────────

/** Musa – the default / current user */
export const MOCK_USER: User = {
  id: 'u1',
  name: 'Musa Ibrahim',
  email: 'musa@3mtt.com',
  phone: '+234 801 234 5678',
  kycStatus: 'verified',
  trustScore: 'Low Risk',
  avatar: 'https://api.dicebear.com/8.x/avataaars/svg?seed=Amina&backgroundColor=ffd5dc',
  successfulPaymentsCount: 8,
  defaultedPaymentsCount: 0,
  groupsCompletedCount: 2,
  groupsJoinedCount: 2,
  bio: 'A reliable saver and active CollaboSave member.',
};

/** Amina – the "bad" profile */
export const MOCK_USER_BAD: User = {
  id: 'u2',
  name: 'Aminat Ola',
  email: 'amina@example.com',
  phone: '+234 802 345 6789',
  kycStatus: 'failed',
  trustScore: 'Calculating...',
  avatar: 'https://api.dicebear.com/8.x/avataaars/svg?seed=Musa&backgroundColor=b6e3f4',
  successfulPaymentsCount: 1,
  defaultedPaymentsCount: 3,
  groupsCompletedCount: 0,
  groupsJoinedCount: 2,
  bio: 'KYC failed and history of missed contributions.',
};

/** Chukwuemeka – the "good" profile */
export const MOCK_USER_GOOD_2: User = {
  id: 'u3',
  name: 'Chukwuemeka Eze',
  email: 'emeka@example.com',
  phone: '+234 803 456 7890',
  kycStatus: 'verified',
  trustScore: 'Calculating...',
  avatar: 'https://api.dicebear.com/8.x/avataaars/svg?seed=Emeka&backgroundColor=c0aede',
  successfulPaymentsCount: 15,
  defaultedPaymentsCount: 0,
  groupsCompletedCount: 3,
  groupsJoinedCount: 3,
  bio: 'Consistent, verified, and a top performer across multiple savings circles.',
};

/** All demo users (for the account switcher) */
export const ALL_MOCK_USERS: User[] = [MOCK_USER, MOCK_USER_BAD, MOCK_USER_GOOD_2];

// ── CIRCLES ──────────────────────────────────────────────────────────────────

export const MOCK_CIRCLES: SavingsCircle[] = [
  {
    id: 'c1',
    name: 'NextGen Fellows Monthly Savings',
    targetAmount: 500000,
    contributionAmount: 50000,
    frequency: 'monthly',
    duration: 10,
    totalMembers: 10,
    currentMembers: 10,
    status: 'active',
    createdBy: 'u3', // Chukwuemeka (good)
    nextPayoutDate: '2024-05-15',
  },
  {
    id: 'c2',
    name: '3MTT AI/ML Group Savings',
    targetAmount: 300000,
    contributionAmount: 25000,
    frequency: 'monthly',
    duration: 12,
    totalMembers: 12,
    currentMembers: 12,
    status: 'active',
    createdBy: 'u1', // Musa (good)
    nextPayoutDate: '2024-04-20',
  },
  {
    id: 'c3',
    name: 'Abuja Market Group',
    targetAmount: 500000,
    contributionAmount: 50000,
    frequency: 'monthly',
    duration: 10,
    totalMembers: 10,
    currentMembers: 5,
    status: 'waiting',
    createdBy: 'u2', // Amina (bad)
    nextPayoutDate: 'Pending',
  },
  {
    id: 'c4',
    name: 'Lagos Tech Ladies Circle',
    targetAmount: 600000,
    contributionAmount: 50000,
    frequency: 'monthly',
    duration: 12,
    totalMembers: 12,
    currentMembers: 12,
    status: 'active',
    createdBy: 'u3', // Chukwuemeka (good)
    nextPayoutDate: '2024-05-01',
  },
  {
    id: 'c5',
    name: 'Enugu Traders Pool',
    targetAmount: 200000,
    contributionAmount: 20000,
    frequency: 'monthly',
    duration: 10,
    totalMembers: 10,
    currentMembers: 8,
    status: 'waiting',
    createdBy: 'u2', // Amina (bad)
    nextPayoutDate: 'Pending',
  },
];

// ── MEMBERSHIPS ───────────────────────────────────────────────────────────────

export const MOCK_MEMBERSHIPS: Membership[] = [
  // Musa (u1)
  { id: 'm1', userId: 'u1', circleId: 'c2', payoutPosition: 2, depositPaid: true, totalContributed: 50000 },
  { id: 'm2', userId: 'u1', circleId: 'c1', payoutPosition: 5, depositPaid: true, totalContributed: 150000 },
  // Amina (u2)
  { id: 'm3', userId: 'u2', circleId: 'c1', payoutPosition: 1, depositPaid: true, totalContributed: 200000 },
  { id: 'm4', userId: 'u2', circleId: 'c4', payoutPosition: 3, depositPaid: true, totalContributed: 300000 },
  // Emeka (u3)
  { id: 'm5', userId: 'u3', circleId: 'c3', payoutPosition: 4, depositPaid: false, totalContributed: 20000 },
  { id: 'm6', userId: 'u3', circleId: 'c5', payoutPosition: 7, depositPaid: false, totalContributed: 20000 },
];

// ── CONTRIBUTIONS ─────────────────────────────────────────────────────────────

export const MOCK_CONTRIBUTIONS: Contribution[] = [
  // Musa
  { id: 'con1', circleId: 'c2', userId: 'u1', amount: 25000, cycleNumber: 1, status: 'Paid', paidAt: '2024-03-01' },
  { id: 'con2', circleId: 'c2', userId: 'u1', amount: 25000, cycleNumber: 2, status: 'Paid', paidAt: '2024-03-15' },
  { id: 'con3', circleId: 'c1', userId: 'u1', amount: 50000, cycleNumber: 1, status: 'Paid', paidAt: '2024-01-15' },
  { id: 'con4', circleId: 'c1', userId: 'u1', amount: 50000, cycleNumber: 2, status: 'Paid', paidAt: '2024-02-15' },
  { id: 'con5', circleId: 'c1', userId: 'u1', amount: 50000, cycleNumber: 3, status: 'Paid', paidAt: '2024-03-15' },
  // Amina (u2) – now bad profile with mostly missed/late payments
  { id: 'con6', circleId: 'c1', userId: 'u2', amount: 50000, cycleNumber: 1, status: 'Paid', paidAt: '2024-01-15' },
  { id: 'con7', circleId: 'c1', userId: 'u2', amount: 50000, cycleNumber: 2, status: 'Late', paidAt: '2024-02-18' },
  { id: 'con8', circleId: 'c1', userId: 'u2', amount: 50000, cycleNumber: 3, status: 'Pending', paidAt: '' },
  { id: 'con9', circleId: 'c4', userId: 'u2', amount: 50000, cycleNumber: 1, status: 'Pending', paidAt: '' },
  // Chukwuemeka (u3) – now good profile with perfect record
  { id: 'con11', circleId: 'c3', userId: 'u3', amount: 50000, cycleNumber: 1, status: 'Paid', paidAt: '2024-01-10' },
  { id: 'con12', circleId: 'c3', userId: 'u3', amount: 50000, cycleNumber: 2, status: 'Paid', paidAt: '2024-02-10' },
  { id: 'con13', circleId: 'c3', userId: 'u3', amount: 50000, cycleNumber: 3, status: 'Paid', paidAt: '2024-03-10' },
  { id: 'con14', circleId: 'c5', userId: 'u3', amount: 20000, cycleNumber: 1, status: 'Paid', paidAt: '2024-01-05' },
];

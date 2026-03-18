'use client';

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
  useTransition,
} from 'react';
import { User, ALL_MOCK_USERS, MOCK_USER, TrustScore } from '@/lib/mock-data';
import { generateUserTrustScore } from '@/ai/flows/generate-user-trust-score';

interface MockUserContextType {
  activeUser: User;
  allUsers: User[];
  isCalculating: boolean;
  switchUser: (userId: string) => void;
}

const MockUserContext = createContext<MockUserContextType | undefined>(undefined);

export function MockUserProvider({ children }: { children: ReactNode }) {
  const [activeUser, setActiveUser] = useState<User>(MOCK_USER);
  const [isCalculating, setIsCalculating] = useState(false);
  const [, startTransition] = useTransition();

  const switchUser = useCallback(async (userId: string) => {
    const target = ALL_MOCK_USERS.find((u) => u.id === userId);
    if (!target || target.id === activeUser.id) return;

    // Immediately show "Calculating..." while the AI evaluates
    const preliminaryUser: User = { ...target, trustScore: 'Calculating...' };
    setActiveUser(preliminaryUser);
    setIsCalculating(true);

    startTransition(async () => {
      try {
        const result = await generateUserTrustScore({
          kycStatus: target.kycStatus === 'not_started' ? 'pending' : target.kycStatus as 'verified' | 'pending' | 'failed',
          successfulPaymentsCount: target.successfulPaymentsCount,
          defaultedPaymentsCount: target.defaultedPaymentsCount,
          groupsCompletedCount: target.groupsCompletedCount,
          groupsJoinedCount: target.groupsJoinedCount,
        });
        setActiveUser({ ...target, trustScore: result.trustScore as TrustScore });
      } catch (err) {
        console.error('Trust score AI failed, using fallback:', err);
        // Fallback: derive score deterministically from the data
        const score = computeFallbackScore(target);
        setActiveUser({ ...target, trustScore: score });
      } finally {
        setIsCalculating(false);
      }
    });
  }, [activeUser.id]);

  return (
    <MockUserContext.Provider value={{ activeUser, allUsers: ALL_MOCK_USERS, isCalculating, switchUser }}>
      {children}
    </MockUserContext.Provider>
  );
}

export function useMockUser(): MockUserContextType {
  const ctx = useContext(MockUserContext);
  if (!ctx) throw new Error('useMockUser must be used within MockUserProvider');
  return ctx;
}

// Local deterministic fallback if AI call fails
function computeFallbackScore(user: User): TrustScore {
  if (user.kycStatus === 'failed' || user.defaultedPaymentsCount > 0) return 'High Risk';
  if (user.kycStatus === 'verified' && user.successfulPaymentsCount >= 3 && user.defaultedPaymentsCount === 0)
    return 'Low Risk';
  return 'Medium Risk';
}

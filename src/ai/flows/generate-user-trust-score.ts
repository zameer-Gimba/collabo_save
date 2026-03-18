'use server';
/**
 * @fileOverview This file defines a Genkit flow for generating a user's trust score.
 *
 * - generateUserTrustScore - A function that calculates a user's financial trustworthiness.
 * - GenerateUserTrustScoreInput - The input type for the generateUserTrustScore function.
 * - GenerateUserTrustScoreOutput - The return type for the generateUserTrustScore function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateUserTrustScoreInputSchema = z.object({
  kycStatus: z.enum(['verified', 'pending', 'failed']).describe('The KYC verification status of the user.'),
  successfulPaymentsCount: z.number().int().min(0).describe('The total number of successful contributions made by the user.'),
  defaultedPaymentsCount: z.number().int().min(0).describe('The total number of defaulted contributions made by the user.'),
  groupsCompletedCount: z.number().int().min(0).describe('The total number of savings circles successfully completed by the user.'),
  groupsJoinedCount: z.number().int().min(0).describe('The total number of savings circles the user has joined.'),
});
export type GenerateUserTrustScoreInput = z.infer<typeof GenerateUserTrustScoreInputSchema>;

const GenerateUserTrustScoreOutputSchema = z.object({
  trustScore: z.enum(['Low Risk', 'Medium Risk', 'High Risk']).describe('The calculated trust score for the user: Low Risk, Medium Risk, or High Risk.'),
});
export type GenerateUserTrustScoreOutput = z.infer<typeof GenerateUserTrustScoreOutputSchema>;

export async function generateUserTrustScore(input: GenerateUserTrustScoreInput): Promise<GenerateUserTrustScoreOutput> {
  return generateUserTrustScoreFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateUserTrustScorePrompt',
  input: {schema: GenerateUserTrustScoreInputSchema},
  output: {schema: GenerateUserTrustScoreOutputSchema},
  prompt: `You are an AI assistant designed to assess a user's financial trustworthiness for a rotating savings system (Adashe).
Your goal is to assign a risk level (Low Risk, Medium Risk, or High Risk) based on the provided user data.

Consider the following criteria to determine the trust score:

1.  **KYC Status (Know Your Customer)**:
    - 'verified': Positive indicator.
    - 'pending': Neutral to slightly negative, as verification is incomplete.
    - 'failed': Strong negative indicator.

2.  **Payment History**:
    - 'defaultedPaymentsCount': Any number greater than 0 is a strong negative indicator. The higher the number, the higher the risk.
    - 'successfulPaymentsCount': A higher number indicates reliability.

3.  **Participation History**:
    - 'groupsCompletedCount': A higher number compared to 'groupsJoinedCount' indicates commitment and reliability.
    - If 'groupsJoinedCount' is 0, the user is new to groups, which is a neutral factor.

**Guidelines for Risk Assignment:**

-   **High Risk**:
    -   KYC status is 'failed'.
    -   User has 'defaultedPaymentsCount' greater than 0.
-   **Low Risk**:
    -   KYC status is 'verified'.
    -   'defaultedPaymentsCount' is 0.
    -   User has a significant positive payment history (e.g., 'successfulPaymentsCount' >= 3).
    -   User has a good track record in groups (e.g., 'groupsCompletedCount' is close to 'groupsJoinedCount' if 'groupsJoinedCount' > 0).
-   **Medium Risk**:
    -   KYC status is 'verified', but the user does not meet the criteria for 'Low Risk'.
    -   This includes users with 'verified' KYC, 'defaultedPaymentsCount' is 0, but have limited payment or participation history (e.g., 'successfulPaymentsCount' < 3).
    -   Users with 'pending' KYC status.

Based on the input below, provide the most appropriate trust score.

**User Data:**
KYC Status: {{{kycStatus}}}
Successful Payments: {{{successfulPaymentsCount}}}
Defaulted Payments: {{{defaultedPaymentsCount}}}
Groups Completed: {{{groupsCompletedCount}}}
Groups Joined: {{{groupsJoinedCount}}}`
});

const generateUserTrustScoreFlow = ai.defineFlow(
  {
    name: 'generateUserTrustScoreFlow',
    inputSchema: GenerateUserTrustScoreInputSchema,
    outputSchema: GenerateUserTrustScoreOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);

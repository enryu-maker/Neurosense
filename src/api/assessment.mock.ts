import { mockDelay } from '../services/mockDelay.service';
import { AssessmentResult } from '../types/assessment.types';

export const assessmentApi = {
    submitQuiz: async (answers: Record<string, number>): Promise<AssessmentResult> => {
        // console.log('Mock API received:', answers);
        await mockDelay(2000);
        return {
            id: Date.now().toString(),
            type: 'quiz',
            date: new Date().toISOString(),
            score: 0.85,
            confidence: 0.9,
            riskLevel: 'LOW',
            feedback: 'Your cognitive responses are within normal range.',
        };
    },

    submitSpiral: async (imageUri: string): Promise<AssessmentResult> => {
        await mockDelay(3000); // Simulate processing
        return {
            id: Date.now().toString(),
            type: 'spiral',
            date: new Date().toISOString(),
            score: 0.72,
            confidence: 0.85,
            riskLevel: 'MODERATE',
            feedback: 'Slight tremor detected in spiral tracing.',
        };
    },

    submitVoice: async (audioUri: string): Promise<AssessmentResult> => {
        await mockDelay(2500);
        return {
            id: Date.now().toString(),
            type: 'voice',
            date: new Date().toISOString(),
            score: 0.92,
            confidence: 0.88,
            riskLevel: 'LOW',
            feedback: 'Voice parameters are stable.',
        };
    },

    submitMRI: async (imageUri: string): Promise<AssessmentResult> => {
        await mockDelay(4000); // Heavier processing
        return {
            id: Date.now().toString(),
            type: 'mri',
            date: new Date().toISOString(),
            score: 0.95,
            confidence: 0.95,
            riskLevel: 'LOW',
            feedback: 'No significant anomalies detected in scan.',
        };
    }
};

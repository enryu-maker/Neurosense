import { mockDelay } from '../services/mockDelay.service';
import { HistoryItem } from '../types/history.types';

const MOCK_HISTORY: HistoryItem[] = [
    {
        id: '101',
        type: 'quiz',
        date: new Date(Date.now() - 86400000).toISOString(), // Yesterday
        score: 0.8,
        confidence: 0.9,
        riskLevel: 'LOW',
        feedback: 'Normal',
    },
    {
        id: '102',
        type: 'spiral',
        date: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
        score: 0.6,
        confidence: 0.8,
        riskLevel: 'MODERATE',
        feedback: 'Tremor detected',
    },
];

export const historyApi = {
    getHistory: async (): Promise<HistoryItem[]> => {
        await mockDelay(1000);
        return MOCK_HISTORY;
    },

    getDetail: async (id: string): Promise<HistoryItem | undefined> => {
        await mockDelay(500);
        return MOCK_HISTORY.find(h => h.id === id);
    }
};

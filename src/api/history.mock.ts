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

const MOCK_GRAPH_DATA: HistoryItem[] = [
    {
        id: '101',
        type: 'quiz',
        date: new Date(Date.now() - 86400000 * 20).toISOString(), // 20 days ago
        score: 0.8,
        confidence: 0.9,
        riskLevel: 'LOW',
        stage: 0,
        feedback: 'Normal',
    },
    {
        id: '103',
        type: 'quiz',
        date: new Date(Date.now() - 86400000 * 15).toISOString(), // 15 days ago
        score: 0.7,
        confidence: 0.85,
        riskLevel: 'LOW',
        stage: 1,
        feedback: 'Early signs',
    },
    {
        id: '104',
        type: 'quiz',
        date: new Date(Date.now() - 86400000 * 10).toISOString(), // 10 days ago
        score: 0.5,
        confidence: 0.8,
        riskLevel: 'MODERATE',
        stage: 2,
        feedback: 'Moderate symptoms',
    },
    {
        id: '105',
        type: 'quiz',
        date: new Date(Date.now() - 86400000 * 5).toISOString(), // 5 days ago
        score: 0.4,
        confidence: 0.9,
        riskLevel: 'HIGH',
        stage: 3,
        feedback: 'High risk',
    },
    {
        id: '106',
        type: 'quiz',
        date: new Date().toISOString(), // Today
        score: 0.3,
        confidence: 0.95,
        riskLevel: 'HIGH',
        stage: 4,
        feedback: 'Advanced symptoms',
    },
];

export const historyApi = {
    getHistory: async (): Promise<HistoryItem[]> => {
        await mockDelay(1000);
        return MOCK_HISTORY;
    },

    getGraphData: async (): Promise<HistoryItem[]> => {
        await mockDelay(1000);
        return MOCK_GRAPH_DATA;
    },

    getDetail: async (id: string): Promise<HistoryItem | undefined> => {
        await mockDelay(500);
        return MOCK_HISTORY.find(h => h.id === id);
    }
};

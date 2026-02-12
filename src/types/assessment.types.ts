export type AssessmentType = 'quiz' | 'spiral' | 'voice' | 'mri';

export interface AssessmentResult {
    id: string;
    type: AssessmentType;
    date: string; // ISO string
    score: number; // 0 to 1 normalized
    confidence: number; // 0 to 1 normalized
    riskLevel: 'LOW' | 'MODERATE' | 'HIGH';
    stage?: number; // 0 for No Parkinson, 1-5 for stages
    feedback: string;
}

export type RootStackParamList = {
    Auth: undefined;
    App: undefined;
};

export type AuthStackParamList = {
    Login: undefined;
};

export type AppTabParamList = {
    DashboardTab: undefined;
    HistoryTab: undefined;
};

export type DashboardStackParamList = {
    Dashboard: undefined;
    // Quiz
    QuizInstructions: undefined;
    QuizQuestion: undefined;
    // Spiral
    SpiralInstructions: undefined;
    SpiralCanvas: undefined;
    // Voice
    VoiceInstructions: undefined;
    VoiceRecording: undefined;
    // BrainMRI
    BrainMRIUpload: undefined;
    // Result
    Result: { assessmentType: 'quiz' | 'spiral' | 'voice' | 'mri'; result: any };
};

export type HistoryStackParamList = {
    HistoryList: undefined;
    HistoryDetail: { id: string };
};

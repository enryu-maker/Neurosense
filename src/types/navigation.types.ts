export type RootStackParamList = {
    Auth: undefined;
    App: undefined;
};

export type AuthStackParamList = {
    Login: undefined;
};

export type AppTabParamList = {
    HomeTab: undefined;
    DashboardTab: undefined;
    HistoryTab: undefined;
    ProfileTab: undefined;
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
    Result: { assessmentType: 'quiz' | 'spiral' | 'voice' | 'brain'; result: any };
};

export type HistoryStackParamList = {
    HistoryList: undefined;
    HistoryDetail: { id: string };
};

import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { DashboardStackParamList } from './navigation.types';
import { DashboardScreen } from '../screens/Dashboard/DashboardScreen';
import { QuizInstructions } from '../screens/Assessments/Quiz/QuizInstructions';
import { QuizQuestion } from '../screens/Assessments/Quiz/QuizQuestion';
import { SpiralInstructions } from '../screens/Assessments/Spiral/SpiralInstructions';
import { SpiralCanvasScreen } from '../screens/Assessments/Spiral/SpiralCanvasScreen';
import { VoiceInstructions } from '../screens/Assessments/Voice/VoiceInstructions';
import { VoiceRecordingScreen } from '../screens/Assessments/Voice/VoiceRecordingScreen';
import { BrainMRIUploadScreen } from '../screens/Assessments/BrainMRI/BrainMRIUploadScreen';
import { ResultScreen } from '../screens/Result/ResultScreen';

const Stack = createNativeStackNavigator<DashboardStackParamList>();

export const DashboardStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Dashboard" component={DashboardScreen} options={{ headerShown: false }} />

            {/* Quiz */}
            <Stack.Screen name="QuizInstructions" component={QuizInstructions} options={{ title: 'Quiz' }} />
            <Stack.Screen name="QuizQuestion" component={QuizQuestion}options={{ headerShown: false }} />

            {/* Spiral */}
            <Stack.Screen name="SpiralInstructions" component={SpiralInstructions} options={{ title: 'Spiral Drawing' }} />
            <Stack.Screen name="SpiralCanvas" component={SpiralCanvasScreen} options={{ headerShown: false }} />

            {/* Voice */}
            <Stack.Screen name="VoiceInstructions" component={VoiceInstructions} options={{ title: 'Voice Analysis' }} />
            <Stack.Screen name="VoiceRecording" component={VoiceRecordingScreen} options={{ title: 'Recording' }} />

            {/* Brain MRI */}
            <Stack.Screen name="BrainMRIUpload" component={BrainMRIUploadScreen} options={{ title: 'Brain MRI' }} />

            {/* Result */}
            <Stack.Screen name="Result" component={ResultScreen} options={{ title: 'Assessment Result', headerLeft: () => null }} />
        </Stack.Navigator>
    );
};

import { useState, useRef } from 'react';
import { permissionService } from '../services/permission.service';
import { assessmentApi } from '../api/assessment.mock';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { DashboardStackParamList } from '../types/navigation.types';

export const useVoice = () => {
    const navigation = useNavigation<NativeStackNavigationProp<DashboardStackParamList>>();
    const [isRecording, setIsRecording] = useState(false);
    const [duration, setDuration] = useState(0);
    const [audioUri, setAudioUri] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const timerRef = useRef<NodeJS.Timeout | null>(null);

    const startRecording = async () => {
        const hasPermission = await permissionService.requestMicrophonePermission();
        if (!hasPermission) {
            // Handle denied
            return;
        }

        setIsRecording(true);
        setAudioUri(null);
        setDuration(0);

        timerRef.current = setInterval(() => {
            setDuration(prev => prev + 1);
        }, 1000);
    };

    const stopRecording = () => {
        if (timerRef.current) {
            clearInterval(timerRef.current);
        }
        setIsRecording(false);
        // In real app, this path comes from the audio library
        setAudioUri('mock-recording.mp3');
    };

    const reRecord = () => {
        setAudioUri(null);
        setDuration(0);
    };

    const submit = async () => {
        if (!audioUri) return;
        setIsSubmitting(true);
        try {
            const result = await assessmentApi.submitVoice(audioUri);
            navigation.replace('Result', { assessmentType: 'voice', result });
        } catch (error) {
            console.error(error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return {
        isRecording,
        duration,
        audioUri,
        startRecording,
        stopRecording,
        reRecord,
        submit,
        isSubmitting,
    };
};

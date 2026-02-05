import { useState, useRef, useEffect } from 'react';
import { useSoundRecorder } from 'react-native-nitro-sound';
import RNFS from 'react-native-fs';
import { permissionService } from '../services/permission.service';
import { assessmentApi } from '../api/assessment.mock';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { DashboardStackParamList } from '../types/navigation.types';
import { useDispatch } from 'react-redux';
import { postVoiceAnalysis } from '../store/actions/homeAction';

export const useVoice = () => {
    const navigation = useNavigation<NativeStackNavigationProp<DashboardStackParamList>>();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [isRecording, setIsRecording] = useState(false);
    const [duration, setDuration] = useState(0);
    const [audioUri, setAudioUri] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);



    const { startRecorder: startNitroRecorder, stopRecorder: stopNitroRecorder } = useSoundRecorder({
        onRecord: (data) => {
            if (data.recordSecs) {
                setDuration(Math.floor(data.recordSecs));
            } else if (data.currentPosition) {
                setDuration(Math.floor(data.currentPosition / 1000));
            }
        }
    });

    const startRecording = async () => {
        const hasPermission = await permissionService.requestMicrophonePermission();
        if (!hasPermission) {
            return;
        }

        try {
            const fileName = `recording-${Date.now()}.wav`;
            const filePath = `${RNFS.CachesDirectoryPath}/${fileName}`;
            // Nitro Sound startRecorder takes uri? as first argument
            await startNitroRecorder(filePath);
            setIsRecording(true);
            setAudioUri(null);
            setDuration(0);
        } catch (error) {
            console.error('Failed to start recording', error);
        }
    };

    const stopRecording = async () => {
        try {
            const result = await stopNitroRecorder();
            setIsRecording(false);
            setAudioUri(result);
        } catch (error) {
            console.error('Failed to stop recording', error);
        }
    };

    const reRecord = () => {
        setAudioUri(null);
        setDuration(0);
    };

    const submit = async () => {
        if (!audioUri) return;
        setIsSubmitting(true);
        try {
            const formData = new FormData();
            formData.append('audio', {
                uri: audioUri,
                name: 'voice.wav',
                type: 'audio/wav',
            } as any);
            dispatch(postVoiceAnalysis(formData, setLoading, navigation))
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

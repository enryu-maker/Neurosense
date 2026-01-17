import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useVoice } from '../../../hooks/useVoice';
import { VoiceRecorder } from '../../../modules/voice/VoiceRecorder';
import { formatDuration } from '../../../modules/voice/voice.utils';
import { Button } from '../../../components/Button';
import { colors } from '../../../constants/colors';
import { spacing } from '../../../constants/spacing';
import { typography } from '../../../constants/typography';

export const VoiceRecordingScreen = () => {
    const {
        isRecording,
        duration,
        audioUri,
        startRecording,
        stopRecording,
        reRecord,
        submit,
        isSubmitting
    } = useVoice();

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                <Text style={styles.instruction}>
                    Read the following phrase aloud:
                </Text>
                <Text style={styles.phrase}>
                    "The quick brown fox jumps over the lazy dog."
                </Text>

                <View style={styles.visualizerContainer}>
                    <Text style={styles.timer}>{formatDuration(duration)}</Text>
                    <VoiceRecorder isRecording={isRecording} />
                    {audioUri && <Text style={styles.status}>Recording Complete</Text>}
                </View>

                <View style={styles.controls}>
                    {!isRecording && !audioUri && (
                        <Button title="Start Recording" onPress={startRecording} />
                    )}

                    {isRecording && (
                        <Button title="Stop Recording" onPress={stopRecording} variant="outline" />
                    )}

                    {audioUri && (
                        <View style={styles.buttonGroup}>
                            <View style={{ flex: 1 }}>
                                <Button title="Re-record" onPress={reRecord} variant="outline" />
                            </View>
                            <View style={{ width: spacing.m }} />
                            <View style={{ flex: 1 }}>
                                <Button title="Submit" onPress={submit} loading={isSubmitting} />
                            </View>
                        </View>
                    )}
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: colors.background,
    },
    container: {
        flex: 1,
        padding: spacing.m,
    },
    instruction: {
        ...typography.body,
        textAlign: 'center',
        marginBottom: spacing.m,
    },
    phrase: {
        ...typography.h2,
        textAlign: 'center',
        fontStyle: 'italic',
        marginBottom: spacing.xl,
    },
    visualizerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    timer: {
        ...typography.h1,
        marginBottom: spacing.l,
        fontVariant: ['tabular-nums'],
    },
    status: {
        marginTop: spacing.m,
        color: colors.success,
        ...typography.body,
    },
    controls: {
        paddingBottom: spacing.l,
    },
    buttonGroup: {
        flexDirection: 'row',
    },
});

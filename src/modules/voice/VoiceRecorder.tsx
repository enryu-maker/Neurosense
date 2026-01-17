import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withRepeat, withTiming, Easing, withSequence } from 'react-native-reanimated';
import { colors } from '../../constants/colors';

export const VoiceRecorder = ({ isRecording }: { isRecording: boolean }) => {
    // Determine if Reanimated is available/working. If not, use static view.
    // Creating a simple pulsing animation.
    const scale = useSharedValue(1);

    useEffect(() => {
        if (isRecording) {
            scale.value = withRepeat(
                withSequence(
                    withTiming(1.5, { duration: 500, easing: Easing.ease }),
                    withTiming(1, { duration: 500, easing: Easing.ease })
                ),
                -1,
                true
            );
        } else {
            scale.value = withTiming(1);
        }
    }, [isRecording]);

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ scale: scale.value }]
    }));

    return (
        <View style={styles.container}>
            <Animated.View style={[styles.dot, animatedStyle, { backgroundColor: isRecording ? colors.error : colors.border }]} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        height: 100,
        justifyContent: 'center',
        alignItems: 'center',
    },
    dot: {
        width: 50,
        height: 50,
        borderRadius: 25,
    },
});

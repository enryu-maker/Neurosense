import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { Brain } from 'lucide-react-native';
import { colors } from '../../constants/colors';
import { typography } from '../../constants/typography';

export const SplashScreen = () => {
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const scaleAnim = useRef(new Animated.Value(0.8)).current;

    useEffect(() => {
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 800,
                useNativeDriver: true,
            }),
            Animated.spring(scaleAnim, {
                toValue: 1,
                friction: 8,
                tension: 40,
                useNativeDriver: true,
            }),
        ]).start();
    }, []);

    return (
        <View style={styles.container}>
            <Animated.View
                style={[
                    styles.content,
                    {
                        opacity: fadeAnim,
                        transform: [{ scale: scaleAnim }]
                    }
                ]}
            >
                <View style={styles.iconContainer}>
                    <Brain size={64} color={colors.white} />
                </View>
                <Text style={styles.title}>Neurosense</Text>
                <Text style={styles.subtitle}>Cognitive Assessment Platform</Text>
            </Animated.View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
        justifyContent: 'center',
        alignItems: 'center',
    },
    content: {
        alignItems: 'center',
    },
    iconContainer: {
        width: 120,
        height: 120,
        borderRadius: 60,
        backgroundColor: colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: colors.primary,
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.3,
        shadowRadius: 20,
        elevation: 10,
        marginBottom: 24,
    },
    title: {
        ...typography.h1,
        fontSize: 32,
        color: colors.text,
        marginBottom: 8,
    },
    subtitle: {
        ...typography.body,
        color: colors.textSecondary,
    },
});

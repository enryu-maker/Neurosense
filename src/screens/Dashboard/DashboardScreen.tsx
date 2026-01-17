import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { DashboardStackParamList } from '../../types/navigation.types';
import { Header } from '../../components/Header';
import { Card } from '../../components/Card';
import { colors } from '../../constants/colors';
import { spacing } from '../../constants/spacing';
import { typography } from '../../constants/typography';
import { useAuth } from '../../hooks/useAuth';

type NavigationProp = NativeStackNavigationProp<DashboardStackParamList>;

export const DashboardScreen = () => {
    const navigation = useNavigation<NavigationProp>();
    const { user } = useAuth();

    const assessments = [
        {
            title: 'Cognitive Quiz',
            description: 'Answer simple questions to test memory and attention.',
            route: 'QuizInstructions' as const,
            color: '#FF9500', // Orange
        },
        {
            title: 'Spiral Drawing',
            description: 'Trace a spiral to assess motor control.',
            route: 'SpiralInstructions' as const,
            color: '#5856D6', // Purple
        },
        {
            title: 'Voice Analysis',
            description: 'Record a phrase to analyze speech patterns.',
            route: 'VoiceInstructions' as const,
            color: '#34C759', // Green
        },
        {
            title: 'Brain MRI',
            description: 'Upload an MRI scan for analysis.',
            route: 'BrainMRIUpload' as const,
            color: '#007AFF', // Blue
        },
    ];

    return (
        <View style={styles.container}>
            <Header title="Dashboard" subtitle={`Welcome, ${user?.name || 'User'}`} />

            <ScrollView contentContainerStyle={styles.scrollContent}>
                <Text style={styles.sectionTitle}>Select an Assessment</Text>

                {assessments.map((item) => (
                    <TouchableOpacity
                        key={item.title}
                        onPress={() => navigation.navigate(item.route)}
                        activeOpacity={0.8}
                    >
                        <Card style={styles.card}>
                            <View style={[styles.iconIndicator, { backgroundColor: item.color }]} />
                            <View style={styles.cardContent}>
                                <Text style={styles.cardTitle}>{item.title}</Text>
                                <Text style={styles.cardDescription}>{item.description}</Text>
                            </View>
                        </Card>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    scrollContent: {
        padding: spacing.m,
    },
    sectionTitle: {
        ...typography.h2,
        marginBottom: spacing.m,
        color: colors.text,
    },
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: spacing.m,
    },
    iconIndicator: {
        width: 12,
        height: '100%',
        borderRadius: 6,
        marginRight: spacing.m,
    },
    cardContent: {
        flex: 1,
    },
    cardTitle: {
        ...typography.h2,
        fontSize: 20,
        marginBottom: spacing.xs,
    },
    cardDescription: {
        ...typography.body,
        color: colors.textSecondary,
    },
});

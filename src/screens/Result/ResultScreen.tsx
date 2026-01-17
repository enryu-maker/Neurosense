import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { DashboardStackParamList } from '../../types/navigation.types';
import { Button } from '../../components/Button';
import { ConfidenceBar } from '../../components/ConfidenceBar';
import { DisclaimerBox } from '../../components/DisclaimerBox';
import { colors } from '../../constants/colors';
import { spacing } from '../../constants/spacing';
import { typography } from '../../constants/typography';

type Props = NativeStackScreenProps<DashboardStackParamList, 'Result'>;

export const ResultScreen = ({ route, navigation }: Props) => {
    const { result, assessmentType } = route.params;

    const handleTakeAnother = () => {
        navigation.popToTop();
    };

    const handleViewHistory = () => {
        // Navigate to History Tab. 
        // We need to access the parent Loop.
        // Casting to any to avoid complex nested composite types for now.
        (navigation as any).navigate('HistoryTab');
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView contentContainerStyle={styles.container}>
                <Text style={styles.header}>Analysis Complete</Text>

                <View style={styles.card}>
                    <Text style={styles.typeLabel}>Assessment Type: {assessmentType.toUpperCase()}</Text>
                    <Text style={styles.riskLabel}>Risk Level</Text>
                    <Text style={[styles.riskValue, { color: result.riskLevel === 'HIGH' ? colors.error : colors.success }]}>
                        {result.riskLevel}
                    </Text>

                    <ConfidenceBar score={result.confidence} label="AI Confidence" />

                    <Text style={styles.feedbackLabel}>Feedback</Text>
                    <Text style={styles.feedback}>{result.feedback}</Text>
                </View>

                <DisclaimerBox />

                <View style={styles.footer}>
                    <Button title="View History" onPress={handleViewHistory} variant="outline" />
                    <View style={styles.spacer} />
                    <Button title="Take Another Assessment" onPress={handleTakeAnother} />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: colors.background,
    },
    container: {
        padding: spacing.m,
    },
    header: {
        ...typography.h1,
        textAlign: 'center',
        marginVertical: spacing.l,
    },
    card: {
        backgroundColor: colors.white,
        borderRadius: spacing.m,
        padding: spacing.m,
        marginBottom: spacing.m,
        shadowColor: colors.black,
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 2,
    },
    typeLabel: {
        ...typography.caption,
        marginBottom: spacing.s,
    },
    riskLabel: {
        ...typography.body,
        color: colors.textSecondary,
    },
    riskValue: {
        ...typography.h1,
        marginBottom: spacing.l,
    },
    feedbackLabel: {
        ...typography.h2,
        fontSize: 18,
        marginTop: spacing.m,
        marginBottom: spacing.xs,
    },
    feedback: {
        ...typography.body,
        lineHeight: 22,
    },
    footer: {
        marginTop: spacing.l,
    },
    spacer: {
        height: spacing.s,
    },
});

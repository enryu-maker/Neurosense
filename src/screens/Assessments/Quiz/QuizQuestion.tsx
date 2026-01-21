import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { ArrowLeft, Circle, CheckCircle2 } from 'lucide-react-native';
import { useQuiz } from '../../../hooks/useQuiz';
import { Button } from '../../../components/Button';
import { colors } from '../../../constants/colors';
import { spacing } from '../../../constants/spacing';
import { typography } from '../../../constants/typography';

export const QuizQuestion = () => {
    const navigation = useNavigation();
    const {
        question,
        currentIndex,
        total,
        progress,
        selectAnswer,
        nextQuestion,
        currentAnswer,
        isLastQuestion,
        isSubmitting
    } = useQuiz();

    // 2 = Yes, frequently, 1 = Sometimes, 0 = No, never
    const options = [
        { label: 'Yes, frequently', value: 2 },
        { label: 'Sometimes', value: 1 },
        { label: 'No, never', value: 0 },
    ];

    const renderOption = (option: { label: string; value: number }) => {
        const isSelected = currentAnswer === option.value;
        return (
            <TouchableOpacity
                key={option.value}
                style={[
                    styles.optionCard,
                    isSelected && styles.optionCardSelected
                ]}
                onPress={() => selectAnswer(option.value)}
                activeOpacity={0.7}
            >
                <Text style={[
                    styles.optionText,
                    isSelected && styles.optionTextSelected
                ]}>
                    {option.label}
                </Text>

                {isSelected ? (
                    <CheckCircle2 size={24} color={colors.primary} weight="fill" />
                ) : (
                    <View style={styles.radioEmpty} />
                )}
            </TouchableOpacity>
        );
    };

    return (
        <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <ArrowLeft size={24} color={colors.text} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Risk Quiz</Text>
                <View style={{ width: 24 }} />
            </View>

            <View style={styles.container}>
                {/* Progress Bar */}
                <View style={styles.progressHeader}>
                    <Text style={styles.progressLabel}>PROGRESS</Text>
                    <Text style={styles.progressCount}>Question {currentIndex + 1} of {total}</Text>
                </View>
                <View style={styles.progressBarBg}>
                    <View style={[styles.progressBarFill, { width: `${progress * 100}%` }]} />
                </View>

                <ScrollView contentContainerStyle={styles.scrollContent}>
                    <Text style={styles.questionText}>{question.text}</Text>

                    <View style={styles.optionsContainer}>
                        {options.map(renderOption)}
                    </View>

                    <Text style={styles.hintText}>
                        Select the option that best describes your experience over the last 7 days.
                    </Text>
                </ScrollView>

                <View style={styles.footer}>
                    <Button
                        title={isLastQuestion ? "Submit Assessment" : "Next Question"}
                        onPress={nextQuestion}
                        disabled={currentAnswer === undefined}
                        loading={isSubmitting}
                        variant="primary"
                    />
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
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: spacing.m,
        paddingVertical: spacing.m,
    },
    backButton: {
        padding: 4,
    },
    headerTitle: {
        ...typography.h3,
        fontSize: 18,
        fontWeight: 'bold',
        color: '#0F172A',
    },
    container: {
        flex: 1,
        paddingHorizontal: spacing.l,
    },
    progressHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
        marginTop: spacing.s,
    },
    progressLabel: {
        fontSize: 12,
        fontWeight: '700',
        color: colors.primary,
        letterSpacing: 1,
    },
    progressCount: {
        fontSize: 12,
        color: '#64748B',
    },
    progressBarBg: {
        height: 6,
        backgroundColor: '#E2E8F0',
        borderRadius: 3,
        overflow: 'hidden',
        marginBottom: spacing.xl,
    },
    progressBarFill: {
        height: '100%',
        backgroundColor: colors.primary,
        borderRadius: 3,
    },
    scrollContent: {
        flexGrow: 1,
    },
    questionText: {
        fontSize: 24,
        fontWeight: '700',
        color: '#0F172A', // Dark Navy
        lineHeight: 32,
        marginBottom: spacing.xl,
    },
    optionsContainer: {
        gap: 16,
    },
    optionCard: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 20,
        backgroundColor: colors.white,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#E2E8F0',
    },
    optionCardSelected: {
        borderColor: colors.primary,
        backgroundColor: '#F0FDFA', // Very light teal
    },
    optionText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#334155',
    },
    optionTextSelected: {
        color: '#0F172A',
    },
    radioEmpty: {
        width: 24,
        height: 24,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: '#CBD5E1',
    },
    hintText: {
        marginTop: 32,
        textAlign: 'center',
        color: '#94A3B8',
        fontStyle: 'italic',
        fontSize: 14,
        lineHeight: 20,
        paddingHorizontal: 20,
    },
    footer: {
        paddingVertical: spacing.l,
    },
});

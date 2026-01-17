import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useQuiz } from '../../../hooks/useQuiz';
import { Button } from '../../../components/Button';
import { colors } from '../../../constants/colors';
import { spacing } from '../../../constants/spacing';
import { typography } from '../../../constants/typography';

export const QuizQuestion = () => {
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

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                {/* Progress Bar */}
                <View style={styles.progressContainer}>
                    <View style={styles.track}>
                        <View style={[styles.fill, { width: `${progress * 100}%` }]} />
                    </View>
                    <Text style={styles.progressText}>Question {currentIndex + 1} of {total}</Text>
                </View>

                <View style={styles.content}>
                    <Text style={styles.questionText}>{question.text}</Text>

                    <View style={styles.options}>
                        <Button
                            title="Yes"
                            variant={currentAnswer === true ? 'primary' : 'outline'}
                            onPress={() => selectAnswer(true)}
                        />
                        <View style={styles.spacer} />
                        <Button
                            title="No"
                            variant={currentAnswer === false ? 'primary' : 'outline'}
                            onPress={() => selectAnswer(false)}
                        />
                    </View>
                </View>

                <View style={styles.footer}>
                    <Button
                        title={isLastQuestion ? "Submit Assessment" : "Next Question"}
                        onPress={nextQuestion}
                        disabled={currentAnswer === undefined} // undefined means not answered yet
                        loading={isSubmitting}
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
    container: {
        flex: 1,
        padding: spacing.m,
    },
    progressContainer: {
        marginTop: spacing.s,
        marginBottom: spacing.xl,
    },
    track: {
        height: 6,
        backgroundColor: colors.border,
        borderRadius: 3,
        marginBottom: spacing.xs,
        overflow: 'hidden',
    },
    fill: {
        height: '100%',
        backgroundColor: colors.primary,
    },
    progressText: {
        ...typography.caption,
        textAlign: 'right',
    },
    content: {
        flex: 1,
        justifyContent: 'center',
    },
    questionText: {
        ...typography.h1,
        fontSize: 28,
        marginBottom: spacing.xl,
        textAlign: 'center',
    },
    options: {
        width: '100%',
    },
    spacer: {
        height: spacing.m,
    },
    footer: {
        paddingVertical: spacing.l,
    },
});

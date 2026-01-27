import { useState } from 'react';
import { assessmentApi } from '../api/assessment.mock';
import { QUIZ_QUESTIONS } from '../constants/assessments';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { DashboardStackParamList } from '../types/navigation.types';

export const useQuiz = () => {
    const navigation = useNavigation<NativeStackNavigationProp<DashboardStackParamList>>();
    const [currentIndex, setCurrentIndex] = useState(0);
    // track answers by question ID (0: No/Never, 1: Sometimes, 2: Yes/Frequently)
    const [answers, setAnswers] = useState<Record<number, number>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const question = QUIZ_QUESTIONS[currentIndex];
    const isLastQuestion = currentIndex === QUIZ_QUESTIONS.length - 1;
    const progress = (currentIndex + 1) / QUIZ_QUESTIONS.length;
    const currentAnswer = answers[question.id];

    const selectAnswer = (answer: number) => {
        setAnswers((prev) => ({ ...prev, [question.id]: answer }));
    };

    const nextQuestion = () => {
        if (currentAnswer === undefined) return;

        if (!isLastQuestion) {
            setCurrentIndex((prev) => prev + 1);
        } else {
            submit();
        }
    };

    const submit = async () => {
        setIsSubmitting(true);
        try {
            // Transform answers to required format: { "q1": 0, "q2": 1, ... }
            const formattedAnswers: Record<string, number> = {};
            Object.keys(answers).forEach((key) => {
                const qKey = `q${key}`;
                formattedAnswers[qKey] = answers[Number(key)];
            });

            // console.log('Final Dictionary for API:', JSON.stringify(formattedAnswers, null, 2));

            const result = await assessmentApi.submitQuiz(formattedAnswers);
            // We use replace so user can't go back into the quiz state
            navigation.replace('Result', { assessmentType: 'quiz', result });
        } catch (error) {
            console.error(error);
            // TODO: Handle error UI
        } finally {
            setIsSubmitting(false);
        }
    };

    return {
        question,
        currentIndex,
        total: QUIZ_QUESTIONS.length,
        isLastQuestion,
        progress,
        currentAnswer,
        selectAnswer,
        nextQuestion,
        isSubmitting,
    };
};

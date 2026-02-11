import { useState } from 'react';
import { assessmentApi } from '../api/assessment.mock';
import { QUIZ_QUESTIONS } from '../constants/assessments';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { DashboardStackParamList } from '../types/navigation.types';
import { useDispatch } from 'react-redux';
import { postQuiz } from '../store/actions/homeAction';

export const useQuiz = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation<NativeStackNavigationProp<DashboardStackParamList>>();
    const [currentIndex, setCurrentIndex] = useState(0);
    // track answers by question ID (0: No/Never, 1: Sometimes, 2: Yes/Frequently)
    const [answers, setAnswers] = useState<Record<number, number>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [loading, setLoading] = useState(false);


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
            const formattedAnswers: Record<string, number> = {};
            Object.keys(answers).forEach((key) => {
                const qKey = `q${key}`;
                formattedAnswers[qKey] = answers[Number(key)];
            });
            dispatch(postQuiz(formattedAnswers, setLoading, navigation));

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

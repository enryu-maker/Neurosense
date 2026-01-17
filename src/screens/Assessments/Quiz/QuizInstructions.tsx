import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { DashboardStackParamList } from '../../../types/navigation.types';
import { Button } from '../../../components/Button';
import { DisclaimerBox } from '../../../components/DisclaimerBox';
import { colors } from '../../../constants/colors';
import { spacing } from '../../../constants/spacing';
import { typography } from '../../../constants/typography';

type NavigationProp = NativeStackNavigationProp<DashboardStackParamList>;

export const QuizInstructions = () => {
    const navigation = useNavigation<NavigationProp>();

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.title}>Cognitive Assessment</Text>
                <Text style={styles.description}>
                    This quiz consists of 5 simple yes/no questions designed to assess your memory and cognitive function.
                    {'\n\n'}
                    Please answer honestly based on your experiences over the past month.
                </Text>

                <DisclaimerBox />
            </View>

            <View style={styles.footer}>
                <Button
                    title="Start Quiz"
                    onPress={() => navigation.replace('QuizQuestion')}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
        padding: spacing.m,
    },
    content: {
        flex: 1,
        paddingTop: spacing.xl,
    },
    title: {
        ...typography.h1,
        marginBottom: spacing.m,
        color: colors.text,
    },
    description: {
        ...typography.body,
        color: colors.text,
        lineHeight: 24,
    },
    footer: {
        paddingBottom: spacing.l,
    },
});

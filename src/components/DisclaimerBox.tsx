import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../constants/colors';
import { spacing } from '../constants/spacing';
import { typography } from '../constants/typography';

interface DisclaimerBoxProps {
    text?: string;
}

export const DisclaimerBox: React.FC<DisclaimerBoxProps> = ({
    text = 'This app is for research purposes only and does not provide medical advice. Consult a doctor for any health concerns.',
}) => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>{text}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F9F9F9',
        borderColor: colors.border,
        borderWidth: 1,
        borderRadius: spacing.s,
        padding: spacing.m,
        marginVertical: spacing.m,
    },
    text: {
        ...typography.caption,
        textAlign: 'center',
        color: colors.textSecondary,
    },
});

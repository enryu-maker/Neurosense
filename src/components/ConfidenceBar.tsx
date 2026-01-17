import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../constants/colors';
import { spacing } from '../constants/spacing';
import { typography } from '../constants/typography';

interface ConfidenceBarProps {
    score: number; // 0 to 1
    label?: string;
}

export const ConfidenceBar: React.FC<ConfidenceBarProps> = ({ score, label }) => {
    const percentage = Math.min(Math.max(score * 100, 0), 100);

    return (
        <View style={styles.container}>
            {label && <Text style={styles.label}>{label}</Text>}
            <View style={styles.track}>
                <View style={[styles.fill, { width: `${percentage}%` }]} />
            </View>
            <Text style={styles.value}>{Math.round(percentage)}%</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginVertical: spacing.s,
        width: '100%',
    },
    label: {
        ...typography.caption,
        marginBottom: spacing.xs,
    },
    track: {
        height: 10,
        backgroundColor: colors.border,
        borderRadius: 5,
        overflow: 'hidden',
    },
    fill: {
        height: '100%',
        backgroundColor: colors.primary,
    },
    value: {
        ...typography.caption,
        textAlign: 'right',
        marginTop: spacing.xs,
    },
});

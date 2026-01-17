import React from 'react';
import { View, ActivityIndicator, StyleSheet, Text } from 'react-native';
import { colors } from '../constants/colors';
import { spacing } from '../constants/spacing';
import { typography } from '../constants/typography';

interface LoaderProps {
    message?: string;
}

export const Loader: React.FC<LoaderProps> = ({ message }) => {
    return (
        <View style={styles.container}>
            <ActivityIndicator size="large" color={colors.primary} />
            {message && <Text style={styles.text}>{message}</Text>}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: spacing.l,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        ...typography.caption,
        marginTop: spacing.s,
    },
});

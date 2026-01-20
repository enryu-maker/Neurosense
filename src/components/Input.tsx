import React from 'react';
import { View, TextInput, Text, StyleSheet, TextInputProps, ViewStyle } from 'react-native';
import { colors } from '../constants/colors';
import { spacing } from '../constants/spacing';
import { typography } from '../constants/typography';

interface InputProps extends TextInputProps {
    label?: string;
    error?: string;
    containerStyle?: ViewStyle;
    icon?: React.ReactNode;
}

export const Input: React.FC<InputProps> = ({
    label,
    error,
    containerStyle,
    icon,
    style,
    ...props
}) => {
    return (
        <View style={[styles.container, containerStyle]}>
            {label && <Text style={styles.label}>{label}</Text>}
            <View style={[styles.inputContainer, error ? styles.inputError : null]}>
                {icon && <View style={styles.iconContainer}>{icon}</View>}
                <TextInput
                    style={[styles.input, style]}
                    placeholderTextColor={colors.textSecondary}
                    {...props}
                />
            </View>
            {error && <Text style={styles.errorText}>{error}</Text>}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: spacing.m,
    },
    label: {
        ...typography.body,
        fontWeight: '500',
        marginBottom: spacing.s,
        color: colors.text,
        fontSize: 14,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.white,
        borderWidth: 1,
        borderColor: colors.border,
        borderRadius: 12,
        paddingHorizontal: spacing.m,
        height: 56, // Fixed height for consistent tap target
    },
    inputError: {
        borderColor: colors.error,
    },
    iconContainer: {
        marginRight: spacing.s,
    },
    input: {
        flex: 1,
        ...typography.body,
        color: colors.text,
        height: '100%',
    },
    errorText: {
        ...typography.caption,
        color: colors.error,
        marginTop: 4,
    },
});

import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator, View } from 'react-native';
import { colors } from '../constants/colors';
import { spacing } from '../constants/spacing';
import { typography } from '../constants/typography';

interface ButtonProps {
    title: string;
    onPress: () => void;
    variant?: 'primary' | 'secondary' | 'outline';
    loading?: boolean;
    disabled?: boolean;
    icon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
    title,
    onPress,
    variant = 'primary',
    loading = false,
    disabled = false,
    icon,
}) => {
    const getBackgroundColor = () => {
        if (disabled) return colors.border;
        if (variant === 'primary') return colors.primary;
        if (variant === 'secondary') return colors.secondary;
        return 'transparent';
    };

    const getTextColor = () => {
        if (disabled) return colors.textSecondary;
        if (variant === 'outline') return colors.primary;
        return colors.white;
    };

    return (
        <TouchableOpacity
            style={[
                styles.container,
                { backgroundColor: getBackgroundColor() },
                variant === 'outline' && styles.outline,
            ]}
            onPress={onPress}
            disabled={disabled || loading}
        >
            {loading ? (
                <ActivityIndicator color={getTextColor()} />
            ) : (
                <View style={styles.content}>
                    {icon && <View style={styles.icon}>{icon}</View>}
                    <Text style={[styles.text, { color: getTextColor() }]}>{title}</Text>
                </View>
            )}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingVertical: spacing.m,
        paddingHorizontal: spacing.l,
        borderRadius: 30, // Pill shape
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        // Slight shadow for buttons too
        shadowColor: colors.shadow,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 2,
    },
    outline: {
        borderWidth: 1,
        borderColor: colors.primary,
    },
    text: {
        ...typography.button,
    },
    content: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    icon: {
        marginRight: spacing.s,
    }
});

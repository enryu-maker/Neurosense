import React from 'react';
import { View, StyleSheet, ViewStyle, StyleProp, TouchableOpacity } from 'react-native';
import { colors } from '../constants/colors';
import { spacing } from '../constants/spacing';

interface CardProps {
    children: React.ReactNode;
    style?: StyleProp<ViewStyle>;
    variant?: 'default' | 'highlight';
    icon?: React.ReactNode;
    onPress?: () => void;
}

export const Card: React.FC<CardProps> = ({
    children,
    style,
    variant = 'default',
    icon,
    onPress
}) => {
    const Container = onPress ? TouchableOpacity : View;

    return (
        <Container
            style={[
                styles.container,
                variant === 'highlight' && styles.highlight,
                style
            ]}
            onPress={onPress}
            activeOpacity={0.9}
        >
            {icon && <View style={styles.iconContainer}>{icon}</View>}
            {children}
        </Container>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.card,
        borderRadius: 20,
        padding: spacing.m,
        // iOS Shadow
        shadowColor: colors.shadow,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.06,
        shadowRadius: 12,
        // Android Shadow
        elevation: 3,
        marginBottom: spacing.m,
    },
    highlight: {
        backgroundColor: colors.primary,
    },
    iconContainer: {
        marginBottom: spacing.s,
    }
});

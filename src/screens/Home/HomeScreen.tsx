import React from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../../hooks/useAuth';
import { Card } from '../../components/Card';
import { Button } from '../../components/Button';
import { colors } from '../../constants/colors';
import { spacing } from '../../constants/spacing';
import { typography } from '../../constants/typography';
import { useNavigation } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { AppTabParamList } from '../../types/navigation.types';
import {
    Activity,
    Brain,
    Mic,
    Wind,
    ClipboardList,
    TrendingUp,
    ShieldCheck
} from 'lucide-react-native';

const { width } = Dimensions.get('window');

export const HomeScreen = () => {
    const { user } = useAuth();
    const navigation = useNavigation<BottomTabNavigationProp<AppTabParamList>>();

    const navigateToDashboard = () => {
        navigation.navigate('DashboardTab');
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
                {/* Header */}
                <View style={styles.header}>
                    <View>
                        <Text style={styles.greeting}>Welcome back,</Text>
                        <Text style={styles.username}>{user?.name || 'Guest'}</Text>
                    </View>
                    <View style={styles.avatarPlaceholder}>
                        <Text style={styles.avatarText}>
                            {(user?.name || 'G').charAt(0).toUpperCase()}
                        </Text>
                    </View>
                </View>

                {/* Hero Card */}
                <Card style={styles.heroCard} variant="highlight">
                    <View style={styles.heroContent}>
                        <View style={{ flex: 1 }}>
                            <Text style={[styles.heroTitle, { color: colors.white }]}>Daily Check-in</Text>
                            <Text style={[styles.heroBody, { color: 'rgba(255,255,255,0.9)' }]}>
                                Track your cognitive health with a 5-minute assessment.
                            </Text>
                            <View style={{ marginTop: spacing.m }}>
                                <Button
                                    title="Start Now"
                                    onPress={navigateToDashboard}
                                    variant="secondary"
                                    icon={<Activity size={20} color={colors.white} />}
                                />
                            </View>
                        </View>
                    </View>
                </Card>

                {/* Quick Stats Grid */}
                <Text style={styles.sectionTitle}>Overview</Text>
                <View style={styles.statsGrid}>
                    <Card style={styles.statCard}>
                        <View style={[styles.iconBox, { backgroundColor: '#E8F5E9' }]}>
                            <ShieldCheck size={24} color={colors.success} />
                        </View>
                        <Text style={styles.statValue}>Low Risk</Text>
                        <Text style={styles.statLabel}>Current Status</Text>
                    </Card>
                    <Card style={styles.statCard}>
                        <View style={[styles.iconBox, { backgroundColor: '#E3F2FD' }]}>
                            <TrendingUp size={24} color={colors.primary} />
                        </View>
                        <Text style={styles.statValue}>+5%</Text>
                        <Text style={styles.statLabel}>Improvement</Text>
                    </Card>
                </View>

                {/* Quick Actions (Assessments Preview) */}
                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>Quick Actions</Text>
                    <Text onPress={navigateToDashboard} style={styles.seeAll}>See All</Text>
                </View>

                <View style={styles.actionGrid}>
                    <Card
                        style={styles.actionCard}
                        onPress={() => navigation.navigate('DashboardTab', { screen: 'VoiceInstructions' } as any)}
                        icon={<Mic size={32} color={colors.primary} />}
                    >
                        <Text style={styles.actionTitle}>Voice</Text>
                        <Text style={styles.actionSubtitle}>Speech Analysis</Text>
                    </Card>

                    <Card
                        style={styles.actionCard}
                        onPress={() => navigation.navigate('DashboardTab', { screen: 'SpiralInstructions' } as any)}
                        icon={<Wind size={32} color={colors.secondary} />}
                    >
                        <Text style={styles.actionTitle}>Spiral</Text>
                        <Text style={styles.actionSubtitle}>Motor Skills</Text>
                    </Card>
                </View>

                {/* Insight Tip */}
                <Text style={styles.sectionTitle}>Daily Insight</Text>
                <Card style={styles.insightCard}>
                    <ClipboardList size={24} color={colors.textSecondary} />
                    <Text style={styles.insightText}>
                        "Regular sleep patterns significantly improve cognitive retention and reduce stress levels."
                    </Text>
                </Card>

                <View style={{ height: spacing.xxl }} />
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: colors.background,
    },
    container: {
        padding: spacing.l,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: spacing.l,
        marginTop: spacing.s,
    },
    greeting: {
        ...typography.body,
        color: colors.textSecondary,
    },
    username: {
        ...typography.h1,
        color: colors.text,
    },
    avatarPlaceholder: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: colors.border,
        justifyContent: 'center',
        alignItems: 'center',
    },
    avatarText: {
        ...typography.h2,
        color: colors.textSecondary,
    },
    // Hero
    heroCard: {
        padding: 0,
        overflow: 'hidden',
        marginBottom: spacing.xl,
    },
    heroContent: {
        padding: spacing.l,
        flexDirection: 'row',
        alignItems: 'center',
    },
    heroTitle: {
        ...typography.h2,
        marginBottom: spacing.xs,
    },
    heroBody: {
        ...typography.body,
        marginBottom: spacing.m,
    },
    watermarkIcon: {
        position: 'absolute',
        right: -20,
        bottom: -20,
        transform: [{ rotate: '-15deg' }],
    },
    // Stats
    statsGrid: {
        flexDirection: 'row',
        gap: spacing.m,
        marginBottom: spacing.xl,
    },
    statCard: {
        flex: 1,
        alignItems: 'flex-start',
    },
    iconBox: {
        padding: spacing.s,
        borderRadius: 12,
        marginBottom: spacing.s,
    },
    statValue: {
        ...typography.h2,
        fontSize: 20,
    },
    statLabel: {
        ...typography.caption,
    },
    // Action Grid
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: spacing.m,
    },
    sectionTitle: {
        ...typography.h2,
        fontSize: 18,
        marginBottom: spacing.s,
    },
    seeAll: {
        ...typography.button,
        color: colors.primary,
        fontSize: 14,
    },
    actionGrid: {
        flexDirection: 'row',
        gap: spacing.m,
        marginBottom: spacing.xl,
    },
    actionCard: {
        flex: 1,
        alignItems: 'center',
        paddingVertical: spacing.l,
    },
    actionTitle: {
        ...typography.subtitle,
        marginTop: spacing.s,
    },
    actionSubtitle: {
        ...typography.caption,
        textAlign: 'center',
    },
    // Insight
    insightCard: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.m,
    },
    insightText: {
        ...typography.body,
        flex: 1,
        fontSize: 14,
        fontStyle: 'italic',
        color: colors.text,
    },
});

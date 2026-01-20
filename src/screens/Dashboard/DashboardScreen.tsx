import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { DashboardStackParamList } from '../../types/navigation.types';
import { Header } from '../../components/Header';
import { Card } from '../../components/Card';
import { colors } from '../../constants/colors';
import { spacing } from '../../constants/spacing';
import { typography } from '../../constants/typography';
import { useAuth } from '../../hooks/useAuth';
import {
    Brain,
    Wind,
    Mic,
    FileText,
    Activity
} from 'lucide-react-native';

type NavigationProp = NativeStackNavigationProp<DashboardStackParamList>;

export const DashboardScreen = () => {
    const navigation = useNavigation<NavigationProp>();
    const { user } = useAuth();

    const assessments = [
        {
            title: 'Cognitive Quiz',
            subtitle: 'Memory & Focus',
            route: 'QuizInstructions' as const,
            icon: <Brain size={32} color={colors.primary} />,
            color: colors.primary,
        },
        {
            title: 'Spiral Drawing',
            subtitle: 'Motor Control',
            route: 'SpiralInstructions' as const,
            icon: <Wind size={32} color={colors.secondary} />,
            color: colors.secondary,
        },
        {
            title: 'Voice Analysis',
            subtitle: 'Speech Patterns',
            route: 'VoiceInstructions' as const,
            icon: <Mic size={32} color={colors.accent} />,
            color: colors.accent,
        },
        {
            title: 'Brain MRI',
            subtitle: 'Scan Analysis',
            route: 'BrainMRIUpload' as const,
            icon: <Activity size={32} color={colors.warning} />,
            color: colors.warning,
        },
    ];

    return (
        <SafeAreaView style={styles.container}>
            <Header title="Dashboard" subtitle={`Hello, ${user?.name || 'User'}`} />

            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

                <View style={styles.bannerContainer}>
                    <Card style={styles.banner} variant="highlight">
                        <View style={styles.bannerContent}>
                            <View style={{ flex: 1 }}>
                                <Text style={styles.bannerTitle}>Track Progress</Text>
                                <Text style={styles.bannerText}>Complete your weekly assessments to maintain a healthy score.</Text>
                            </View>
                            <FileText size={40} color="rgba(255,255,255,0.8)" />
                        </View>
                    </Card>
                </View>

                <Text style={styles.sectionTitle}>Assessments</Text>

                <View style={styles.grid}>
                    {assessments.map((item, index) => (
                        <View key={item.title} style={styles.gridItem}>
                            <Card
                                style={styles.card}
                                onPress={() => navigation.navigate(item.route)}
                                icon={item.icon}
                            >
                                <Text style={styles.cardTitle}>{item.title}</Text>
                                <Text style={styles.cardSubtitle}>{item.subtitle}</Text>
                            </Card>
                        </View>
                    ))}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    scrollContent: {
        padding: spacing.m,
        paddingBottom: spacing.xxl,
    },
    bannerContainer: {
        marginBottom: spacing.l,
    },
    banner: {
        padding: spacing.l,
    },
    bannerContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    bannerTitle: {
        ...typography.h2,
        color: colors.white,
        marginBottom: spacing.xs,
    },
    bannerText: {
        ...typography.caption,
        color: 'rgba(255,255,255,0.9)',
        fontSize: 13,
    },
    sectionTitle: {
        ...typography.h2,
        fontSize: 18,
        marginBottom: spacing.m,
        color: colors.text,
    },
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginHorizontal: -spacing.s, // counteract padding for items
    },
    gridItem: {
        width: '50%',
        padding: spacing.s,
    },
    card: {
        height: 160,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: spacing.l,
    },
    cardTitle: {
        ...typography.subtitle,
        fontSize: 16,
        marginTop: spacing.m,
        textAlign: 'center',
    },
    cardSubtitle: {
        ...typography.caption,
        textAlign: 'center',
        marginTop: spacing.xs,
    },
});

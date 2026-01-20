import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { historyApi } from '../../api/history.mock';
import { HistoryItem } from '../../types/history.types';
import { HistoryStackParamList } from '../../types/navigation.types';
import { Header } from '../../components/Header';
import { Card } from '../../components/Card';
import { Loader } from '../../components/Loader';
import { colors } from '../../constants/colors';
import { spacing } from '../../constants/spacing';
import { typography } from '../../constants/typography';
import { formatDate } from '../../utils/formatDate';
import {
    Brain,
    Wind,
    Mic,
    Activity,
    Calendar,
    ChevronRight,
    ClipboardList
} from 'lucide-react-native';

type NavigationProp = NativeStackNavigationProp<HistoryStackParamList>;

const getAssessmentIcon = (type: string) => {
    switch (type) {
        case 'quiz': return <Brain size={24} color={colors.white} />;
        case 'spiral': return <Wind size={24} color={colors.white} />;
        case 'voice': return <Mic size={24} color={colors.white} />;
        case 'mri': return <Activity size={24} color={colors.white} />;
        default: return <Activity size={24} color={colors.white} />;
    }
};

const getAssessmentColor = (type: string) => {
    switch (type) {
        case 'quiz': return colors.primary;
        case 'spiral': return colors.secondary;
        case 'voice': return colors.accent;
        case 'mri': return colors.warning;
        default: return colors.primary;
    }
};

const getAssessmentLabel = (type: string) => {
    switch (type) {
        case 'quiz': return 'Cognitive Quiz';
        case 'spiral': return 'Spiral Drawing';
        case 'voice': return 'Voice Analysis';
        case 'mri': return 'Brain MRI';
        default: return 'Assessment';
    }
};

export const HistoryListScreen = () => {
    const navigation = useNavigation<NavigationProp>();
    const [history, setHistory] = useState<HistoryItem[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadHistory();
    }, []);

    const loadHistory = async () => {
        try {
            const data = await historyApi.getHistory();
            setHistory(data);
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    const renderItem = ({ item }: { item: HistoryItem }) => {
        const color = getAssessmentColor(item.type);
        const icon = getAssessmentIcon(item.type);
        const label = getAssessmentLabel(item.type);

        return (
            <TouchableOpacity
                onPress={() => navigation.navigate('HistoryDetail', { id: item.id })}
                activeOpacity={0.7}
            >
                <Card style={styles.card}>
                    <View style={styles.row}>
                        {/* Icon Box */}
                        <View style={[styles.iconBox, { backgroundColor: color }]}>
                            {icon}
                        </View>

                        {/* Content */}
                        <View style={styles.content}>
                            <Text style={styles.title}>{label}</Text>
                            <View style={styles.metaRow}>
                                <Calendar size={14} color={colors.textSecondary} style={{ marginRight: 4 }} />
                                <Text style={styles.date}>{formatDate(item.date)}</Text>
                            </View>
                        </View>

                        {/* Status/Arrow */}
                        <View style={styles.rightSection}>
                            <View style={[
                                styles.badge,
                                { backgroundColor: item.riskLevel === 'HIGH' ? '#FFEBEE' : '#E8F5E9' }
                            ]}>
                                <Text style={[
                                    styles.badgeText,
                                    { color: item.riskLevel === 'HIGH' ? colors.error : colors.success }
                                ]}>
                                    {item.riskLevel}
                                </Text>
                            </View>
                        </View>
                    </View>
                </Card>
            </TouchableOpacity>
        );
    };

    if (loading) return (
        <SafeAreaView style={styles.safeArea}>
            <Header title="History" subtitle="Past Assessments" />
            <Loader message="Loading history..." />
        </SafeAreaView>
    );

    return (
        <SafeAreaView style={styles.safeArea} >
            <View style={styles.container}>
                <Header title="History" subtitle="Past Assessments" />

                {history.length === 0 ? (
                    <View style={styles.emptyState}>
                        <ClipboardList size={64} color={colors.border} />
                        <Text style={styles.emptyTitle}>No History Yet</Text>
                        <Text style={styles.emptyText}>Complete an assessment to see your progress here.</Text>
                    </View>
                ) : (
                    <FlatList
                        data={history}
                        renderItem={renderItem}
                        keyExtractor={(item) => item.id}
                        contentContainerStyle={styles.listContent}
                        refreshing={loading}
                        onRefresh={loadHistory}
                        showsVerticalScrollIndicator={false}
                    />
                )}
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: colors.background,
    },
    container: {
        flex: 1,
    },
    listContent: {
        padding: spacing.m,
        paddingBottom: spacing.xxl,
    },
    card: {
        padding: spacing.m,
        marginBottom: spacing.m,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconBox: {
        width: 48,
        height: 48,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: spacing.m,
    },
    content: {
        flex: 1,
    },
    title: {
        ...typography.subtitle,
        fontSize: 16,
        marginBottom: 4,
    },
    metaRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    date: {
        ...typography.caption,
        color: colors.textSecondary,
    },
    rightSection: {
        alignItems: 'flex-end',
    },
    badge: {
        paddingHorizontal: spacing.s,
        paddingVertical: 4,
        borderRadius: 8,
    },
    badgeText: {
        ...typography.caption,
        fontWeight: '700',
        fontSize: 11,
    },
    emptyState: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: spacing.xl,
        marginTop: -spacing.xl, // Optical adjustment
    },
    emptyTitle: {
        ...typography.h2,
        color: colors.textSecondary,
        marginTop: spacing.m,
        marginBottom: spacing.s,
    },
    emptyText: {
        ...typography.body,
        textAlign: 'center',
        color: colors.textSecondary,
    }
});

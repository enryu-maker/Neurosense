import React, { useEffect, useState } from 'react';
import { HistoryProgressGraph } from './HistoryProgressGraph';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { historyApi } from '../../api/history.mock';
import { HistoryItem } from '../../types/history.types';
import { HistoryStackParamList } from '../../types/navigation.types';
import { Loader } from '../../components/Loader';
import { colors } from '../../constants/colors';
import { spacing } from '../../constants/spacing';
import { typography } from '../../constants/typography';
import { formatDate } from '../../utils/formatDate';
import {
    Search,
    User as UserIcon,
    ChevronRight,
    TrendingUp,
    Activity
} from 'lucide-react-native';
import { useDispatch, useSelector } from 'react-redux';
import { getHistory } from '../../store/actions/homeAction';

type NavigationProp = NativeStackNavigationProp<HistoryStackParamList>;

// Mock User Avatar (or use Icon)
const UserAvatar = () => (
    <View style={styles.avatarContainer}>
        <UserIcon size={20} color={colors.primary} />
    </View>
);

const getAssessmentLabel = (type: string) => {
    switch (type) {
        case 'quiz': return 'Your Risk Quiz';
        case 'spiral': return 'Your Spiral Test';
        case 'voice': return 'Your Voice Analysis';
        case 'mri': return 'Your Brain MRI';
        default: return 'Assessment';
    }
};

const getStatusBadge = (riskLevel: string) => {
    const isHigh = riskLevel === 'HIGH';
    const isMedium = riskLevel === 'MEDIUM';

    let backgroundColor = '#DCFCE7'; // Green bg default
    let color = '#15803D'; // Green text default
    let text = 'HEALTHY';

    if (isHigh) {
        backgroundColor = '#FEF3C7'; // Yellow/Amber bg per design
        color = '#B45309'; // Amber text
        text = 'EARLY SIGNS';
    } else if (isMedium) {
        backgroundColor = '#FEF3C7';
        color = '#B45309';
        text = 'ATTENTION';
    }

    return { backgroundColor, color, text };
};

export const HistoryListScreen = () => {
    const dispatch = useDispatch();
    const history = useSelector((state: any) => state.reducer.history);
    const navigation = useNavigation<NavigationProp>();
    const [loading, setLoading] = useState(true);
    const [viewMode, setViewMode] = useState<'list' | 'progress'>('list');
    const [graphData, setGraphData] = useState<HistoryItem[]>([]);

    useEffect(() => {
        loadHistory();
        loadGraphData();
    }, []);

    const loadGraphData = async () => {
        try {
            const data = await historyApi.getGraphData();
            setGraphData(data);
        } catch (e) {
            console.error("Failed to load graph data", e);
        }
    };

    const loadHistory = async () => {
        try {
            dispatch(getHistory(setLoading));
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    const renderItem = ({ item }: { item: HistoryItem }) => {
        const { backgroundColor, color, text } = getStatusBadge(item.riskLevel);
        const label = getAssessmentLabel(item.type);
        const isWarning = item.riskLevel === 'HIGH' || item.riskLevel === 'MEDIUM';

        return (
            <TouchableOpacity
                onPress={() => navigation.navigate('HistoryDetail', { id: item.id })}
                activeOpacity={0.7}
                style={styles.cardContainer}
            >
                {/* Colored Left Border for warnings */}
                {isWarning && <View style={[styles.warningBorder, { backgroundColor: '#F59E0B' }]} />}

                <View style={styles.cardContent}>
                    {/* Badge & Date Row */}
                    <View style={styles.metaRow}>
                        <View style={[styles.badge, { backgroundColor }]}>
                            <Text style={[styles.badgeText, { color }]}>{item?.type}</Text>
                        </View>
                        <Text style={styles.date}>{formatDate(item.date)}</Text>
                    </View>

                    {/* Title & Arrow Row */}
                    <View style={styles.titleRow}>
                        <Text style={styles.itemTitle}>{item?.result}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    };

    if (loading) return (
        <SafeAreaView style={styles.safeArea}>
            <Loader message="Loading history..." />
        </SafeAreaView>
    );

    return (
        <SafeAreaView style={styles.safeArea}>
            {/* Header */}
            <View style={styles.header}>
                <View style={styles.headerLeft}>
                    <UserAvatar />
                    <Text style={styles.headerTitle}>User History</Text>
                </View>
                {/* <TouchableOpacity style={styles.searchButton}>
                    <Search size={24} color="#0F172A" />
                </TouchableOpacity> */}
            </View>

            {/* Toggle Switch */}
            <View style={styles.toggleContainer}>
                <TouchableOpacity
                    style={[styles.toggleButton, viewMode === 'list' && styles.toggleButtonActive]}
                    onPress={() => setViewMode('list')}
                >
                    <Text style={[styles.toggleText, viewMode === 'list' && styles.toggleTextActive]}>History</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.toggleButton, viewMode === 'progress' && styles.toggleButtonActive]}
                    onPress={() => setViewMode('progress')}
                >
                    <Text style={[styles.toggleText, viewMode === 'progress' && styles.toggleTextActive]}>Progress</Text>
                </TouchableOpacity>
            </View>

            {viewMode === 'list' ? (
                <FlatList
                    data={history}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id}
                    contentContainerStyle={styles.listContent}
                    refreshing={loading}
                    onRefresh={loadHistory}
                    showsVerticalScrollIndicator={false}
                    ListHeaderComponent={
                        <>
                            {/* List Header */}
                            <View style={styles.sectionHeaderContainer}>
                                <Text style={styles.sectionTitle}>Your Medical Records</Text>
                                <Text style={styles.sectionSubtitle}>Condensed overview of your recent tests</Text>
                            </View>
                        </>
                    }
                />
            ) : (
                <ScrollView style={styles.graphContainer} showsVerticalScrollIndicator={false}>
                    <HistoryProgressGraph data={graphData} />

                    {/* Recommendations Section */}
                    <View style={styles.recommendationSection}>
                        <Text style={styles.sectionTitle}>Recommendations</Text>
                        <Text style={styles.sectionSubtitle}>Based on your recent activity</Text>

                        <View style={styles.recommendationCard}>
                            <View style={[styles.iconBox, { backgroundColor: '#E0F2FE' }]}>
                                <Activity size={24} color="#0284C7" />
                            </View>
                            <View style={styles.recommendationText}>
                                <Text style={styles.recommendationTitle}>Maintain Regular Exercise</Text>
                                <Text style={styles.recommendationDesc}>Light aerobic exercise helps improve motor skills.</Text>
                            </View>
                        </View>

                        <View style={styles.recommendationCard}>
                            <View style={[styles.iconBox, { backgroundColor: '#DCFCE7' }]}>
                                <TrendingUp size={24} color="#16A34A" />
                            </View>
                            <View style={styles.recommendationText}>
                                <Text style={styles.recommendationTitle}>Track Your Progress</Text>
                                <Text style={styles.recommendationDesc}>Take the quiz weekly to monitor any changes.</Text>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            )}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: colors.background,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: spacing.m,
        paddingVertical: spacing.m,
        backgroundColor: colors.background, // Ensure header matches bg
    },
    headerLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    avatarContainer: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#E6F6F4', // Light teal
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: spacing.s,
    },
    headerTitle: {
        fontSize: 20, // H2 size approx
        fontWeight: '700',
        color: '#0F172A',
    },
    searchButton: {
        padding: 4,
    },
    listContent: {
        padding: spacing.m,
        paddingBottom: spacing.xxl,
    },
    insightCard: {
        backgroundColor: '#1E293B', // Dark Slate/Blue
        borderRadius: 16,
        padding: 20,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: spacing.xl,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 12,
        elevation: 4,
    },
    iconContainer: {
        width: 48,
        height: 48,
        borderRadius: 12,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    insightTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: colors.white,
        marginBottom: 4,
    },
    insightSubtitle: {
        fontSize: 12,
        color: '#94A3B8', // Light grey text
        lineHeight: 18,
        flexShrink: 1, // Allow wrap
        maxWidth: '95%',
    },
    sectionHeaderContainer: {
        marginBottom: spacing.m,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#0F172A', // Dark Navy
        marginBottom: 4,
    },
    sectionSubtitle: {
        fontSize: 14,
        color: '#64748B',
    },
    cardContainer: {
        backgroundColor: colors.white,
        borderRadius: 12,
        marginBottom: spacing.m,
        flexDirection: 'row',
        overflow: 'hidden', // Contain the left border
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 3,
        elevation: 2,
    },
    warningBorder: {
        width: 6,
        height: '100%',
    },
    cardContent: {
        flex: 1,
        padding: 16,
        paddingLeft: 16, // Reset padding if border exists
    },
    metaRow: {
        flexDirection: 'row',
        justifyContent: 'space-between', // Badge left, Date right
        alignItems: 'center',
        marginBottom: 8,
    },
    badge: {
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 6,
    },
    badgeText: {
        fontSize: 10,
        fontWeight: '700',
        letterSpacing: 0.5,
        textTransform: 'uppercase',
    },
    date: {
        fontSize: 12,
        color: '#94A3B8',
    },
    titleRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    itemTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: '#0F172A',
    },
    toggleContainer: {
        flexDirection: 'row',
        backgroundColor: '#F1F5F9',
        borderRadius: 12,
        padding: 4,
        marginHorizontal: spacing.m,
        marginBottom: spacing.m,
    },
    toggleButton: {
        flex: 1,
        paddingVertical: 8,
        alignItems: 'center',
        borderRadius: 8,
    },
    toggleButtonActive: {
        backgroundColor: colors.white,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 1,
    },
    toggleText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#64748B',
    },
    toggleTextActive: {
        color: '#0F172A',
    },
    graphContainer: {
        flex: 1,
        backgroundColor: colors.background,
    },
    recommendationSection: {
        padding: spacing.m,
        paddingTop: 0,
        paddingBottom: spacing.xxl,
    },
    recommendationCard: {
        backgroundColor: colors.white,
        borderRadius: 16,
        padding: 16,
        marginBottom: 12,
        flexDirection: 'row',
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
    },
    iconBox: {
        width: 48,
        height: 48,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    recommendationText: {
        flex: 1,
    },
    recommendationTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: '#0F172A',
        marginBottom: 2,
    },
    recommendationDesc: {
        fontSize: 13,
        color: '#64748B',
        lineHeight: 18,
    },
});

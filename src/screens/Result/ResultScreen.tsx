import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { DashboardStackParamList } from '../../types/navigation.types';
import { Button } from '../../components/Button';
import { colors } from '../../constants/colors';
import { spacing } from '../../constants/spacing';
import { typography } from '../../constants/typography';
import {
    X,
    HelpCircle,
    CheckCircle2,
    Waves,
    Activity,
    Moon,
    PenTool,
    Save,
    Share2
} from 'lucide-react-native';

type Props = NativeStackScreenProps<DashboardStackParamList, 'Result'>;

export const ResultScreen = ({ route, navigation }: Props) => {
    const { result, assessmentType } = route.params;

    const handleClose = () => {
        navigation.popToTop();
    };

    const handleViewHistory = () => {
        (navigation as any).navigate('HistoryTab');
    };

    const renderHeader = () => (
        <View style={styles.header}>
            {/* <TouchableOpacity onPress={handleClose}>
                <X size={24} color={colors.text} />
            </TouchableOpacity> */}
            <Text style={styles.headerTitle}>Quiz Results</Text>
            <TouchableOpacity>
                <HelpCircle size={24} color={colors.textSecondary} />
            </TouchableOpacity>
        </View>
    );

    const renderBreakdownItem = (icon: React.ReactNode, title: string, subtitle: string, status: string, statusColor: string) => (
        <View style={styles.breakdownItem}>
            <View style={styles.breakdownLeft}>
                <View style={styles.iconBox}>
                    {icon}
                </View>
                <View>
                    <Text style={styles.breakdownTitle}>{title}</Text>
                    <Text style={styles.breakdownSubtitle}>{subtitle}</Text>
                </View>
            </View>
            <View style={[styles.statusBadge, { backgroundColor: statusColor + '20' }]}>
                <Text style={[styles.statusText, { color: statusColor }]}>{status}</Text>
            </View>
        </View>
    );

    return (
        <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
            {renderHeader()}

            <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
                <Text style={styles.pageTitle}>Your Assessment Summary</Text>

                {/* Health Status Card */}
                <View style={styles.statusCard}>
                    <View style={styles.statusContent}>
                        <Text style={styles.statusLabel}>HEALTH STATUS</Text>
                        <View style={styles.statusRow}>
                            <View style={styles.statusIndicator} />
                            <Text style={styles.statusValue}>Stable / Low Risk</Text>
                        </View>
                        <Text style={styles.statusTime}>Last assessment: Today, 10:45 AM</Text>
                    </View>
                    <View style={styles.checkCircleContainer}>
                        <CheckCircle2 size={40} color={colors.white} strokeWidth={3} />
                    </View>
                </View>

                {/* AI Insight Box */}
                {/* <View style={styles.insightBox}>
                    <Text style={styles.insightText}>
                        <Text style={styles.insightPrefix}>AI Insight: </Text>
                        Your responses suggest your symptoms have been consistent with your baseline. No urgent changes were detected in your motor patterns or sleep quality compared to last month.
                    </Text>
                </View> */}

                {/* Response Breakdown */}
                {/* <Text style={styles.sectionHeader}>RESPONSE BREAKDOWN</Text> */}

                {/* <View style={styles.breakdownList}>
                    {renderBreakdownItem(
                        <Waves size={20} color={colors.primary} />,
                        "Tremor Frequency",
                        "No significant increase detected",
                        "Stable",
                        colors.success
                    )}

                    {renderBreakdownItem(
                        <Activity size={20} color={colors.primary} />,
                        "Gait Stability",
                        "Balance reported as steady",
                        "Stable",
                        colors.success
                    )}

                    {renderBreakdownItem(
                        <Moon size={20} color={colors.primary} />,
                        "Sleep Quality",
                        "7 hours of restful sleep",
                        "Good",
                        colors.success
                    )}

                    {renderBreakdownItem(
                        <PenTool size={20} color={colors.primary} />,
                        "Fine Motor Control",
                        "Slight stiffness noted",
                        "Mild",
                        "#F59E0B" // Amber/Warning color
                    )}
                </View> */}

            </ScrollView>

            {/* Footer */}
            <View style={styles.footer}>
                <Button
                    title="Save to History"
                    onPress={handleViewHistory}
                    icon={<Save size={20} color={colors.white} />}
                    variant="primary"
                    style={{ marginBottom: 12 }}
                />
                <Button
                    title="Share with Doctor"
                    onPress={() => { }}
                    variant="outline"
                    icon={<Share2 size={20} color={colors.primary} />}
                />
            </View>
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
        paddingVertical: spacing.s,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#0F172A',
    },
    container: {
        padding: spacing.m,
        paddingBottom: 40,
    },
    pageTitle: {
        fontSize: 28,
        fontWeight: '700',
        color: '#0F172A',
        marginBottom: spacing.l,
        lineHeight: 34,
    },
    statusCard: {
        backgroundColor: colors.white,
        borderRadius: 16,
        padding: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: spacing.m,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 2,
    },
    statusContent: {
        flex: 1,
    },
    statusLabel: {
        fontSize: 11,
        fontWeight: '700',
        color: '#94A3B8',
        letterSpacing: 1,
        marginBottom: 8,
    },
    statusRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    statusIndicator: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: colors.success,
        marginRight: 8,
    },
    statusValue: {
        fontSize: 18,
        fontWeight: '700',
        color: colors.success,
    },
    statusTime: {
        fontSize: 13,
        color: '#64748B',
    },
    checkCircleContainer: {
        width: 64,
        height: 64,
        borderRadius: 32,
        backgroundColor: '#E6F6F4', // Light teal
        justifyContent: 'center',
        alignItems: 'center',
    },
    insightBox: {
        backgroundColor: '#E6F6F4',
        borderRadius: 12,
        padding: 20,
        marginBottom: spacing.xl,
        borderLeftWidth: 4,
        borderLeftColor: colors.primary,
    },
    insightText: {
        fontSize: 14,
        color: '#334155',
        lineHeight: 22,
    },
    insightPrefix: {
        fontWeight: '700',
        color: '#0F172A',
    },
    sectionHeader: {
        fontSize: 12,
        fontWeight: '700',
        color: '#94A3B8',
        marginBottom: spacing.m,
        letterSpacing: 0.5,
    },
    breakdownList: {
        gap: 12,
    },
    breakdownItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: colors.white,
        padding: 16,
        borderRadius: 12,
    },
    breakdownLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    iconBox: {
        width: 40,
        height: 40,
        borderRadius: 8,
        backgroundColor: '#F1F5F9', // Light grey
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    breakdownTitle: {
        fontSize: 15,
        fontWeight: '600',
        color: '#0F172A',
        marginBottom: 2,
    },
    breakdownSubtitle: {
        fontSize: 12,
        color: '#64748B',
    },
    statusBadge: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 20,
    },
    statusText: {
        fontSize: 12,
        fontWeight: '600',
    },
    footer: {
        padding: 20,
        backgroundColor: colors.background,
    },
});

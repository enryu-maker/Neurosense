import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { HistoryStackParamList } from '../../types/navigation.types';
import { historyApi } from '../../api/history.mock';
import { HistoryItem } from '../../types/history.types';
import { Loader } from '../../components/Loader';
import { ConfidenceBar } from '../../components/ConfidenceBar';
import { colors } from '../../constants/colors';
import { spacing } from '../../constants/spacing';
import { typography } from '../../constants/typography';
import { formatDate } from '../../utils/formatDate';

type Props = NativeStackScreenProps<HistoryStackParamList, 'HistoryDetail'>;

export const HistoryDetailScreen = ({ route }: Props) => {
    const { id } = route.params;
    const [item, setItem] = useState<HistoryItem | undefined>(undefined);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        historyApi.getDetail(id).then((data) => {
            setItem(data);
            setLoading(false);
        });
    }, [id]);

    if (loading) return <SafeAreaView style={styles.safeArea}><Loader /></SafeAreaView>;
    if (!item) return <SafeAreaView style={styles.safeArea}><Text>Item not found</Text></SafeAreaView>;

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView contentContainerStyle={styles.container}>
                <Text style={styles.header}>Assessment Details</Text>

                <View style={styles.card}>
                    <View style={styles.row}>
                        <Text style={styles.label}>Type</Text>
                        <Text style={styles.value}>{item.type.toUpperCase()}</Text>
                    </View>

                    <View style={styles.row}>
                        <Text style={styles.label}>Date</Text>
                        <Text style={styles.value}>{formatDate(item.date)}</Text>
                    </View>

                    <View style={styles.divider} />

                    <Text style={styles.label}>Risk Level</Text>
                    <Text style={[styles.riskValue, { color: item.riskLevel === 'HIGH' ? colors.error : colors.success }]}>
                        {item.riskLevel}
                    </Text>

                    <ConfidenceBar score={item.confidence} label="AI Confidence" />

                    <Text style={styles.feedbackLabel}>Feedback</Text>
                    <Text style={styles.feedback}>{item.feedback}</Text>
                </View>
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
        padding: spacing.m,
    },
    header: {
        ...typography.h1,
        marginBottom: spacing.l,
        textAlign: 'center',
    },
    card: {
        backgroundColor: colors.white,
        borderRadius: spacing.m,
        padding: spacing.m,
        shadowColor: colors.black,
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 2,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: spacing.s,
    },
    label: {
        ...typography.body,
        fontWeight: '600',
        color: colors.textSecondary,
    },
    value: {
        ...typography.body,
        fontWeight: 'bold',
    },
    divider: {
        height: 1,
        backgroundColor: colors.border,
        marginVertical: spacing.m,
    },
    riskValue: {
        ...typography.h1,
        marginBottom: spacing.m,
        fontSize: 24,
    },
    feedbackLabel: {
        ...typography.h2,
        fontSize: 18,
        marginTop: spacing.m,
        marginBottom: spacing.xs,
    },
    feedback: {
        ...typography.body,
        lineHeight: 22,
    },
});

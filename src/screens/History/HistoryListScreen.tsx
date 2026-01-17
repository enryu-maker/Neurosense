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

type NavigationProp = NativeStackNavigationProp<HistoryStackParamList>;

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

    const renderItem = ({ item }: { item: HistoryItem }) => (
        <TouchableOpacity
            onPress={() => navigation.navigate('HistoryDetail', { id: item.id })}
        >
            <Card style={styles.card}>
                <View style={styles.cardHeader}>
                    <Text style={styles.cardTitle}>{item.type.toUpperCase()}</Text>
                    <Text style={styles.cardDate}>{formatDate(item.date)}</Text>
                </View>
                <Text style={[styles.risk, { color: item.riskLevel === 'HIGH' ? colors.error : colors.success }]}>
                    {item.riskLevel} RISK
                </Text>
            </Card>
        </TouchableOpacity>
    );

    if (loading) return <SafeAreaView style={styles.safeArea}><Loader message="Loading history..." /></SafeAreaView>;

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                <Header title="History" subtitle="Past Assessments" />
                <FlatList
                    data={history}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id}
                    contentContainerStyle={styles.listContent}
                    refreshing={loading}
                    onRefresh={loadHistory}
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
    container: {
        flex: 1,
    },
    listContent: {
        padding: spacing.m,
    },
    card: {
        marginBottom: spacing.m,
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: spacing.s,
    },
    cardTitle: {
        ...typography.h2,
        fontSize: 18,
    },
    cardDate: {
        ...typography.caption,
    },
    risk: {
        ...typography.button,
        fontWeight: 'bold',
    },
});

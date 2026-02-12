
import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { LineChart } from 'react-native-gifted-charts';
import { HistoryItem } from '../../types/history.types';
import { colors } from '../../constants/colors';
import { formatDate } from '../../utils/formatDate';

interface Props {
    data: HistoryItem[];
}

import { LinearGradient } from 'react-native-linear-gradient';

export const HistoryProgressGraph = ({ data }: Props) => {
    // Filter only quiz results with stage data
    const chartData = data
        .filter(item => item.type === 'quiz' && item.stage !== undefined)
        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
        .map(item => ({
            value: item.stage || 0,
            label: formatDate(item.date).split(',')[0], // Short date
            date: item.date,
            dataPointText: '',
            // Custom styling for points based on stage
            dataPointColor: (item.stage || 0) > 0 ? '#F59E0B' : '#10B981', // Amber for stages, Green for 0
        }));

    if (chartData.length === 0) {
        return (
            <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>No progress data available yet.</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Parkinson's Stage Over Time</Text>
            <View style={styles.legendContainer}>
                <View style={[styles.legendDot, { backgroundColor: '#10B981' }]} />
                <Text style={styles.legendText}>Healthy</Text>
                <View style={[styles.legendDot, { backgroundColor: '#F59E0B', marginLeft: 16 }]} />
                <Text style={styles.legendText}>Risk Detected</Text>
            </View>

            <View style={styles.chartWrapper}>
                <LineChart
                    data={chartData}
                    width={Dimensions.get('window').width - 64} // Adjusted width
                    height={220}
                    spacing={60}
                    initialSpacing={20}
                    color="#0F766E" // Teal
                    thickness={3}
                    startFillColor="#14B8A6"
                    endFillColor="#FFFFFF"
                    startOpacity={0.2}
                    endOpacity={0.05}
                    areaChart
                    // Visual Enhancements
                    curved
                    isAnimated
                    animationDuration={1200}
                    // Axis Styling
                    yAxisColor="transparent"
                    xAxisColor="#E2E8F0"
                    yAxisTextStyle={{ color: '#94A3B8', fontSize: 10, fontWeight: '500' }}
                    xAxisLabelTextStyle={{ color: '#64748B', fontSize: 10, fontWeight: '500', width: 60 }}
                    // Grid Configuration
                    hideRules={false}
                    rulesType="dashed"
                    rulesColor="#F1F5F9"
                    // Data Points
                    hideDataPoints={false}
                    dataPointsColor="#0F766E"
                    dataPointsRadius={6}
                    dataPointLabelWidth={30}
                    dataPointLabelShiftY={-20}
                    // Y-Axis Configuration
                    maxValue={5}
                    noOfSections={5}
                    yAxisLabelTexts={['0', '1', '2', '3', '4', '5']}
                    // Interaction
                    pointerConfig={{
                        pointerStripHeight: 160,
                        pointerStripColor: '#CBD5E1',
                        pointerStripWidth: 2,
                        pointerColor: '#0F766E',
                        radius: 6,
                        pointerLabelWidth: 100,
                        pointerLabelHeight: 90,
                        activatePointersOnLongPress: true,
                        autoAdjustPointerLabelPosition: true,
                        pointerLabelComponent: (items: any) => {
                            const item = items[0];
                            return (
                                <View style={styles.tooltip}>
                                    <Text style={styles.tooltipTitle}>{formatDate(item.date)}</Text>
                                    <View style={styles.tooltipRow}>
                                        <Text style={styles.tooltipLabel}>Stage:</Text>
                                        <Text style={styles.tooltipValue}>{item.value}</Text>
                                    </View>
                                </View>
                            );
                        },
                    }}
                />
            </View>
            <Text style={styles.axisLabel}>Assessments Timeline</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.white,
        borderRadius: 24,
        padding: 20,
        margin: 16,
        // Softer Shadow
        shadowColor: '#64748B',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.1,
        shadowRadius: 20,
        elevation: 4,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#F1F5F9',
    },
    title: {
        fontSize: 18,
        fontWeight: '700',
        color: '#0F172A',
        marginBottom: 12,
        alignSelf: 'flex-start',
    },
    legendContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 24,
        alignSelf: 'flex-start',
    },
    legendDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        marginRight: 8,
    },
    legendText: {
        fontSize: 12,
        color: '#64748B',
        fontWeight: '500',
    },
    chartWrapper: {
        marginLeft: -10, // Adjust for Y-axis labels space
        paddingRight: 10,
    },
    axisLabel: {
        fontSize: 10,
        fontWeight: '600',
        color: '#94A3B8',
        marginTop: 16,
        letterSpacing: 1,
        textTransform: 'uppercase',
    },
    emptyContainer: {
        padding: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },
    emptyText: {
        color: '#94A3B8',
        textAlign: 'center',
    },
    tooltip: {
        backgroundColor: '#0F172A',
        borderRadius: 12,
        padding: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 6,
    },
    tooltipTitle: {
        color: '#F8FAFC',
        fontSize: 12,
        fontWeight: '600',
        marginBottom: 4,
        opacity: 0.8,
    },
    tooltipRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    tooltipLabel: {
        color: '#F8FAFC',
        fontSize: 14,
    },
    tooltipValue: {
        color: '#2DD4BF', // Bright Teal
        fontSize: 14,
        fontWeight: '700',
    }
});

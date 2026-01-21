import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { DashboardStackParamList } from '../../types/navigation.types';
import { colors } from '../../constants/colors';
import { spacing } from '../../constants/spacing';
import { typography } from '../../constants/typography';
import { Button } from '../../components/Button';
import {
    Brain,
    User,
    Wind,
    Mic,
    Activity,
    FileQuestion,
    Waves,
    FileUp,
    ShieldCheck,
    Clock,
} from 'lucide-react-native';

type NavigationProp = NativeStackNavigationProp<DashboardStackParamList>;

export const DashboardScreen = () => {
    const navigation = useNavigation<NavigationProp>();

    const renderHeader = () => (
        <View style={styles.header}>
            <View>
                <View style={styles.logoRow}>
                    <View style={styles.logoIcon}>
                        <Brain size={20} color={colors.primary} />
                    </View>
                    <Text style={styles.headerLogo}>Neurosense</Text>
                </View>
                <Text style={styles.pageTitle}>Assessments Hub</Text>
                <Text style={styles.pageSubtitle}>Complete your daily neuro-health checkups.</Text>
            </View>
            <TouchableOpacity onPress={() => navigation.navigate('ProfileTab')}>
                <User size={24} color={colors.primary} />
            </TouchableOpacity>
        </View>
    );

    const renderAssessmentCard = (
        title: string,
        description: string,
        tag: string,
        icon: React.ReactNode,
        statusLabel: string,
        statusIcon: React.ReactNode,
        buttonAction: () => void,
        buttonLabel: string = "Start Test"
    ) => (
        <View style={styles.card}>
            <View style={styles.cardHeader}>
                <View style={styles.iconContainer}>
                    {icon}
                </View>
                <View style={styles.tagContainer}>
                    <Text style={styles.tagText}>{tag}</Text>
                </View>
            </View>

            <View style={styles.cardContent}>
                <Text style={styles.cardTitle}>{title}</Text>
                <Text style={styles.cardDesc}>{description}</Text>
            </View>

            <View style={styles.cardFooter}>
                <View style={styles.statusRow}>
                    {statusIcon}
                    <Text style={styles.statusText}>{statusLabel}</Text>
                </View>
                <Button
                    title={buttonLabel}
                    onPress={buttonAction}
                    variant="primary"
                    style={styles.actionButton}
                    textStyle={{ fontSize: 14 }}
                />
            </View>
        </View>
    );

    return (
        <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
            <ScrollView
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                {renderHeader()}

                <View style={styles.listContainer}>
                    {renderAssessmentCard(
                        "Risk Quiz",
                        "Comprehensive questionnaire to assess early motor and non-motor symptoms.",
                        "DAILY GOAL",
                        <FileQuestion size={24} color={colors.primary} />,
                        "Last: 2 days ago",
                        <Clock size={14} color={colors.textSecondary} />,
                        () => navigation.navigate('QuizInstructions')
                    )}

                    {renderAssessmentCard(
                        "Spiral Drawing Test",
                        "Interactive motor coordination test to evaluate tremor severity and hand stability.",
                        "MOTOR TEST",
                        <Waves size={24} color={colors.primary} />, // Using Waves/Scribble substitute
                        "Last: Yesterday",
                        <Clock size={14} color={colors.textSecondary} />,
                        () => navigation.navigate('SpiralInstructions')
                    )}

                    {renderAssessmentCard(
                        "Voice Analysis",
                        "AI-powered recording to detect subtle changes in speech patterns and vocal clarity.",
                        "AI AUDIO",
                        <Mic size={24} color={colors.primary} />,
                        "Last: 3 days ago",
                        <Clock size={14} color={colors.textSecondary} />,
                        () => navigation.navigate('VoiceInstructions')
                    )}

                    {renderAssessmentCard(
                        "MRI Scan Upload",
                        "Securely upload and analyze neuroimaging data for clinical-grade insights.",
                        "CLINICAL DATA",
                        <FileUp size={24} color={colors.primary} />,
                        "HIPAA Encrypted",
                        <ShieldCheck size={14} color={colors.textSecondary} />,
                        () => navigation.navigate('BrainMRIUpload'),
                        "Upload"
                    )}
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
        padding: 20,
        paddingBottom: 40,
    },
    header: {
        marginBottom: 24,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    logoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    logoIcon: {
        width: 32,
        height: 32,
        borderRadius: 8,
        backgroundColor: '#E6F6F4', // Light teal bg
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 8,
    },
    headerLogo: {
        ...typography.h3,
        fontWeight: 'bold',
        color: '#1C1C1E', // Dark text
    },
    pageTitle: {
        fontSize: 24,
        fontWeight: '700',
        color: '#0F172A', // Dark Navy
        marginBottom: 4,
    },
    pageSubtitle: {
        ...typography.body,
        fontSize: 14,
        color: colors.textSecondary,
    },
    listContainer: {
        gap: 16,
    },
    card: {
        backgroundColor: colors.white,
        borderRadius: 16,
        padding: 20,
        // Shadow (subtle)
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.03,
        shadowRadius: 8,
        elevation: 2,
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 16,
    },
    iconContainer: {
        width: 48,
        height: 48,
        borderRadius: 12,
        backgroundColor: '#E6F6F4', // Light teal
        justifyContent: 'center',
        alignItems: 'center',
    },
    tagContainer: {
        backgroundColor: colors.surface,
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 4,
        alignSelf: 'flex-start',
    },
    tagText: {
        fontSize: 10,
        fontWeight: '700',
        color: '#94A3B8', // Grey text
        textTransform: 'uppercase',
        letterSpacing: 0.5,
    },
    cardContent: {
        marginBottom: 20,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#0F172A',
        marginBottom: 8,
    },
    cardDesc: {
        fontSize: 14,
        color: '#64748B', // Slate grey
        lineHeight: 20,
    },
    cardFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderTopWidth: 1,
        borderTopColor: '#F1F5F9', // Very light border
        paddingTop: 16,
    },
    statusRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    statusText: {
        fontSize: 12,
        color: '#94A3B8',
        fontWeight: '500',
    },
    actionButton: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        height: 40,
        minWidth: 100, // Ensure decent click area
        maxWidth: '45%', // Approx "half the width" relative to typical card footer
        borderRadius: 8, // "Less border radius"
    }
});

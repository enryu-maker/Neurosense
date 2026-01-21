import React from 'react';
import { View, Text, StyleSheet, ScrollView, ImageBackground, TouchableOpacity, Image } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { User, Activity, Mic, Shield, Lock, Award, Brain, ArrowRight } from 'lucide-react-native';
import { colors } from '../../constants/colors';
import { typography } from '../../constants/typography';
import { Button } from '../../components/Button';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/navigation.types';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export const HomeScreen = () => {
    const insets = useSafeAreaInsets();
    const navigation = useNavigation<NavigationProp>();

    const renderHeader = () => (
        <View style={[styles.header, { marginTop: insets.top }]}>
            <View style={styles.headerLeft}>
                <View style={styles.logoIcon}>
                    <Brain size={20} color={colors.primary} />
                </View>
                <Text style={styles.headerLogo}>Neurosense</Text>
            </View>
            <TouchableOpacity
                style={styles.profileButton}
                onPress={() => navigation.navigate('App', { screen: 'ProfileTab' })}
            >
                <User size={24} color={colors.primary} />
            </TouchableOpacity>
        </View>
    );

    const renderHero = () => (
        <View style={styles.heroContainer}>
            <ImageBackground
                source={require('../../assets/images/hero_bg.png')}
                style={styles.heroImage}
                imageStyle={{ borderRadius: 16 }}
            >
                <View style={styles.heroOverlay} />
            </ImageBackground>
            <View style={styles.heroContent}>
                <Text style={styles.heroTitle}>Your Personal Neurological Companion</Text>
                <Text style={styles.heroSubtitle}>
                    Clinically-backed AI monitoring to track your Parkinson’s journey with precision, privacy, and ease.
                </Text>
                <Button
                    title="Get Started"
                    onPress={() => navigation.navigate('App', { screen: 'DashboardTab' })}
                    variant="primary"
                    style={styles.heroButton}
                />
            </View>
        </View>
    );

    const renderAssessmentCard = (title: string, description: string, icon: React.ReactNode, imageColor: string) => (
        <View style={styles.assessmentCard}>
            {/* Placeholder for assessment cover images until generation works */}
            <View style={[styles.assessmentImagePlaceholder, { backgroundColor: imageColor }]}>
                {/* Abstract pattern overlay simulation */}
                <View style={[styles.patternCircle, { right: -50, top: -50, width: 150, height: 150 }]} />
                <View style={[styles.patternCircle, { left: -30, bottom: -30, width: 100, height: 100 }]} />
            </View>

            <View style={styles.assessmentContent}>
                <View style={styles.assessmentTitleRow}>
                    <View style={styles.assessmentIconBadge}>
                        {icon}
                    </View>
                    <Text style={styles.assessmentTitle}>{title}</Text>
                </View>
                <Text style={styles.assessmentDesc}>{description}</Text>
            </View>
        </View>
    );

    const renderTrustItem = (icon: React.ReactNode, title: string, desc: string) => (
        <View style={styles.trustItem}>
            <View style={styles.trustIconContainer}>
                {icon}
            </View>
            <Text style={styles.trustTitle}>{title}</Text>
            <Text style={styles.trustDesc}>{desc}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            {renderHeader()}
            <ScrollView
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                {renderHero()}

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>AI-Powered Assessments</Text>
                    <Text style={styles.sectionSubtitle}>Validated clinical protocols at your fingertips.</Text>

                    {renderAssessmentCard(
                        "Spiral Test",
                        "Digital Motor Assessment. Track fine motor control through high-precision drawing analysis and tremor detection.",
                        <Activity size={20} color={colors.primary} />,
                        "#1a202c" // Dark placeholder
                    )}

                    {renderAssessmentCard(
                        "Voice Analysis",
                        "Vocal Biomarkers. Monitor speech patterns, clarity, and articulation using advanced AI phonetic algorithms.",
                        <Mic size={20} color={colors.primary} />,
                        "#0f172a" // Darker blue placeholder
                    )}
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Clinical Trust & Security</Text>
                    <Text style={styles.sectionSubtitle}>Your health data is sensitive. We treat it with the highest standards of medical privacy.</Text>

                    <View style={styles.trustGrid}>
                        {renderTrustItem(
                            <Shield size={24} color={colors.white} />,
                            "Secure",
                            "Full HIPAA & GDPR compliant encryption."
                        )}
                        {renderTrustItem(
                            <Lock size={24} color={colors.white} />,
                            "Private",
                            "Personal data is never shared with 3rd parties."
                        )}
                        {renderTrustItem(
                            <Award size={24} color={colors.white} />,
                            "Clinical",
                            "Validated by neurological researchers."
                        )}
                    </View>
                </View>

                {/* <View style={styles.footer}>
                    <View style={styles.footerLogoRow}>
                        <Brain size={16} color={colors.textSecondary} />
                        <Text style={styles.footerLogoText}>Neurosense</Text>
                    </View>
                    <Text style={styles.disclaimer}>
                        Disclaimer: Neurosense is a monitoring tool and not a substitute for professional medical advice, diagnosis, or treatment.
                    </Text>
                    <View style={styles.footerLinks}>
                        <Text style={styles.linkText}>Privacy Policy</Text>
                        <Text style={styles.linkText}>Terms of Service</Text>
                        <Text style={styles.linkText}>Support</Text>
                    </View>
                    <Text style={styles.copyright}>© 2024 Neurosense Health AI. All rights reserved.</Text>
                </View> */}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 16,
        backgroundColor: colors.background,
    },
    headerLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    logoIcon: {
        marginRight: 8,
    },
    headerLogo: {
        ...typography.h3,
        fontSize: 18,
        color: colors.text,
        fontWeight: '700',
    },
    profileButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: colors.surface,
        justifyContent: 'center',
        alignItems: 'center',
    },
    scrollContent: {
        paddingBottom: 40,
    },
    heroContainer: {
        marginHorizontal: 20,
        marginBottom: 32,
        borderRadius: 16,
        overflow: 'hidden',
        backgroundColor: '#0f172a', // Fallback color
    },
    heroImage: {
        width: '100%',
        height: 300,
        justifyContent: 'flex-end',
    },
    heroOverlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.3)',
    },
    heroContent: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: 24,
    },
    heroTitle: {
        ...typography.h1,
        fontSize: 28,
        color: colors.white,
        marginBottom: 12,
        lineHeight: 34,
        textShadowColor: 'rgba(0,0,0,0.75)',
        textShadowOffset: { width: 0, height: 2 },
        textShadowRadius: 6,
    },
    heroSubtitle: {
        ...typography.body,
        color: '#e2e8f0',
        marginBottom: 20,
        lineHeight: 22,
        textShadowColor: 'rgba(0,0,0,0.75)',
        textShadowOffset: { width: 0, height: 1 },
        textShadowRadius: 4,
    },
    heroButton: {
        width: '100%',
    },
    section: {
        paddingHorizontal: 20,
        marginBottom: 32,
    },
    sectionTitle: {
        ...typography.h2,
        fontSize: 22,
        color: colors.text,
        marginBottom: 6,
    },
    sectionSubtitle: {
        ...typography.body,
        color: colors.textSecondary,
        marginBottom: 20,
    },
    assessmentCard: {
        backgroundColor: colors.surface,
        borderRadius: 16,
        overflow: 'hidden',
        marginBottom: 16,
        borderWidth: 1,
        borderColor: colors.border,
        elevation: 2,
        shadowColor: colors.text,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
    },
    assessmentImagePlaceholder: {
        height: 140,
        width: '100%',
        position: 'relative',
        overflow: 'hidden',
    },
    patternCircle: {
        position: 'absolute',
        borderRadius: 100,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.1)',
        backgroundColor: 'rgba(255,255,255,0.02)',
    },
    assessmentContent: {
        padding: 20,
    },
    assessmentTitleRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingBottom: 8,
    },
    assessmentIconBadge: {
        marginRight: 10,
    },
    assessmentTitle: {
        ...typography.h3,
        fontSize: 18,
        color: colors.text,
    },
    assessmentDesc: {
        ...typography.body,
        color: colors.textSecondary,
        lineHeight: 20,
    },
    trustGrid: {
        gap: 16,
        backgroundColor: colors.surface,
    },
    trustItem: {
        backgroundColor: colors.surface,
        padding: 20,
        borderRadius: 16,
        alignItems: 'flex-start',
    },
    trustIconContainer: {
        width: 48,
        height: 48,
        borderRadius: 12,
        backgroundColor: colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 16,
    },
    trustTitle: {
        ...typography.h3,
        fontSize: 16,
        color: colors.text,
        marginBottom: 4,
    },
    trustDesc: {
        ...typography.caption,
        fontSize: 13,
        color: colors.textSecondary,
        lineHeight: 18,
    },
    footer: {
        padding: 32,
        alignItems: 'center',
        borderTopWidth: 1,
        borderTopColor: colors.border,
    },
    footerLogoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
        opacity: 0.7,
    },
    footerLogoText: {
        ...typography.caption,
        fontSize: 14,
        fontWeight: '600',
        color: colors.textSecondary,
        marginLeft: 8,
    },
    disclaimer: {
        ...typography.caption,
        textAlign: 'center',
        color: colors.textSecondary,
        opacity: 0.6,
        marginBottom: 24,
    },
    footerLinks: {
        flexDirection: 'row',
        gap: 24,
        marginBottom: 24,
    },
    linkText: {
        ...typography.caption,
        color: colors.text,
        fontWeight: '500',
    },
    copyright: {
        ...typography.caption,
        color: colors.textSecondary,
        opacity: 0.5,
    },
});

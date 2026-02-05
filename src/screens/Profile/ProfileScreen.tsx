import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../../hooks/useAuth';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { colors } from '../../constants/colors';
import { spacing } from '../../constants/spacing';
import { typography } from '../../constants/typography';
import {
    ChevronLeft,
    Shield,
    HelpCircle,
    ExternalLink,
    LogOut,
    PenLine,
    ChevronRight,
} from 'lucide-react-native';
import { useDispatch, useSelector } from 'react-redux';
import { getProfile } from '../../store/actions/homeAction';

const MenuItem = ({ icon, label, rightIcon }: { icon: React.ReactNode, label: string, rightIcon?: React.ReactNode }) => (
    <TouchableOpacity style={styles.menuItem}>
        <View style={styles.menuLeft}>
            <View style={styles.menuIconBox}>
                {icon}
            </View>
            <Text style={styles.menuLabel}>{label}</Text>
        </View>
        {rightIcon || <ChevronRight size={20} color={colors.textSecondary} />}
    </TouchableOpacity>
);

export const ProfileScreen = () => {
    const dispatch = useDispatch();
    const profile = useSelector((state: any) => state.reducer.profile);
    const { user, logout, updateUser } = useAuth();
    const [name, setName] = useState(user?.name || 'Alex Johnson');
    const [loading, setLoading] = useState(false);

    React.useEffect(() => {
        dispatch(getProfile(setLoading));
    }, []);

    const handleLogout = () => {
        logout();
    };

    const handleUpdateName = async () => {
        if (!name.trim()) {
            Alert.alert("Error", "Name cannot be empty");
            return;
        }

        setLoading(true);
        try {
            await updateUser({ name });
            Alert.alert("Success", "Profile updated successfully");
        } catch (error) {
            Alert.alert("Error", "Failed to update profile");
        } finally {
            setLoading(false);
        }
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Personal Settings</Text>
            </View>

            <ScrollView contentContainerStyle={styles.container}>

                {/* User Info (No Photo as requested) */}
                <View style={styles.userInfo}>
                    <Text style={styles.userName}>{profile?.username}</Text>
                    <Text style={styles.userId}>{profile?.email}</Text>
                </View>

                {/* Clinical Trust */}
                <View style={styles.sectionHeaderContainer}>
                    <Text style={styles.sectionHeader}>CLINICAL TRUST</Text>
                </View>

                <View style={styles.card}>
                    <MenuItem
                        icon={<Shield size={20} color={colors.primary} />}
                        label="Data Privacy & Sharing"
                        rightIcon={<ExternalLink size={20} color={colors.textSecondary} />}
                    />
                    <View style={styles.divider} />
                    <MenuItem
                        icon={<HelpCircle size={20} color={colors.primary} />}
                        label="Neurosense Support"
                    />
                </View>

                {/* Logout */}
                <View style={styles.logoutContainer}>
                    <Button
                        title="Log Out"
                        onPress={handleLogout}
                        variant="outline"
                        textStyle={{ color: colors.error }}
                        style={{ borderColor: '#FECACA', backgroundColor: '#FEF2F2' }} // Light red bg
                        icon={<LogOut size={20} color={colors.error} />}
                    />
                </View>

                <Text style={styles.versionText}>Neurosense v2.4.12 • Secure Medical Endpoint</Text>

            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#F8FAFC', // Very light grey/blue bg
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',

        paddingVertical: spacing.m,
        backgroundColor: '#F8FAFC',
    },
    backButton: {
        padding: 4,
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
    userInfo: {
        alignItems: 'center',
        marginBottom: 32,
        marginTop: 16,
    },
    userName: {
        fontSize: 24,
        fontWeight: '800', // Heavy bold
        color: '#0F172A',
        marginBottom: 4,
    },
    userId: {
        fontSize: 14,
        fontWeight: '600',
        color: '#64748B',
    },
    sectionHeaderContainer: {
        marginBottom: spacing.s,
        marginTop: spacing.s,
    },
    sectionHeader: {
        fontSize: 11,
        fontWeight: '800',
        color: '#475569',
        letterSpacing: 1,
        textTransform: 'uppercase',
    },
    card: {
        backgroundColor: colors.white,
        borderRadius: 16,
        padding: 20,
        marginBottom: spacing.l,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
        elevation: 2,
        borderWidth: 1,
        borderColor: '#E2E8F0',
    },
    updateButton: {
        backgroundColor: '#0F766E', // Darker Teal
        borderRadius: 8,
        height: 48,
        justifyContent: 'center',
        alignItems: 'center',
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 4,
    },
    menuLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    menuIconBox: {
        marginRight: 12,
    },
    menuLabel: {
        fontSize: 16,
        fontWeight: '500',
        color: '#0F172A',
    },
    divider: {
        height: 1,
        backgroundColor: '#E2E8F0',
        marginVertical: 16,
    },
    logoutContainer: {
        marginTop: spacing.m,
    },
    versionText: {
        textAlign: 'center',
        marginTop: 32,
        fontSize: 11,
        color: '#94A3B8',
        fontWeight: '500',
    },
});

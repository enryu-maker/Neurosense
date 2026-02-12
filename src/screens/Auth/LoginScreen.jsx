import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Alert,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    TouchableOpacity,
    Modal,
    TextInput,
} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Brain, Eye, EyeOff, ArrowRight, ShieldCheck, Settings, X } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';

// Local Imports
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { colors } from '../../constants/colors';
import { spacing } from '../../constants/spacing';
import { LoginAction } from '../../store/actions/authAction';

export const LoginScreen = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();

    // Form State
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    // Settings Modal State
    const [isSettingsVisible, setSettingsVisible] = useState(false);
    const [tempBaseUrl, setTempBaseUrl] = useState('');

    // Load saved Base URL on mount
    useEffect(() => {
        const loadSavedUrl = async () => {
            const savedUrl = await AsyncStorage.getItem('custom_base_url');
            if (savedUrl) {
                setTempBaseUrl(savedUrl);
            } else {
                setTempBaseUrl("http://192.168.1.23:8000/api/v1"); // Default
            }
        };
        loadSavedUrl();
    }, []);

    const handleSaveSettings = async () => {
        if (!tempBaseUrl.trim()) {
            Alert.alert('Error', 'Base URL cannot be empty');
            return;
        }
        try {
            await AsyncStorage.setItem('custom_base_url', tempBaseUrl.trim());
            setSettingsVisible(false);
            Alert.alert('Success', 'Base URL updated. Requests will now use the new path.');
        } catch (error) {
            Alert.alert('Error', 'Failed to save settings');
        }
    };

    const handleLogin = async () => {
        if (!username || !password) {
            Alert.alert('Error', 'Please enter username and password');
            return;
        }
        dispatch(LoginAction({ username, password }, setLoading, navigation));
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.container}>
                {/* Background Decorative Circle */}
                <View style={styles.bgCircle} />

                <SafeAreaView style={styles.safeArea}>
                    {/* SETTINGS GEAR ICON */}
                    <TouchableOpacity
                        style={styles.settingsIcon}
                        onPress={() => setSettingsVisible(true)}
                    >
                        <Settings size={24} color={colors.textSecondary} />
                    </TouchableOpacity>

                    <KeyboardAvoidingView
                        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                        style={{ flex: 1 }}
                    >
                        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                            {/* Header */}
                            <View style={styles.header}>
                                <View style={styles.logoContainer}>
                                    <Brain size={32} color={colors.primary} />
                                </View>
                                <Text style={styles.title}>Welcome Back</Text>
                                <Text style={styles.subtitle}>Sign in to continue your monitoring.</Text>
                            </View>

                            {/* Form */}
                            <View style={styles.form}>
                                <Input
                                    label="Username"
                                    value={username}
                                    onChangeText={setUsername}
                                    autoCapitalize="none"
                                    placeholder="Enter your username"
                                    containerStyle={styles.inputContainer}
                                />

                                <View style={{ position: 'relative' }}>
                                    <Input
                                        label="Password"
                                        value={password}
                                        onChangeText={setPassword}
                                        secureTextEntry={!showPassword}
                                        placeholder="Enter your password"
                                        containerStyle={styles.inputContainer}
                                    />
                                    <TouchableOpacity
                                        style={styles.eyeIcon}
                                        onPress={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? (
                                            <EyeOff size={20} color={colors.textSecondary} />
                                        ) : (
                                            <Eye size={20} color={colors.textSecondary} />
                                        )}
                                    </TouchableOpacity>
                                </View>

                                <TouchableOpacity style={styles.forgotPassword}>
                                    <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
                                </TouchableOpacity>

                                <Button
                                    title="Log In"
                                    onPress={handleLogin}
                                    loading={loading}
                                    icon={<ArrowRight size={20} color={colors.white} />}
                                    style={styles.loginButton}
                                    textStyle={{ fontSize: 16, fontWeight: '700' }}
                                />

                                <TouchableOpacity style={styles.signUpContainer} onPress={() => navigation.navigate('SignUp')}>
                                    <Text style={styles.signUpText}>
                                        New to Neurosense? <Text style={styles.signUpLink}>Create Account</Text>
                                    </Text>
                                </TouchableOpacity>
                            </View>

                            {/* Footer */}
                            <View style={styles.footer}>
                                <ShieldCheck size={14} color={colors.textSecondary} style={{ marginRight: 6 }} />
                                <Text style={styles.securityText}>CLINICAL GRADE ENCRYPTION</Text>
                            </View>
                        </ScrollView>
                    </KeyboardAvoidingView>
                </SafeAreaView>

                {/* SETTINGS DIALOG (MODAL) */}
                <Modal
                    visible={isSettingsVisible}
                    transparent={true}
                    animationType="fade"
                    onRequestClose={() => setSettingsVisible(false)}
                >
                    <View style={styles.modalOverlay}>
                        <View style={styles.modalContent}>
                            <View style={styles.modalHeader}>
                                <Text style={styles.modalTitle}>Server Settings</Text>
                                <TouchableOpacity onPress={() => setSettingsVisible(false)}>
                                    <X size={20} color={colors.textSecondary} />
                                </TouchableOpacity>
                            </View>

                            <Text style={styles.modalLabel}>API Base URL</Text>
                            <TextInput
                                style={styles.modalInput}
                                value={tempBaseUrl}
                                onChangeText={setTempBaseUrl}
                                placeholder="https://api.yoursite.com"
                                autoCapitalize="none"
                                autoCorrect={false}
                            />

                            <View style={styles.modalActions}>
                                <TouchableOpacity
                                    style={[styles.modalBtn, styles.cancelBtn]}
                                    onPress={() => setSettingsVisible(false)}
                                >
                                    <Text style={styles.cancelBtnText}>Cancel</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={[styles.modalBtn, styles.saveBtn]}
                                    onPress={handleSaveSettings}
                                >
                                    <Text style={styles.saveBtnText}>Save Configuration</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>
            </View>
        </SafeAreaView>
            );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
    },
    safeArea: {
        flex: 1,
    },
    bgCircle: {
        position: 'absolute',
        top: -100,
        alignSelf: 'center',
        width: 600,
        height: 600,
        borderRadius: 300,
        backgroundColor: '#E6F6F4',
        opacity: 0.6,
    },
    settingsIcon: {
        position: 'absolute',
        top: Platform.OS === 'ios' ? 50 : 20,
        right: 20,
        zIndex: 10,
        padding: 8,
    },
    scrollContent: {
        flexGrow: 1,
        padding: spacing.l,
        justifyContent: 'center',
    },
    header: {
        alignItems: 'center',
        marginBottom: 40,
    },
    logoContainer: {
        width: 64,
        height: 64,
        borderRadius: 16,
        backgroundColor: '#D1FAE5',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 24,
    },
    title: {
        fontSize: 32,
        fontWeight: '800',
        color: '#0F172A',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 16,
        color: '#64748B',
        textAlign: 'center',
    },
    form: {
        width: '100%',
    },
    inputContainer: {
        marginBottom: 20,
    },
    eyeIcon: {
        position: 'absolute',
        right: 16,
        top: 38,
        padding: 4,
    },
    forgotPassword: {
        alignSelf: 'flex-end',
        marginBottom: 32,
    },
    forgotPasswordText: {
        color: colors.primary,
        fontWeight: '600',
        fontSize: 14,
    },
    loginButton: {
        height: 56,
        borderRadius: 12,
        flexDirection: 'row-reverse',
        marginBottom: 32,
    },
    signUpContainer: {
        alignItems: 'center',
    },
    signUpText: {
        color: '#64748B',
        fontSize: 14,
    },
    signUpLink: {
        color: colors.primary,
        fontWeight: '700',
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40,
        paddingVertical: 20,
    },
    securityText: {
        fontSize: 10,
        fontWeight: '700',
        color: '#94A3B8',
        letterSpacing: 1,
    },
    // Modal Styles
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    modalContent: {
        width: '100%',
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 24,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#0F172A',
    },
    modalLabel: {
        fontSize: 14,
        fontWeight: '600',
        color: '#64748B',
        marginBottom: 8,
    },
    modalInput: {
        backgroundColor: '#F8FAFC',
        borderWidth: 1,
        borderColor: '#E2E8F0',
        borderRadius: 10,
        padding: 12,
        fontSize: 14,
        color: '#0F172A',
        marginBottom: 24,
    },
    modalActions: {
        flexDirection: 'row',
        gap: 12,
    },
    modalBtn: {
        flex: 1,
        height: 48,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    cancelBtn: {
        backgroundColor: '#F1F5F9',
    },
    cancelBtnText: {
        color: '#64748B',
        fontWeight: '600',
    },
    saveBtn: {
        backgroundColor: colors.primary,
    },
    saveBtnText: {
        color: 'white',
        fontWeight: '700',
    },
});
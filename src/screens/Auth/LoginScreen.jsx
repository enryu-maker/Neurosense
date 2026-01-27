import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert, KeyboardAvoidingView, Platform, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { colors } from '../../constants/colors';
import { spacing } from '../../constants/spacing';
import { typography } from '../../constants/typography';
import { Brain, Eye, EyeOff, ArrowRight, ShieldCheck } from 'lucide-react-native';
import { LoginAction } from '../../store/actions/authAction';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';

export const LoginScreen = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleLogin = async () => {
        if (!username || !password) {
            Alert.alert('Error', 'Please enter username and password');
            return;
        }
        dispatch(LoginAction({ username: username, password: password }, setLoading, navigation))

    };

    const handleGoToSignUp = () => {
        navigation.navigate('SignUp');
    };

    return (
        <View style={styles.container}>
            {/* Background Circle */}
            <View style={styles.bgCircle} />

            <SafeAreaView style={styles.safeArea}>
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

                            <View>
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
                                // loading={isLoading}
                                icon={<ArrowRight size={20} color={colors.white} />}
                                style={styles.loginButton}
                                textStyle={{ fontSize: 16, fontWeight: '700' }}
                            />

                            <TouchableOpacity style={styles.signUpContainer} onPress={handleGoToSignUp}>
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
        </View>
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
        backgroundColor: '#E6F6F4', // Light teal background
        opacity: 0.6,
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
        backgroundColor: '#D1FAE5', // Slightly darker teal for logo bg
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 24,
    },
    title: {
        fontSize: 32,
        fontWeight: '800', // Heavy bold
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
        top: 38, // Adjust based on label height + input padding
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
        flexDirection: 'row-reverse', // To put icon on right
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
        marginTop: 'auto',
        paddingVertical: 20,
    },
    securityText: {
        fontSize: 10,
        fontWeight: '700',
        color: '#94A3B8',
        letterSpacing: 1,
    },
});

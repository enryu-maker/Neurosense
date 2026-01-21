import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert, KeyboardAvoidingView, Platform, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../hooks/useAuth';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { colors } from '../../constants/colors';
import { spacing } from '../../constants/spacing';
import { Brain, Eye, EyeOff, UserPlus, ShieldCheck, User } from 'lucide-react-native';

export const SignUpScreen = () => {
    const { signup, isLoading } = useAuth();
    const navigation = useNavigation();

    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleSignup = async () => {
        if (!username || !password || !name) {
            Alert.alert('Error', 'Please fill in all fields');
            return;
        }
        try {
            await signup(username, password, name);
        } catch (e) {
            Alert.alert('Registration Failed', 'Could not create account');
        }
    };

    const handleGoToLogin = () => {
        navigation.goBack();
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
                            <Text style={styles.title}>Create Account</Text>
                            <Text style={styles.subtitle}>Start your cognitive health journey.</Text>
                        </View>

                        {/* Form */}
                        <View style={styles.form}>
                            <Input
                                label="Full Name"
                                value={name}
                                onChangeText={setName}
                                placeholder="Your full name"
                                containerStyle={styles.inputContainer}
                                icon={<User size={20} color={colors.textSecondary} />}
                            />

                            <Input
                                label="Email / Username"
                                value={username}
                                onChangeText={setUsername}
                                autoCapitalize="none"
                                placeholder="name@example.com"
                                containerStyle={styles.inputContainer}
                            />

                            <View>
                                <Input
                                    label="Password"
                                    value={password}
                                    onChangeText={setPassword}
                                    secureTextEntry={!showPassword}
                                    placeholder="Create a password"
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

                            <Button
                                title="Sign Up"
                                onPress={handleSignup}
                                loading={isLoading}
                                icon={<UserPlus size={20} color={colors.white} />}
                                style={styles.signupButton}
                                textStyle={{ fontSize: 16, fontWeight: '700' }}
                            />

                            <TouchableOpacity style={styles.loginContainer} onPress={handleGoToLogin}>
                                <Text style={styles.loginText}>
                                    Already have an account? <Text style={styles.loginLink}>Log In</Text>
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
        marginBottom: 30,
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
    signupButton: {
        height: 56,
        borderRadius: 12,
        marginTop: 12,
        marginBottom: 24,
    },
    loginContainer: {
        alignItems: 'center',
        padding: 8,
    },
    loginText: {
        color: '#64748B',
        fontSize: 14,
    },
    loginLink: {
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

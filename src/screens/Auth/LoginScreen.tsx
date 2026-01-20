import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../../hooks/useAuth';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { DisclaimerBox } from '../../components/DisclaimerBox';
import { colors } from '../../constants/colors';
import { spacing } from '../../constants/spacing';
import { typography } from '../../constants/typography';
import { User, Lock, Activity } from 'lucide-react-native';

export const LoginScreen = () => {
    const { login, isLoading } = useAuth();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        if (!username || !password) {
            Alert.alert('Error', 'Please enter username and password');
            return;
        }
        try {
            await login(username, password);
        } catch (e) {
            Alert.alert('Login Failed', 'Invalid credentials');
        }
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                style={{ flex: 1 }}
            >
                <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

                    {/* Header Logo Area */}
                    <View style={styles.header}>
                        <View style={styles.logoCircle}>
                            <Activity size={48} color={colors.primary} />
                        </View>
                        <Text style={styles.appName}>Neurosense</Text>
                        <Text style={styles.tagline}>Cognitive Assessment Platform</Text>
                    </View>

                    {/* Form Area */}
                    <View style={styles.form}>
                        <Input
                            label="Username"
                            value={username}
                            onChangeText={setUsername}
                            autoCapitalize="none"
                            placeholder="Enter your username"
                            icon={<User size={20} color={colors.textSecondary} />}
                        />

                        <Input
                            label="Password"
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry
                            placeholder="Enter your password"
                            icon={<Lock size={20} color={colors.textSecondary} />}
                        />

                        <View style={styles.buttonContainer}>
                            <Button
                                title="Sign In"
                                onPress={handleLogin}
                                loading={isLoading}
                                icon={<Lock size={18} color={colors.white} />}
                            />
                        </View>
                    </View>

                    <View style={styles.footer}>
                        <DisclaimerBox />
                        <Text style={styles.version}>v0.0.1 Beta</Text>
                    </View>

                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: colors.background,
    },
    scrollContent: {
        flexGrow: 1,
        padding: spacing.l,
        justifyContent: 'center',
    },
    header: {
        alignItems: 'center',
        marginBottom: spacing.xxl,
    },
    logoCircle: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: 'rgba(45, 127, 249, 0.1)', // Primary with opacity
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: spacing.m,
    },
    appName: {
        ...typography.h1,
        fontSize: 32,
        color: colors.primary,
        marginBottom: spacing.xs,
    },
    tagline: {
        ...typography.body,
        color: colors.textSecondary,
    },
    form: {
        marginBottom: spacing.xl,
    },
    buttonContainer: {
        marginTop: spacing.s,
    },
    footer: {
        marginTop: 'auto',
        alignItems: 'center',
    },
    version: {
        ...typography.caption,
        marginTop: spacing.m,
        color: colors.textSecondary,
    }
});

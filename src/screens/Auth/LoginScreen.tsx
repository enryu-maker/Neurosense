import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../../hooks/useAuth';
import { Button } from '../../components/Button';
import { DisclaimerBox } from '../../components/DisclaimerBox';
import { colors } from '../../constants/colors';
import { spacing } from '../../constants/spacing';
import { typography } from '../../constants/typography';
import { Header } from '../../components/Header';

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
            <View style={styles.container}>
                <Header title="Neurosense" subtitle="Cognitive Assessment Platform" />

                <View style={styles.form}>
                    <Text style={styles.label}>Username</Text>
                    <TextInput
                        style={styles.input}
                        value={username}
                        onChangeText={setUsername}
                        autoCapitalize="none"
                        placeholder="Enter username"
                        placeholderTextColor={colors.textSecondary}
                    />

                    <Text style={styles.label}>Password</Text>
                    <TextInput
                        style={styles.input}
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry
                        placeholder="Enter password"
                        placeholderTextColor={colors.textSecondary}
                    />

                    <View style={styles.buttonContainer}>
                        <Button
                            title="Continue"
                            onPress={handleLogin}
                            loading={isLoading}
                        />
                    </View>
                </View>

                <View style={styles.footer}>
                    <DisclaimerBox />
                </View>
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
        padding: spacing.m,
    },
    form: {
        marginTop: spacing.xl,
        flex: 1,
    },
    label: {
        ...typography.body,
        fontWeight: '600',
        marginBottom: spacing.xs,
        color: colors.text,
    },
    input: {
        backgroundColor: colors.white,
        borderWidth: 1,
        borderColor: colors.border,
        borderRadius: spacing.s,
        padding: spacing.m,
        marginBottom: spacing.m,
        ...typography.body,
    },
    buttonContainer: {
        marginTop: spacing.m,
    },
    footer: {
        paddingVertical: spacing.l,
    },
});

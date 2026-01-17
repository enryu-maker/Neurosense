import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, Pressable, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { DashboardStackParamList } from '../../../types/navigation.types';
import { Button } from '../../../components/Button';
import { colors } from '../../../constants/colors';
import { spacing } from '../../../constants/spacing';
import { typography } from '../../../constants/typography';
import { assessmentApi } from '../../../api/assessment.mock';
import { mockDelay } from '../../../services/mockDelay.service';

type NavigationProp = NativeStackNavigationProp<DashboardStackParamList>;

export const BrainMRIUploadScreen = () => {
    const navigation = useNavigation<NavigationProp>();
    const [imageUri, setImageUri] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handlePickImage = async () => {
        // Mock image picker
        await mockDelay(500);
        setImageUri('https://via.placeholder.com/300'); // Mock image
    };

    const handleSubmit = async () => {
        if (!imageUri) return;
        setIsSubmitting(true);
        try {
            const result = await assessmentApi.submitMRI(imageUri);
            navigation.replace('Result', { assessmentType: 'mri', result });
        } catch (e) {
            Alert.alert('Error', 'Submission failed');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Upload Brain MRI</Text>
            <Text style={styles.description}>
                Please upload a recent MRI scan (DICOM or JPG format) for analysis.
            </Text>

            <Pressable onPress={handlePickImage} style={styles.uploadArea}>
                {imageUri ? (
                    <Image source={{ uri: imageUri }} style={styles.previewImage} resizeMode="contain" />
                ) : (
                    <View style={styles.placeholder}>
                        <Text style={styles.placeholderText}>Tap to Select Image</Text>
                    </View>
                )}
            </Pressable>

            <View style={styles.footer}>
                <Button
                    title={imageUri ? "Change Image" : "Select Image"}
                    onPress={handlePickImage}
                    variant="outline"
                    disabled={isSubmitting}
                />
                <View style={styles.spacer} />
                <Button
                    title="Submit for Analysis"
                    onPress={handleSubmit}
                    disabled={!imageUri}
                    loading={isSubmitting}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
        padding: spacing.m,
    },
    title: {
        ...typography.h2,
        marginTop: spacing.xl,
        textAlign: 'center',
    },
    description: {
        ...typography.body,
        textAlign: 'center',
        marginVertical: spacing.m,
        color: colors.textSecondary,
    },
    uploadArea: {
        flex: 1,
        marginVertical: spacing.l,
        backgroundColor: colors.card,
        borderRadius: spacing.m,
        borderWidth: 2,
        borderColor: colors.border,
        borderStyle: 'dashed',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
    },
    placeholder: {
        alignItems: 'center',
    },
    placeholderText: {
        ...typography.button,
        color: colors.primary,
    },
    previewImage: {
        width: '100%',
        height: '100%',
    },
    footer: {
        paddingBottom: spacing.l,
    },
    spacer: {
        height: spacing.s,
    },
});

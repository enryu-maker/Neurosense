import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Alert, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { launchCamera } from 'react-native-image-picker'; // Added this
import {
    ArrowLeft,
    HelpCircle,
    Camera,
    FileText
} from 'lucide-react-native';

import { useSpiral } from '../../../hooks/useSpiral';
import { Button } from '../../../components/Button';
import { colors } from '../../../constants/colors';
import { spacing } from '../../../constants/spacing';

export const SpiralCanvasScreen = () => {
    const navigation = useNavigation();
    const [capturedImage, setCapturedImage] = useState<string | null>(null);

    const { submit, isSubmitting } = useSpiral();

    const handleCameraCapture = async () => {
        const options = {
            mediaType: 'photo' as const,
            quality: 0.8,
            saveToPhotos: false, // Set to true if you want to keep a copy in the gallery
            cameraType: 'back' as const,
        };

        launchCamera(options, (response) => {
            if (response.didCancel) {
                console.log('User cancelled camera');
            } else if (response.errorCode) {
                Alert.alert('Camera Error', response.errorMessage);
            } else if (response.assets && response.assets.length > 0) {
                // Get the URI of the photo taken
                const uri = response.assets[0].uri;
                if (uri) setCapturedImage(uri);
            }
        });
    };

    const handleSubmit = async () => {
        if (capturedImage) {
            await submit(capturedImage);
        }
    };

    // ... renderHeader remains the same ...
    const renderHeader = () => (
        <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                <ArrowLeft size={24} color={colors.text} />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>SPIRAL TEST</Text>
            <TouchableOpacity>
                <HelpCircle size={24} color={colors.textSecondary} />
            </TouchableOpacity>
        </View>
    );

    return (
        <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
            {renderHeader()}

            <View style={styles.contentContainer}>
                <View style={styles.instructionsContainer}>
                    <Text style={styles.title}>Upload Physical Drawing</Text>
                    <Text style={styles.subtitle}>
                        Please draw the spiral on a blank white sheet of paper using a dark pen.
                    </Text>
                </View>

                {/* Image Placeholder / Preview Area */}
                <View style={styles.previewContainer}>
                    {capturedImage ? (
                        <Image source={{ uri: capturedImage }} style={styles.previewImage} />
                    ) : (
                        <View style={styles.placeholderBox}>
                            <FileText size={48} color="#CBD5E1" strokeWidth={1.5} />
                            <Text style={styles.placeholderText}>No photo captured yet</Text>
                        </View>
                    )}
                </View>

                {/* Requirements List */}
                <View style={styles.requirementsBox}>
                    <Text style={styles.requirementsTitle}>For best results:</Text>
                    <Text style={styles.requirementItem}>• Use plain white A4 paper</Text>
                    <Text style={styles.requirementItem}>• Use a black or dark blue pen</Text>
                    <Text style={styles.requirementItem}>• Ensure the area is well-lit</Text>
                </View>

                <View style={styles.footer}>
                    {!capturedImage ? (
                        <Button
                            title="Take Photo"
                            onPress={handleCameraCapture}
                            variant="primary"
                            icon={<Camera size={20} color={colors.white} />}
                            style={styles.mainButton}
                        />
                    ) : (
                        <View style={styles.actionRow}>
                            <Button
                                title="Retake"
                                onPress={() => setCapturedImage(null)}
                                variant="outline"
                                style={styles.flexButton}
                            />
                            <Button
                                title="Submit Analysis"
                                onPress={handleSubmit}
                                loading={isSubmitting}
                                variant="primary"
                                style={styles.flexButton}
                            />
                        </View>
                    )}
                    <Text style={styles.calibrationText}>CALIBRATED FOR CLINICAL TREMOR MONITORING V4.2</Text>
                </View>
            </View>
        </SafeAreaView>
    );
};

// ... styles remain the same ...
const styles = StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: colors.background },
    header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: spacing.m, paddingVertical: spacing.s },
    headerTitle: { fontSize: 12, fontWeight: '700', color: '#94A3B8', letterSpacing: 1 },
    backButton: { padding: 4 },
    contentContainer: { flex: 1, paddingHorizontal: spacing.l, alignItems: 'center' },
    instructionsContainer: { marginTop: spacing.xl, marginBottom: spacing.l, alignItems: 'center' },
    title: { fontSize: 22, fontWeight: '700', color: '#0F172A', textAlign: 'center', marginBottom: 8 },
    subtitle: { fontSize: 14, color: '#64748B', textAlign: 'center', lineHeight: 20 },
    previewContainer: { width: '100%', aspectRatio: 1, backgroundColor: '#F8FAFC', borderRadius: 16, borderWidth: 2, borderColor: '#E2E8F0', borderStyle: 'dashed', overflow: 'hidden', justifyContent: 'center', alignItems: 'center' },
    previewImage: { width: '100%', height: '100%', resizeMode: 'contain' }, // Changed to contain to see full paper
    placeholderBox: { alignItems: 'center', gap: 12 },
    placeholderText: { color: '#94A3B8', fontSize: 14, fontWeight: '500' },
    requirementsBox: { width: '100%', marginTop: spacing.l, padding: spacing.m, backgroundColor: '#F1F5F9', borderRadius: 12 },
    requirementsTitle: { fontSize: 14, fontWeight: '700', color: '#475569', marginBottom: 4 },
    requirementItem: { fontSize: 13, color: '#64748B', lineHeight: 20 },
    footer: { flex: 1, width: '100%', justifyContent: 'flex-end', paddingBottom: spacing.l },
    mainButton: { height: 56, borderRadius: 12 },
    actionRow: { flexDirection: 'row', gap: 12 },
    flexButton: { flex: 1, height: 56, borderRadius: 12 },
    calibrationText: { textAlign: 'center', fontSize: 10, color: '#94A3B8', fontWeight: '600', marginTop: 16 },
});
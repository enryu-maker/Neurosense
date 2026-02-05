import React from 'react';
import { View, StyleSheet, useWindowDimensions, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import ViewShot from 'react-native-view-shot';
import { useRef } from 'react';
import {
    ArrowLeft,
    HelpCircle,
    RotateCcw, // For Undo/Reset
    Circle // For Recording Badge
} from 'lucide-react-native';

import { useSpiral } from '../../../hooks/useSpiral';
import { SpiralCanvas } from '../../../modules/spiral/SpiralCanvas';
import { Button } from '../../../components/Button';
import { colors } from '../../../constants/colors';
import { spacing } from '../../../constants/spacing';
import { typography } from '../../../constants/typography';

export const SpiralCanvasScreen = () => {
    const navigation = useNavigation();
    const {
        points,
        startDrawing,
        addPoint,
        stopDrawing,
        clear,
        submit,
        isSubmitting,
        hasDrawing
    } = useSpiral();

    const { width } = useWindowDimensions();
    // Slightly smaller canvas to fit padding and border
    const canvasSize = width - spacing.xl * 2;
    const viewShotRef = useRef<ViewShot>(null);

    const handleSubmit = async () => {
        if (viewShotRef.current) {
            try {
                const uri = await viewShotRef.current?.capture();
                if (uri) {
                    await submit(uri);
                }
            } catch (error) {
                console.error("Failed to capture spiral", error);
            }
        }
    };

    const renderHeader = () => (
        <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                <ArrowLeft size={24} color={colors.text} />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>ASSESSMENT</Text>
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
                    <Text style={styles.title}>Trace the spiral as accurately as you can</Text>
                    <Text style={styles.subtitle}>
                        Rest your arm on a flat surface. Start from the center and follow the line outward.
                    </Text>
                </View>

                {/* Canvas Container with Dashed Border */}
                <View style={[styles.canvasContainer, { width: canvasSize + 4, height: canvasSize + 4 }]}>
                    <ViewShot ref={viewShotRef} options={{ format: 'jpg', quality: 0.9 }}>
                        <SpiralCanvas
                            width={canvasSize}
                            height={canvasSize}
                            points={points}
                            onStart={startDrawing}
                            onMove={addPoint}
                            onEnd={stopDrawing}
                        />
                    </ViewShot>

                    {/* Recording Badge Overlay Removed per user request */}
                </View>

                {/* Footer Controls */}
                <View style={styles.footer}>
                    <Button
                        title="Submit Analysis"
                        onPress={handleSubmit}
                        disabled={!hasDrawing}
                        loading={isSubmitting}
                        variant="primary"
                        style={styles.submitButton}
                    />

                    <View style={styles.secondaryControls}>
                        <Button
                            title="Clear"
                            variant="outline"
                            onPress={clear}
                            disabled={!hasDrawing || isSubmitting}
                            style={styles.clearButton}
                            textStyle={{
                                color: colors.textSecondary,
                                includeFontPadding: false,
                                textAlignVertical: 'center',
                            }}
                        />

                        {/* <TouchableOpacity
                            style={[styles.iconButton, (!hasDrawing || isSubmitting) && styles.iconButtonDisabled]}
                            onPress={clear} // Usually Undo, but for now acting as clear/reset
                            disabled={!hasDrawing || isSubmitting}
                        >
                            <RotateCcw size={20} color={colors.textSecondary} />
                        </TouchableOpacity> */}
                    </View>

                    <Text style={styles.calibrationText}>CALIBRATED FOR CLINICAL TREMOR MONITORING V4.2</Text>
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
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: spacing.m,
        paddingVertical: spacing.s,
    },
    backButton: {
        padding: 4,
    },
    headerTitle: {
        fontSize: 12,
        fontWeight: '700',
        color: '#94A3B8', // Grey caps
        letterSpacing: 1,
    },
    contentContainer: {
        flex: 1,
        alignItems: 'center',
        paddingHorizontal: spacing.l,
    },
    instructionsContainer: {
        marginTop: spacing.xl,
        marginBottom: spacing.xxl,
        alignItems: 'center',
    },
    title: {
        fontSize: 22,
        fontWeight: '700',
        color: '#0F172A',
        textAlign: 'center',
        marginBottom: 8,
        lineHeight: 28,
    },
    subtitle: {
        fontSize: 14,
        color: '#64748B', // Slate
        textAlign: 'center',
        lineHeight: 20,
        paddingHorizontal: spacing.s,
    },
    canvasContainer: {
        borderWidth: 2,
        borderColor: '#E2E8F0',
        borderStyle: 'dashed',
        borderRadius: 16,
        padding: 2, // Gap for dashed border
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F8FAFC', // Very light background for canvas area
        position: 'relative',
    },
    footer: {
        flex: 1,
        width: '100%',
        justifyContent: 'flex-end',
        paddingBottom: spacing.l,
        gap: 16,
    },
    submitButton: {
        width: '100%',
        borderRadius: 8, // Square-ish look per design
        height: 48,
    },
    secondaryControls: {
        flexDirection: 'row',
        gap: 12,
    },
    clearButton: {
        flex: 1,
        borderRadius: 8,
        height: 48,
        borderWidth: 1,
        borderColor: '#E2E8F0',
    },
    iconButton: {
        width: 48,
        height: 48,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#E2E8F0',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.white,
    },
    iconButtonDisabled: {
        opacity: 0.5,
        backgroundColor: '#F1F5F9',
    },
    calibrationText: {
        textAlign: 'center',
        fontSize: 10,
        color: '#94A3B8',
        fontWeight: '600',
        letterSpacing: 0.5,
        marginTop: 8,
    },
});

import React from 'react';
import { View, StyleSheet, useWindowDimensions, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSpiral } from '../../../hooks/useSpiral';
import { SpiralCanvas } from '../../../modules/spiral/SpiralCanvas';
import { Button } from '../../../components/Button';
import { colors } from '../../../constants/colors';
import { spacing } from '../../../constants/spacing';
import { typography } from '../../../constants/typography';

import ViewShot from 'react-native-view-shot';
import { useRef } from 'react';

export const SpiralCanvasScreen = () => {
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
    const canvasSize = width - spacing.m * 2;
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

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                <Text style={styles.instructions}>Trace the spiral below</Text>

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

                <View style={styles.controls}>
                    <View style={{ flex: 1 }}>
                        <Button
                            title="Clear"
                            variant="outline"
                            onPress={clear}
                            disabled={!hasDrawing || isSubmitting}
                        />
                    </View>
                    <View style={styles.spacer} />
                    <View style={{ flex: 1 }}>
                        <Button
                            title="Submit"
                            onPress={handleSubmit}
                            disabled={!hasDrawing}
                            loading={isSubmitting}
                        />
                    </View>
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
        alignItems: 'center',
        justifyContent: 'center',
    },
    instructions: {
        ...typography.h2,
        marginBottom: spacing.l,
        textAlign: 'center',
    },
    controls: {
        width: '100%',
        marginTop: spacing.xl,
        flexDirection: 'row',
    },
    spacer: {
        width: spacing.m,
    },
});

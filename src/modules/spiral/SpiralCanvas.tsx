import React, { useMemo, useRef } from 'react';
import { View, StyleSheet, PanResponder } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { colors } from '../../constants/colors';
import { generateReferenceSpiral, pointsToPath } from './spiral.utils';
import { Point } from '../../hooks/useSpiral';

interface SpiralCanvasProps {
    points: Point[];
    onStart: (x: number, y: number) => void;
    onMove: (x: number, y: number) => void;
    onEnd: () => void;
    width?: number;
    height?: number;
}

export const SpiralCanvas: React.FC<SpiralCanvasProps> = ({
    points,
    onStart,
    onMove,
    onEnd,
    width = 300,
    height = 300,
}) => {
    const referencePath = useMemo(() =>
        generateReferenceSpiral(width / 2, height / 2, Math.min(width, height) / 2 - 30, 3),
        [width, height]);

    const panResponder = useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onMoveShouldSetPanResponder: () => true,
            onPanResponderGrant: (evt) => {
                const { locationX, locationY } = evt.nativeEvent;
                onStart(locationX, locationY);
            },
            onPanResponderMove: (evt) => {
                const { locationX, locationY } = evt.nativeEvent;
                onMove(locationX, locationY);
            },
            onPanResponderRelease: () => {
                onEnd();
            },
        })
    ).current;

    return (
        <View style={[styles.container, { width, height }]} {...panResponder.panHandlers}>
            <Svg width={width} height={height}>
                {/* Reference Spiral */}
                <Path
                    d={referencePath}
                    stroke={colors.spiral}
                    strokeWidth={15}
                    fill="none"
                    strokeLinecap="round"
                />
                {/* User Drawing */}
                <Path
                    d={pointsToPath(points)}
                    stroke={colors.drawing}
                    strokeWidth={4}
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </Svg>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        alignSelf: 'center',
        borderRadius: 8,
        // Ensure touches are captured inside
        overflow: 'hidden',
        borderColor: colors.border,
        borderWidth: 1,
    },
});

import { useState } from 'react';
import { assessmentApi } from '../api/assessment.mock';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { DashboardStackParamList } from '../types/navigation.types';
import { useDispatch, useSelector } from 'react-redux';
import { postSpiralImage } from '../store/actions/homeAction';

export interface Point {
    x: number;
    y: number;
    timestamp: number;
}

export const useSpiral = () => {
    const navigation = useNavigation<NativeStackNavigationProp<DashboardStackParamList>>();
    const dispatch = useDispatch();
    const token = useSelector((state: any) => state.reducer.access);
    const [loading, setLoading] = useState(false);
    const [points, setPoints] = useState<Point[]>([]);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const startDrawing = (x: number, y: number) => {
        setPoints([{ x, y, timestamp: Date.now() }]);
    };

    const addPoint = (x: number, y: number) => {
        setPoints((prev) => [...prev, { x, y, timestamp: Date.now() }]);
    };

    const stopDrawing = () => {
        // Can validate drawing length here
    };

    const clear = () => {
        setPoints([]);
    };

    const submit = async (imageUri: string) => {
        if (points.length <= 20 || isSubmitting) return;
        setIsSubmitting(true);
        try {
            const formData = new FormData();
            formData.append('image', {
                uri: imageUri,
                name: 'spiral.jpg',
                type: 'image/jpeg',
            } as any);

            dispatch(postSpiralImage(formData, setLoading, navigation, token));
        } catch (error) {
            console.error(error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return {
        points,
        startDrawing,
        addPoint,
        stopDrawing,
        clear,
        submit,
        isSubmitting,
        hasDrawing: points.length > 20, // Threshold for valid drawing
    };
};

import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { DashboardStackParamList } from '../types/navigation.types';
import { useDispatch, useSelector } from 'react-redux';
import { postSpiralImage } from '../store/actions/homeAction';

export const useSpiral = () => {
    const navigation = useNavigation<NativeStackNavigationProp<DashboardStackParamList>>();
    const dispatch = useDispatch();

    // Selecting token from your existing Redux structure
    const token = useSelector((state: any) => state.reducer.access);

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [loading, setLoading] = useState(false); // Used by the dispatch action

    /**
     * Submits the captured camera image to the backend
     * @param imageUri - The local URI from the camera/gallery
     */
    const submit = async (imageUri: string) => {
        if (!imageUri || isSubmitting) return;

        setIsSubmitting(true);
        try {
            const formData = new FormData();

            // Appending the image file for multipart/form-data upload
            formData.append('image', {
                uri: imageUri,
                name: 'spiral_capture.jpg',
                type: 'image/jpeg',
            } as any);

            // Using your existing action creator
            await dispatch(postSpiralImage(formData, setLoading, navigation, token));
        } catch (error) {
            console.error("Submission error:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return {
        submit,
        isSubmitting,
        loading, // Internal loading state if needed by the UI
    };
};
import axios from "axios";
import axiosIns, { baseURL } from "../../constants/helper";
import { ToastAndroid } from "react-native";


export const postQuiz = (data: any, setLoading: any, navigate: any) => {
    return async (dispatch: any) => {
        try {
            await axiosIns.post('/assessments/quiz/', data)
                .then((res: any) => {
                    console.log("APIresult", res?.data);
                    ToastAndroid.show(res?.data?.message || "Assesment Done successfully", ToastAndroid.LONG);
                    setLoading(false);
                    navigate.replace('Result', { assessmentType: 'quiz', result: res?.data });
                })
                .catch((err: any) => {
                    console.log(err);
                    ToastAndroid.show(err?.response?.data?.detail || "Something went wrong!", ToastAndroid.LONG);
                    setLoading(false);
                });
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };
}

// Api for posting spiral image with multipart/form-data

export const postSpiralImage = (data: any, setLoading: any, navigate: any) => {
    return async (dispatch: any) => {
        setLoading(true);

        try {
            const res = await axiosIns.post(
                '/assessments/spiral/',
                data,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    }
                }
            );

            console.log('APIresult', res.data);

            ToastAndroid.show(
                res?.data?.result || 'Assessment Done successfully',
                ToastAndroid.LONG
            );

            navigate.replace('Result', {
                assessmentType: 'spiral',
                result: res.data,
            });

        } catch (err: any) {
            console.log('Upload error:', err);

            ToastAndroid.show(
                err?.response?.data?.detail || 'Network error',
                ToastAndroid.LONG
            );
        } finally {
            setLoading(false);
        }
    };
};


// Voice Analysis

export const postVoiceAnalysis = (data: any, setLoading: any, navigate: any) => {
    return async (dispatch: any) => {
        setLoading(true);

        try {
            const res = await axiosIns.post(
                '/assessments/voice/',
                data,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    }
                }
            );

            console.log('APIresult', res.data);

            ToastAndroid.show(
                res?.data?.result || 'Assessment Done successfully',
                ToastAndroid.LONG
            );

            navigate.replace('Result', {
                assessmentType: 'spiral',
                result: res.data,
            });

        } catch (err: any) {
            console.log('Upload error:', err);

            ToastAndroid.show(
                err?.response?.data?.detail || 'Network error',
                ToastAndroid.LONG
            );
        } finally {
            setLoading(false);
        }
    };
};

// mri analysis

export const postMriAnalysis = (data: any, setLoading: any, navigate: any) => {
    return async (dispatch: any) => {
        setLoading(true);

        try {
            const res = await axiosIns.post(
                '/assessments/brain/',
                data,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    }
                }
            );

            console.log('APIresult', res.data);

            ToastAndroid.show(
                res?.data?.result || 'Assessment Done successfully',
                ToastAndroid.LONG
            );

            navigate.replace('Result', {
                assessmentType: 'brain',
                result: res.data,
            });

        } catch (err: any) {
            console.log('Upload error:', err);

            ToastAndroid.show(
                err?.response?.data?.detail || 'Network error',
                ToastAndroid.LONG
            );
        } finally {
            setLoading(false);
        }
    };
};

// get profile

export const getProfile = (setLoading: any) => {
    return async (dispatch: any) => {
        setLoading(true);

        try {
            const res = await axiosIns.get('/profile/');

            console.log('APIresult', res.data);

            dispatch({
                type: 'SET_PROFILE',
                payload: res.data,
            })

        } catch (err: any) {
            console.log('Upload error:', err);

            ToastAndroid.show(
                err?.response?.data?.detail || 'Network error',
                ToastAndroid.LONG
            );
        } finally {
            setLoading(false);
        }
    };
};

// get history

export const getHistory = (setLoading: any) => {
    return async (dispatch: any) => {
        setLoading(true);

        try {
            const res = await axiosIns.get('/history/');

            console.log('APIresult', res.data);

            dispatch({
                type: 'SET_HISTORY',
                payload: res.data,
            })

        } catch (err: any) {
            console.log('Upload error:', err);

            ToastAndroid.show(
                err?.response?.data?.detail || 'Network error',
                ToastAndroid.LONG
            );
        } finally {
            setLoading(false);
        }
    };
};






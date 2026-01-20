import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HistoryStackParamList } from './navigation.types';
import { HistoryListScreen } from '../screens/History/HistoryListScreen';
import { HistoryDetailScreen } from '../screens/History/HistoryDetailScreen';

const Stack = createNativeStackNavigator<HistoryStackParamList>();

export const HistoryStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="HistoryList" component={HistoryListScreen} options={{ headerShown: false }} />
            <Stack.Screen name="HistoryDetail" component={HistoryDetailScreen} options={{ title: 'Assessment Details' }} />
        </Stack.Navigator>
    );
};

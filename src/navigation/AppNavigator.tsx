import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AppTabParamList } from './navigation.types';
import { DashboardStack } from './DashboardStack';
import { HistoryStack } from './HistoryStack';

const Tab = createBottomTabNavigator<AppTabParamList>();

export const AppNavigator = () => {
    return (
        <Tab.Navigator screenOptions={{ headerShown: false }}>
            <Tab.Screen name="DashboardTab" component={DashboardStack} options={{ title: 'Dashboard' }} />
            <Tab.Screen name="HistoryTab" component={HistoryStack} options={{ title: 'History' }} />
        </Tab.Navigator>
    );
};

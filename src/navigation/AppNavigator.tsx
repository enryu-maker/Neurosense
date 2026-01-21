import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AppTabParamList } from './navigation.types';
import { DashboardStack } from './DashboardStack';
import { HistoryStack } from './HistoryStack';

import { HomeScreen } from '../screens/Home/HomeScreen';
import { colors } from '../constants/colors';
import { ProfileScreen } from '../screens/Profile/ProfileScreen';
import { Home, LayoutDashboard, History, User } from 'lucide-react-native';

const Tab = createBottomTabNavigator<AppTabParamList>();

export const AppNavigator = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarActiveTintColor: colors.primary,
                tabBarInactiveTintColor: colors.textSecondary,
                tabBarStyle: {
                    borderTopWidth: 0,
                    elevation: 10,
                    shadowColor: colors.shadow,
                    shadowOpacity: 0.1,
                    shadowRadius: 10,
                    height: 64,
                    paddingBottom: 8,
                    paddingTop: 8,
                    backgroundColor: colors.card,
                },
                tabBarIcon: ({ color, size }) => {
                    if (route.name === 'HomeTab') {
                        return <Home size={size} color={color} />;
                    } else if (route.name === 'DashboardTab') {
                        return <LayoutDashboard size={size} color={color} />;
                    } else if (route.name === 'HistoryTab') {
                        return <History size={size} color={color} />;
                    } else if (route.name === 'ProfileTab') {
                        return <User size={size} color={color} />;
                    }
                },
                tabBarLabelStyle: {
                    fontSize: 12,
                    fontWeight: '500',
                }
            })}
        >
            <Tab.Screen
                name="HomeTab"
                component={HomeScreen}
                options={{ title: 'Home' }}
            />
            <Tab.Screen
                name="DashboardTab"
                component={DashboardStack}
                options={{ title: 'Progress' }}
            />
            <Tab.Screen
                name="HistoryTab"
                component={HistoryStack}
                options={{ title: 'Insights' }}
            />
            <Tab.Screen
                name="ProfileTab"
                component={ProfileScreen}
                options={{ title: 'Profile' }}
            />
        </Tab.Navigator>
    );
};

import React from 'react';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { RootNavigator } from './navigation/RootNavigator';
import { Provider } from 'react-redux';
import { store } from './store';
import { StatusBar } from 'react-native';

const App = (): React.JSX.Element => {
    return (
        <SafeAreaProvider>
            <Provider store={store}>
                <StatusBar barStyle="dark-content" backgroundColor="#fff" />
                <RootNavigator />
            </Provider>
        </SafeAreaProvider>
    );
};

export default App;

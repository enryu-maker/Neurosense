import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { RootNavigator } from './navigation/RootNavigator';
import { Provider } from 'react-redux';
import { store } from './store';

const App = (): React.JSX.Element => {
    return (
        <SafeAreaProvider>
            <Provider store={store}>
                <RootNavigator />
            </Provider>
        </SafeAreaProvider>
    );
};

export default App;

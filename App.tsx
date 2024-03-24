/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useCallback, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './src/pages/login';
import Register from './src/pages/register';
import Home from './src/pages/home';
import CreateTimeSheet from './src/pages/createtimesheet';
import TimesheetList from './src/pages/timesheetlist';
import EditTimeSheet from './src/pages/edittimesheet';
import { StyleSheet } from 'react-native';
import { getDBConnection, createTable } from './src/db/db-service';
import { store } from './src/store/configureStore';
import { Provider } from 'react-redux';

const Stack = createNativeStackNavigator();

function App(): React.JSX.Element {
  const loadDataCallback = useCallback(async () => {
    try {
      const db = await getDBConnection();
      await createTable(db);

    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    loadDataCallback();
  }, [loadDataCallback]);

  // The navigation stack for the app
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
            <Stack.Screen name="Login" component={Login} options={{ title: "Login" }} />
            <Stack.Screen name="Register" component={Register} options={{ title: "Registration" }} />
            <Stack.Screen name="Home" component={Home} options={{ title: "Timesheet" }} />
            <Stack.Screen name="CreateTimesheet" component={CreateTimeSheet} options={{ title: "New Time Sheet" }} />
            <Stack.Screen name="TimesheetList" component={TimesheetList} options={{ title: "Timesheet List" }} />
            <Stack.Screen name="EditTimesheet" component={EditTimeSheet} options={{ title: "Edit Timesheet" }} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  )
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;

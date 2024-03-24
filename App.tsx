/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useCallback, useEffect, useState } from 'react';
import type {PropsWithChildren} from 'react';
import { NavigationContainer, createNavigationContainerRef } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './src/pages/login';
import Register from './src/pages/register';
import Home from './src/pages/home';
import CreateTimeSheet from './src/pages/createtimesheet';
import TimesheetList from './src/pages/timesheetlist';
import EditTimeSheet from './src/pages/edittimesheet';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import { getDBConnection, saveUserData, getUserData, createTable } from './src/db/db-service';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import { UserData } from './src/models/models';

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

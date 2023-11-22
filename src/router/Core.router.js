import React, { Fragment, useEffect } from 'react';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LogBox, StatusBar, Alert } from 'react-native';
import { Provider } from 'react-redux';
import Redux from '../configs/redux/Redux.config';
import {
  navigationRef,
  isReadyRef,
} from '../libs/helpers/RootNavigation';
import Home from '../screens/Home.screens';
import TakePicture from '../screens/TakePicture.screens';


const Stack = createNativeStackNavigator();

const Core = () => {
  LogBox.ignoreAllLogs(true);

  useEffect(() => {
    return () => {
      isReadyRef.current = false;
    };
  }, []);

  return (
    <Fragment>
      <Provider store={Redux}>
        <StatusBar backgroundColor={'#467D7F '} translucent={false} />

        <NavigationContainer
          ref={navigationRef}
          onReady={() => {
            isReadyRef.current = true;
          }}>
          <Stack.Navigator
            initialRouteName="Home"
            screenOptions={{
              headerShown: true,
              animation: 'none',
            }}>
            <Stack.Screen
              name="Home"
              component={Home}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="TakePicture"
              component={TakePicture}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    </Fragment>
  );
};

export default Core;

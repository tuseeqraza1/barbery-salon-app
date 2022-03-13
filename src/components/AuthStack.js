import 'react-native-gesture-handler';
import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import WelcomeScreen from '../screen/BarberSide/WelcomeScreen';
import LoginScreen from '../screen/BarberSide/LoginScreen';
import RegisterScreen from '../screen/BarberSide/RegisterScreen';
import ForgetScreen from '../screen/BarberSide/ForgetScreen';
import MainApp from './BarberStack';

const Stack = createStackNavigator();

export default class AuthStack extends Component {
	render() {
		return (
			<NavigationContainer>
				<Stack.Navigator>
					<Stack.Screen
						name="Welcome"
						component={WelcomeScreen}
						options={{
							headerShown: false,
						}}
					/>
					<Stack.Screen
						name="Login"
						component={LoginScreen}
						options={{
							headerShown: false,
						}}
					/>
					<Stack.Screen
						name="Forget"
						component={ForgetScreen}
						options={{
							headerShown: false,
						}}
					/>
					<Stack.Screen
						name="Register"
						component={RegisterScreen}
						options={{
							headerShown: false,
						}}
					/>
					<Stack.Screen
						name="MainApp"
						component={MainApp}
						options={{
							headerShown: false,
						}}
					/>
				</Stack.Navigator>
			</NavigationContainer>
		);
	}
}

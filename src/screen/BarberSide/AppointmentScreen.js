import React, { useState } from 'react';
import {
	View,
	TextInput,
	FlatList,
	Button,
	TouchableOpacity,
	StyleSheet,
} from 'react-native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useIsFocused } from '@react-navigation/native';

import LoadingIndicator from '../../components/LoadingIndicator';
import Card from '../../components/AppointmentCard';
import colors from '../../styles/colors';
import axios from '../../../config';
import { useEffect } from 'react';

function ActiveAppointmentsScreen(props) {
	return (
		<View style={styles.screen}>
			{props?.loading && <LoadingIndicator />}
			<FlatList
				contentContainerStyle={{ paddingBottom: 15 }}
				style={styles.flatScreen}
				data={props?.appointment}
				keyExtractor={(appointment) => appointment.id.toString()}
				renderItem={({ item }) => (
					<Card
						title={item.title}
						subTitle={'Rs.' + item.price}
						time={`${item.date} / ${item.time}`}
						status={item.status}
						image={item.image}
						onPress={() =>
							props.navigation.navigate('Appointment Details', {
								item,
								update: props?.update,
							})
						}
					/>
				)}
			/>
		</View>
	);
}

function CompletedAppointmentsScreen(props) {
	return (
		<View style={styles.screen}>
			{props?.loading && <LoadingIndicator />}
			<FlatList
				contentContainerStyle={{ paddingBottom: 15 }}
				style={styles.flatScreen}
				data={props?.appointment}
				keyExtractor={(appointment) => appointment.id.toString()}
				renderItem={({ item }) => (
					<Card
						title={item.title}
						subTitle={'Rs.' + item.price}
						time={`${item.date} / ${item.time}`}
						status={item.status}
						image={item.image}
						onPress={() =>
							props.navigation.navigate('Appointment Details', { item })
						}
					/>
				)}
			/>
		</View>
	);
}

const Tab = createMaterialBottomTabNavigator();

export default function AppointmentScreen(props) {
	const [appointments, setAppointments] = useState([]);
	const [completed, setCompleted] = useState([]);
	const [active, setActive] = useState([]);
	const [loading, setLoading] = useState(true);

	const isFocused = useIsFocused();

	useEffect(() => {
		if (isFocused) {
			setLoading(true);
			axios.get('/appointment/barber').then((res) => {
				setAppointments(
					res.data.map((SS) => ({
						title: SS?.user?.firstName,
						image: `data:${SS?.user?.image?.type};base64,${SS?.user?.image?.data}`,
						status: SS?.status,
						price: SS?.bill,
						time: SS?.timing,
						date: SS?.date?.split('T')[0],
						id: SS?._id,
						specialist: SS?.specialist,
						services: SS?.services,
						promo: SS?.promo,
						bill: SS?.bill,
						review: SS?.review,
					})),
				);
				setLoading(false);
			});
		}
		return () => {};
	}, [isFocused]);

	useEffect(() => {
		setActive(appointments.filter((val) => val?.status));
		setCompleted(appointments.filter((val) => !val?.status));

		return () => {};
	}, [appointments]);

	return (
		<Tab.Navigator
			initialRouteName="Active"
			activeColor={colors.white}
			inactiveColor={colors.lightRed}
			barStyle={{ backgroundColor: colors.red }}
		>
			<Tab.Screen
				name="Active"
				// component={ActiveAppointmentsScreen}
				options={{
					tabBarLabel: 'Active',
					tabBarIcon: ({ color }) => (
						<Icon name="history" color={color} size={20} />
					),
				}}
			>
				{(props) => (
					<ActiveAppointmentsScreen
						{...props}
						appointment={active}
						loading={loading}
					/>
				)}
			</Tab.Screen>
			<Tab.Screen
				name="Completed"
				// component={CompletedAppointmentsScreen}
				options={{
					tabBarLabel: 'Completed',
					tabBarIcon: ({ color }) => (
						<Icon name="check" color={color} size={20} />
					),
				}}
			>
				{(props) => (
					<CompletedAppointmentsScreen
						{...props}
						appointment={completed}
						loading={loading}
					/>
				)}
			</Tab.Screen>
		</Tab.Navigator>
	);
}

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		backgroundColor: colors.white,
	},
	flatScreen: {
		flex: 1,
		paddingTop: 10,
	},
	row: {
		alignContent: 'center',
		justifyContent: 'space-between',
		textAlign: 'center',
		flexDirection: 'row',
		backgroundColor: colors.white,
		elevation: 5,
	},
	rowInput: {
		width: '100%',
	},
	textInput: {
		flexDirection: 'row',
		height: 40,
		borderRadius: 20,
		elevation: 5,
		paddingHorizontal: 20,
		justifyContent: 'space-between',
		margin: 15,
		borderWidth: 1,
		borderColor: colors.red,
		backgroundColor: colors.white,
	},
});

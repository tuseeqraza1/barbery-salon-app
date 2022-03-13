import React, { useState, useEffect } from 'react';
import {
	View,
	StyleSheet,
	Image,
	ScrollView,
	Text,
	TextInput,
	TouchableOpacity,
	FlatList,
	ToastAndroid,
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import ImagePicker from 'react-native-image-picker';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import Icon from 'react-native-vector-icons/FontAwesome';
import Geolocation from '@react-native-community/geolocation';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import ReviewCard from '../../components/ReviewCard';

import colors from '../../styles/colors';
import profileImg from '../../utils/profileImg';
import LoadingIndicator from '../../components/LoadingIndicator';

import { connect } from 'react-redux';
import { getUser, updateUser } from '../../redux/actions/mainRecords';
import axios from '../../../config';

const Tab = createMaterialTopTabNavigator();

const appointment1 = [
	{
		id: 1,
		name: 'Tuseeq Raza',
		rated: 2,
		text:
			'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
		time: 'Oct 23, 2020 4:50 PM',
		image: require('../../assets/images/image_1.jpg'),
	},
	{
		id: 2,
		name: 'Tuseeq Ahmed',
		rated: 4,
		text: 'Active',
		time: 'Oct 17, 2020 9:50 AM',
		image: require('../../assets/images/image_2.jpg'),
	},
	{
		id: 3,
		name: 'Abdullah',
		rated: 5,
		text: 'Active',
		time: 'Oct 23, 2020 4:50 PM',
		image: require('../../assets/images/image_3.jpg'),
	},
	{
		id: 4,
		name: 'Humza Jameel',
		rated: 1,
		text: 'Active',
		time: 'Oct 16, 2020 11:50 AM',
		image: require('../../assets/images/image_5.jpg'),
	},
	{
		id: 5,
		name: 'Tuseeq Raza',
		rated: 0,
		text: 'Active',
		time: 'Oct 23, 2020 4:50 PM',
		image: require('../../assets/images/image_6.jpg'),
	},
	{
		id: 6,
		name: 'Tuseeq Ahmed',
		rated: 5,
		text: 'Active',
		time: 'Oct 17, 2020 9:50 AM',
		image: require('../../assets/images/image_7.jpg'),
	},
	{
		id: 7,
		name: 'Abdullah',
		rated: 1,
		text: 'Active',
		time: 'Oct 23, 2020 4:50 PM',
		image: require('../../assets/images/image_8.jpg'),
	},
	{
		id: 8,
		name: 'Humza Jameel',
		rated: 5,
		text: 'Active',
		time: 'Oct 16, 2020 11:50 AM',
		image: require('../../assets/images/image_9.jpg'),
	},
];

function BarberAbout({ user, updateUser, loading }) {
	const [apiMage, setApiMage] = useState({});
	const [image, setImage] = useState(
		user?.image
			? `data:${user?.image?.type};base64,${user?.image?.data}`
			: profileImg.img,
	);
	const [firstName, setFirstName] = useState(user?.firstName || '');
	const [lastName, setLastName] = useState(user?.lastName);
	const [email, setEmail] = useState(user?.email);
	const [phone, setPhone] = useState(user?.phoneNo);
	const [salonName, setSalonName] = useState(user?.shopTitle);
	const [location, setLocation] = useState(user?.address);
	const [getmarginBottom, setMarginBottom] = useState(1);
	const [getCoordinate, setCoordinate] = useState({
		latitude: Number(user?.latitude),
		longitude: Number(user?.longitude),
		latitudeDelta: 0.001,
		longitudeDelta: 0.001,
	});
	const [isOpenTimePickerVisible, setOpenTimePickerVisibility] = useState(
		false,
	);
	const [isCloseTimePickerVisible, setCloseTimePickerVisibility] = useState(
		false,
	);
	const [isOpenTime, setOpenTime] = useState({
		Hours: Number(user?.openTiming.split(':')[0]),
		Minutes: Number(user?.openTiming.split(':')[1]),
	});
	const [isCloseTime, setCloseTime] = useState({
		Hours: Number(user?.closeTiming.split(':')[0]),
		Minutes: Number(user?.closeTiming.split(':')[1]),
	});
	const [getDay, setDay] = useState({
		0: 1,
		1: 1,
		2: 1,
		3: 0,
		4: 0,
		5: 0,
		6: 0,
	});

	const update = () => {
		const updateCurrentUser = {
			image: apiMage,
			firstName,
			lastName,
			email,
			phoneNo: phone,
			shopTitle: salonName,
			openTiming: isOpenTime.Hours + ':' + isOpenTime.Minutes,
			closeTiming: isCloseTime.Hours + ':' + isCloseTime.Minutes,
			address: location,
			latitude: getCoordinate.latitude.toString(),
			longitude: getCoordinate.longitude.toString(),
		};
		updateUser(updateCurrentUser);
	};

	useEffect(() => {
		if (getCoordinate.latitude == 0 && getCoordinate.longitude == 0) {
			Geolocation.getCurrentPosition(
				(position) => {
					console.log(position);
					setCoordinate({
						latitude: position.coords.latitude,
						longitude: position.coords.longitude,
						latitudeDelta: 0.001,
						longitudeDelta: 0.001,
					});
				},
				(error) => setCoordinate({ error: error.message }),
				{ enableHighAccuracy: false, timeout: 200000, maximumAge: 1000 },
			);
		}
	}, []);

	const onChangeLocation = (region) => {
		console.log(region);
		setCoordinate({
			latitude: region.latitude,
			longitude: region.longitude,
			latitudeDelta: region.latitudeDelta,
			longitudeDelta: region.longitudeDelta,
		});
	};

	const showOpenTimePicker = () => {
		setOpenTimePickerVisibility(true);
	};

	const hideOpenTimePicker = () => {
		setOpenTimePickerVisibility(false);
	};

	const showCloseTimePicker = () => {
		setCloseTimePickerVisibility(true);
	};

	const hideCloseTimePicker = () => {
		setCloseTimePickerVisibility(false);
	};

	const handleOpenTimeConfirm = (selectedTime) => {
		const date = new Date(selectedTime);
		const hours = date.getHours();
		const min = date.getMinutes();

		if (isCloseTime && hours >= isCloseTime.Hours) {
			ToastAndroid.show(
				'Close Time should be greater than Open time.',
				ToastAndroid.LONG,
			);
		} else {
			setOpenTime({
				Hours: hours,
				Minutes: min,
			});
			console.log(hours + ':' + min);
		}

		hideOpenTimePicker();
	};

	const handleCloseTimeConfirm = (selectedTime) => {
		const date = new Date(selectedTime);
		const hours = date.getHours();
		const min = date.getMinutes();

		if (isOpenTime && hours <= isOpenTime.Hours) {
			ToastAndroid.show(
				'Close Time should be greater than Open time.',
				ToastAndroid.LONG,
			);
		} else {
			setCloseTime({
				Hours: hours,
				Minutes: min,
			});
			console.log(hours + ':' + min);
		}

		hideCloseTimePicker();
	};

	const selectFile = () => {
		var options = {
			title: 'Select Image',
			storageOptions: {
				skipBackup: true,
				path: 'images',
			},
		};

		ImagePicker.showImagePicker(options, (res) => {
			if (res.didCancel) {
				console.log('User cancelled image picker');
			} else if (res.error) {
				console.log('ImagePicker Error: ', res.error);
			} else {
				setApiMage({ type: res.type, data: res.data });
				const uri = `data:${res.type};base64,${res.data}`;
				setImage(uri);
			}
		});
	};

	return (
		<ScrollView style={styles.container}>
			{loading && <LoadingIndicator />}
			{!loading && (
				<View style={{ width: '100%', height: '100%' }}>
					<TouchableOpacity style={styles.imageContainer} onPress={selectFile}>
						<Image style={styles.profileImage} source={{ uri: image }} />
					</TouchableOpacity>
					<View style={styles.profileData}>
						<View style={styles.row}>
							<View style={styles.rowInput}>
								<Text style={styles.text}>First Name</Text>
								<TextInput
									style={styles.textInput}
									placeholder={'Ahmed'}
									maxLength={50}
									onChangeText={(text) => setFirstName(text)}
									value={firstName}
								/>
							</View>
							<View style={styles.rowInput}>
								<Text style={styles.text}>Last Name</Text>
								<TextInput
									style={styles.textInput}
									placeholder={'Raza'}
									maxLength={50}
									onChangeText={(text) => setLastName(text)}
									value={lastName}
								/>
							</View>
						</View>
						<Text style={styles.text}>Email</Text>
						<TextInput
							style={styles.textInput}
							autoCapitalize="none"
							keyboardType="email-address"
							placeholder={'e.g. abc@gmail.com'}
							maxLength={50}
							onChangeText={(text) => setEmail(text)}
							value={email}
						/>
						<Text style={styles.text}>Phone no.</Text>
						<TextInput
							style={styles.textInput}
							placeholder={'+92'}
							keyboardType={'phone-pad'}
							maxLength={13}
							minLength={11}
							onChangeText={(text) => setPhone(text)}
							value={phone}
						/>
						<Text
							style={[
								styles.text,
								{
									fontSize: 20,
									fontWeight: 'bold',
									marginTop: 30,
									marginBottom: 15,
								},
							]}
						>
							Salon Details
						</Text>
						<Text style={styles.text}>Shop/Saloon Name</Text>
						<TextInput
							style={styles.textInput}
							placeholder={'e.g. HairoSol'}
							maxLength={50}
							onChangeText={(text) => setSalonName(text)}
							value={salonName}
						/>
						<View style={styles.row}>
							<View style={styles.rowInput}>
								<Text style={styles.text}>Opening Time</Text>
								<TouchableOpacity
									onPress={showOpenTimePicker}
									style={styles.rowInput}
								>
									<View style={styles.timeRow}>
										<TextInput
											style={{
												color: colors.dark,
											}}
											editable={false}
											maxLength={50}
											value={
												isOpenTime
													? isOpenTime.Hours + ':' + isOpenTime.Minutes
													: 'Select Time'
											}
										/>
										<Icon
											name="clock-o"
											style={{ paddingVertical: 10 }}
											color={colors.dark}
											size={20}
										/>
									</View>
								</TouchableOpacity>
							</View>
							<View style={styles.rowInput}>
								<Text style={styles.text}>Closing Time</Text>
								<TouchableOpacity
									onPress={showCloseTimePicker}
									style={styles.rowInput}
								>
									<View style={styles.timeRow}>
										<TextInput
											style={{
												color: colors.dark,
											}}
											editable={false}
											maxLength={50}
											value={
												isCloseTime
													? isCloseTime.Hours + ':' + isCloseTime.Minutes
													: 'Select Time'
											}
										/>
										<Icon
											name="clock-o"
											style={{ paddingVertical: 10 }}
											color={colors.dark}
											size={20}
										/>
									</View>
								</TouchableOpacity>
							</View>
						</View>

						<DateTimePickerModal
							isVisible={isOpenTimePickerVisible}
							mode="time"
							minuteInterval={30}
							onConfirm={handleOpenTimeConfirm}
							onCancel={hideOpenTimePicker}
						/>

						<DateTimePickerModal
							isVisible={isCloseTimePickerVisible}
							mode="time"
							minuteInterval={30}
							onConfirm={handleCloseTimeConfirm}
							onCancel={hideCloseTimePicker}
						/>
						<Text style={styles.text}>Location</Text>
						<TextInput
							style={styles.textInput}
							placeholder={'e.g. G-9, Lane 3, Islamabad '}
							maxLength={50}
							onChangeText={(text) => setLocation(text)}
							value={location}
						/>

						<View style={styles.mapContainer}>
							<MapView
								provider={PROVIDER_GOOGLE} // remove if not using Google Maps
								style={[styles.map, { marginBottom: getmarginBottom }]}
								region={{
									latitude: getCoordinate.latitude,
									longitude: getCoordinate.longitude,
									latitudeDelta: getCoordinate.latitudeDelta,
									longitudeDelta: getCoordinate.longitudeDelta,
								}}
								showsUserLocation={true}
								showsMyLocationButton={true}
								onMapReady={() => {
									setMarginBottom(0);
								}}
								onRegionChangeComplete={(region) => onChangeLocation(region)}
							></MapView>
							<View
								style={{
									top: '50%',
									left: '50%',
									marginLeft: -24,
									marginTop: -40,
									position: 'absolute',
								}}
							>
								<Image
									style={{ height: 40, width: 40 }}
									source={require('../../assets/icons/pointer.png')}
								/>
							</View>
						</View>
						<LinearGradient
							colors={[colors.orange, colors.red]}
							style={styles.button}
						>
							<TouchableOpacity
								style={{ width: '100%', alignItems: 'center' }}
								onPress={update}
							>
								<Text style={styles.textBtn}>Save</Text>
							</TouchableOpacity>
						</LinearGradient>
					</View>
				</View>
			)}
		</ScrollView>
	);
}

function barberReviews(props) {
	const [reviews, setReviews] = useState([]);

	useEffect(() => {
		axios.get('/barber/review').then((res) => {
			setReviews(
				res.data?.map((val) => ({
					id: val?._id,
					name: val?.user?.firstName,
					time: val?.review?.date?.split('T')[0],
					image: `data:${val?.user?.image?.type};base64,${val?.user?.image?.data}`,
					text: val?.review?.userReview,
					rated: Number(val?.review?.stars),
				})),
			);
		});
		return () => {};
	}, []);
	return (
		<View style={styles.screen}>
			<FlatList
				contentContainerStyle={{ paddingBottom: 15 }}
				style={styles.flatScreen}
				data={reviews}
				keyExtractor={(review) => review.id.toString()}
				renderItem={({ item }) => (
					<ReviewCard
						title={item.name}
						time={item.time}
						image={item.image}
						text={item.text}
						rated={item.rated}
					/>
				)}
			/>
		</View>
	);
}

function ProfileScreen({ user, updateUser, loading }) {
	useEffect(() => {
		if (!user) {
			getUser();
		}
		return () => {};
	}, []);
	return (
		<Tab.Navigator
			initialRouteName="About"
			tabBarOptions={{
				labelStyle: { fontSize: 14 },
				indicatorStyle: { backgroundColor: colors.white },
				activeTintColor: colors.white,
				inActiveTintColor: colors.lightRed,
				style: { backgroundColor: colors.red },
			}}
		>
			<Tab.Screen
				name="About"
				options={{
					tabBarLabel: 'About',
				}}
			>
				{(props) => (
					<BarberAbout
						{...props}
						user={user}
						updateUser={updateUser}
						loading={loading}
					/>
				)}
			</Tab.Screen>
			<Tab.Screen
				name="Reviews"
				component={barberReviews}
				options={{
					tabBarLabel: 'Reviews',
				}}
			/>
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
	textBtn: {
		color: colors.white,
		fontSize: 18,
		textTransform: 'uppercase',
	},
	button: {
		backgroundColor: colors.red,
		borderRadius: 25,
		justifyContent: 'center',
		alignItems: 'center',
		padding: 10,
		elevation: 5,
		marginVertical: 20,
		marginHorizontal: 90,
	},
	container: {
		flex: 1,
		alignContent: 'center',
		backgroundColor: colors.white,
	},
	imageContainer: {
		alignItems: 'center',
		marginHorizontal: 100,
	},
	profileImage: {
		height: 160,
		width: 160,
		borderRadius: 80,
		borderColor: colors.red,
		borderWidth: 3,
		marginVertical: 40,
	},
	CoverImage: {
		position: 'absolute',
		right: 0,
		top: 0,
		height: 250,
		width: '100%',
		borderBottomRightRadius: 50,
	},
	profileData: {
		paddingHorizontal: 15,
	},
	row: {
		flexDirection: 'row',
		alignContent: 'center',
		justifyContent: 'space-between',
	},
	rowInput: {
		width: 180,
	},
	text: {
		color: colors.black,
		fontSize: 14,
		paddingHorizontal: 20,
	},
	textInput: {
		height: 40,
		fontSize: 14,
		borderRadius: 25,
		elevation: 5,
		backgroundColor: colors.light,
		paddingHorizontal: 20,
		paddingVertical: 5,
		marginHorizontal: 10,
		marginTop: 5,
		marginBottom: 15,
	},
	timeRow: {
		flexDirection: 'row',
		height: 40,
		fontSize: 14,
		borderRadius: 25,
		elevation: 5,
		backgroundColor: colors.light,
		paddingHorizontal: 15,
		marginHorizontal: 10,
		marginTop: 5,
		marginBottom: 15,

		justifyContent: 'space-between',
	},
	getLocation: {
		fontSize: 14,
		color: colors.white,
		backgroundColor: colors.red,
		justifyContent: 'center',
		alignItems: 'center',
		textAlign: 'center',
	},
	mapContainer: {
		// ...StyleSheet.absoluteFillObject,
		height: 400,
		width: '100%',
		justifyContent: 'center',
		alignItems: 'center',
	},
	map: {
		...StyleSheet.absoluteFillObject,
		margin: 10,
		borderRadius: 10,
	},
	weekPicker: {
		paddingVertical: 30,
		paddingHorizontal: 10,
		justifyContent: 'space-between',
	},
	day: {
		margin: 5,
		elevation: 5,
		backgroundColor: colors.light,
	},
});

const mapStateToProps = ({ mainRecords: { user, loading } }) => ({
	user,
	loading,
});

const mapActionToProps = { getUser, updateUser };

export default connect(mapStateToProps, mapActionToProps)(ProfileScreen);

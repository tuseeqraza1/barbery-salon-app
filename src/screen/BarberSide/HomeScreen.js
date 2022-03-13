import React, { useEffect, useState } from 'react';
import {
	View,
	Text,
	FlatList,
	StyleSheet,
	TouchableOpacity,
} from 'react-native';
import GradientHeader from 'react-native-gradient-header';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';

import profileImg from '../../utils/profileImg';
import HomeCard from '../../components/HomeCard';
import LoadingIndicator from '../../components/LoadingIndicator';
import colors from '../../styles/colors';

import { connect } from 'react-redux';
import { logout } from '../../redux/actions/user';
import { getUser, getRecords } from '../../redux/actions/mainRecords';
import AsyncStorage from '@react-native-async-storage/async-storage';

function HomeScreen({
	navigation: { goBack, navigate },
	user,
	records,
	loading,
	getUser,
	getRecords,
	logout,
	token,
}) {
	useEffect(() => {
		if (!user) {
			getUser();
		}
		getRecords();

		return () => {};
	}, [goBack]);

	return (
		<View style={styles.screen}>
			{loading && <LoadingIndicator />}
			<View style={styles.headerScreen}>
				<Animatable.View animation="slideInDown">
					<GradientHeader
						title={`Hi, ${user ? user.firstName : ''}`}
						subtitle="Have a nice day!"
						gradientColors={[colors.orange, colors.red]}
						imageSource={{
							uri: user?.image
								? `data:${user?.image?.type};base64,${user?.image?.data}`
								: profileImg.img,
						}}
					/>
				</Animatable.View>
			</View>
			<View style={styles.flatContainer}>
				<FlatList
					contentContainerStyle={{ paddingBottom: 15 }}
					style={styles.flatScreen}
					data={records}
					numColumns={2}
					showsVerticalScrollIndicator={false}
					keyExtractor={(listing, index) => index.toString()}
					renderItem={({ item }) => (
						<HomeCard title={item.title} subTitle={item.value} />
					)}
				/>
			</View>
			{!loading && (
				<LinearGradient
					colors={[colors.orange, colors.red]}
					style={styles.button}
				>
					<TouchableOpacity
						style={{ width: '100%', alignItems: 'center' }}
						onPress={() => {
							logout();
							navigate('Welcome');
							AsyncStorage.removeItem('@Token');
						}}
					>
						<Text style={styles.textBtn}>Logout</Text>
					</TouchableOpacity>
				</LinearGradient>
			)}
		</View>
	);
}

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		backgroundColor: colors.white,
	},
	headerScreen: {
		flex: 1,
	},
	flatContainer: {
		flex: 3,
		zIndex: -1,
		paddingHorizontal: 20,
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
		marginBottom: 10,
		marginHorizontal: 90,
	},
});

const mapStateToProps = ({
	user: { token },
	mainRecords: { user, records, loading },
}) => ({
	token,
	user,
	records,
	loading,
});

const mapActionToProps = { getUser, getRecords, logout };

export default connect(mapStateToProps, mapActionToProps)(HomeScreen);

import React, { useState } from 'react';
import { useEffect } from 'react';
import { LogBox } from 'react-native';
import {
	StyleSheet,
	Text,
	View,
	Image,
	ScrollView,
	SafeAreaView,
	FlatList,
	TouchableOpacity,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import axios from '../../../config';
import LoadingIndicator from '../../components/LoadingIndicator';
import ReviewCard from '../../components/ReviewCard';

import Separator from '../../components/Separator';

import colors from '../../styles/colors';

export default function AppointmentDetailScreen({
	route: {
		params: { item: itm },
	},
}) {
	const [loading, setLoading] = React.useState(false);
	const [item, setItem] = React.useState(itm);

	const markAsCompleted = () => {
		setLoading(true);
		axios.put('/appointment/' + item?.id, { status: false }).then((res) => {
			console.log('response', res.data);
			setItem({
				title: res.data?.user?.firstName,
				image: `data:${res.data?.user?.image?.type};base64,${res.data?.user?.image?.data}`,
				status: res.data?.status,
				price: res.data?.bill,
				time: res.data?.timing,
				date: res.data?.date?.split('T')[0],
				id: res.data?._id,
				specialist: res.data?.specialist,
				services: res.data?.services,
				promo: res.data?.promo,
				bill: res.data?.bill,
				review: res.data?.review,
			});
			setLoading(false);
		});
	};

	useEffect(() => {
		LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
	}, []);

	return (
		<>
			{loading && <LoadingIndicator />}
			<ScrollView style={styles.screen}>
				<View style={styles.cardPerson}>
					<Image
						style={styles.image}
						source={{
							uri: item?.image,
						}}
					/>
					<View style={styles.detailsContainer}>
						<Text style={styles.title}>{item?.title}</Text>
						<Text style={styles.time}>{`${item?.time} / ${item?.date}`}</Text>
					</View>
				</View>
				<View style={styles.servicesDetails}>
					<View style={styles.flatItemHeading}>
						<Text style={styles.heading}>Services</Text>
						<Text style={styles.heading}>Price</Text>
					</View>
					<SafeAreaView style={styles.card}>
						<FlatList
							style={styles.flatScreen}
							data={item?.services}
							keyExtractor={(service) => service._id.toString()}
							renderItem={({ item }) => (
								<View style={styles.flatItem}>
									<Text>{item?.name}</Text>
									<Text>{item?.cost}</Text>
								</View>
							)}
						/>
					</SafeAreaView>
					<View style={{ paddingHorizontal: 25, paddingVertical: 10 }}>
						<Separator />
					</View>
					<View style={styles.flatItem}>
						<Text style={styles.heading}>Promo</Text>
						<Text>-{item?.promo != 0 && item?.promo}</Text>
					</View>
					<View style={styles.flatItem}>
						<Text style={styles.heading}>Total</Text>
						<Text>{item?.bill}</Text>
					</View>
				</View>
				<View style={styles.cardPerson}>
					<Image
						style={styles.image}
						source={{
							uri: `data:${item?.specialist?.picture?.type};base64,${item?.specialist?.picture?.data}`,
						}}
					/>
					<View style={styles.detailsContainer}>
						<Text style={styles.title}>{item?.specialist?.name}</Text>
						<Text style={styles.time}>specialist</Text>
					</View>
				</View>
				{item?.status && (
					<LinearGradient
						colors={[colors.orange, colors.red]}
						style={[styles.button]}
					>
						<TouchableOpacity onPress={() => markAsCompleted()}>
							<Text style={styles.textBtn}>Mark Complete</Text>
						</TouchableOpacity>
					</LinearGradient>
				)}

				{item?.review && (
					<View style={styles.reviewCard}>
						<View style={{ paddingVertical: 10 }}>
							<Separator />
						</View>
						<ReviewCard
							title={item?.title}
							image={item?.image}
							time={item?.review?.date?.split('T')[0]}
							text={item?.review?.userReview}
							rated={Number(item?.review?.stars)}
						/>
					</View>
				)}
			</ScrollView>
		</>
	);
}

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		backgroundColor: colors.white,
	},
	card: {
		backgroundColor: colors.white,
		flexDirection: 'row',
	},
	reviewCard: {
		flex: 1,
		// marginTop: 30,
	},
	cardPerson: {
		backgroundColor: colors.white,
		flexDirection: 'row',
		marginTop: 15,
		marginHorizontal: 20,
	},
	detailsContainer: {
		marginLeft: 10,
	},
	image: {
		width: 70,
		height: 70,
		borderRadius: 35,
		margin: 10,
	},
	time: {
		color: colors.medium,
		fontWeight: '100',
		fontSize: 12,
		marginTop: 15,
	},
	title: {
		fontWeight: 'bold',
		paddingTop: 10,
	},
	flatScreen: {
		flex: 1,
		paddingVertical: 15,
	},
	flatItem: {
		flexDirection: 'row',
		marginHorizontal: 30,
		justifyContent: 'space-between',
	},
	flatItemHeading: {
		flexDirection: 'row',
		marginHorizontal: 30,
		justifyContent: 'space-between',
	},
	heading: {
		fontWeight: 'bold',
		// textDecorationLine: 'underline',
	},
	servicesDetails: {
		margin: 20,
		paddingVertical: 25,
		backgroundColor: colors.white,
		borderRadius: 20,
		elevation: 10,
	},
	buttonsContainer: {
		padding: 20,
		width: '100%',
	},
	button: {
		borderRadius: 25,
		justifyContent: 'center',
		alignItems: 'center',
		padding: 10,
		elevation: 5,
		marginVertical: 25,
		marginHorizontal: 70,
	},
	textBtn: {
		color: colors.white,
		fontSize: 14,
		// textTransform: 'uppercase',
	},
});

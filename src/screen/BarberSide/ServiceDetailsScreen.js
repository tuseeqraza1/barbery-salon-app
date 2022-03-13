import React, { useEffect, useState } from 'react';
import {
	View,
	ScrollView,
	Text,
	TouchableOpacity,
	Image,
	Switch,
	StyleSheet,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Root, Popup } from 'popup-ui';

import colors from '../../styles/colors';
import Separator from '../../components/Separator';

import { connect } from 'react-redux';
import { updateStatus, deleteService } from '../../redux/actions/serviceAction';
import { getRecords } from '../../redux/actions/mainRecords';

function ServiceDetailsScreen({
	navigation: { navigate, goBack },
	updateStatus,
	deleteService,
	getRecords,
	loading,
	route,
}) {
	const [service, setService] = useState(route.params.service);

	return (
		<Root>
			<ScrollView>
				<View>
					<Image
						style={styles.image}
						source={{
							uri: `data:${service.picture.type};base64,${service.picture.data}`,
						}}
					/>
					<View style={styles.detailsContainer}>
						<Text style={styles.titleCategory}>
							{`Category/${service.category}`}
						</Text>
						<Text style={styles.title}>{service.name}</Text>
						<Text style={styles.price}>{`Rs. ${service.cost}`}</Text>
						<Separator />
						<View style={styles.switchContainer}>
							<Text style={styles.status}>Service Status</Text>
							<Switch
								value={service.status}
								onValueChange={(value) => {
									updateStatus({
										_id: service._id,
										status: value,
									});
									setService({ ...service, status: value });
								}}
							/>
						</View>
						<Separator />
						<Text style={styles.status}>Service Description</Text>
						<Text style={styles.description}>{service.description}</Text>
						<View style={styles.editBtn}>
							<LinearGradient
								colors={[colors.orange, colors.red]}
								style={styles.button}
							>
								<TouchableOpacity
									onPress={() => navigate('Update Service', { service })}
								>
									<Text style={styles.textBtn}>Edit</Text>
								</TouchableOpacity>
							</LinearGradient>
							<LinearGradient
								colors={[colors.orange, colors.red]}
								style={styles.button}
							>
								<TouchableOpacity
									onPress={() => {
										deleteService({ _id: service._id });
										getRecords();
										Popup.show({
											type: 'Success',
											title: 'Service Deleted',
											// button: false,
											textBody: 'Service deleted successfully.',
											buttonText: 'Ok',
											callback: () => {
												Popup.hide();
												goBack();
											},
										});
									}}
								>
									<Text style={styles.textBtn}>Delete</Text>
								</TouchableOpacity>
							</LinearGradient>
						</View>
					</View>
				</View>
			</ScrollView>
		</Root>
	);
}

const styles = StyleSheet.create({
	description: {
		textAlign: 'justify',
	},
	detailsContainer: {
		padding: 20,
	},
	image: {
		width: '100%',
		height: 300,
	},
	price: {
		color: colors.red,
		fontWeight: 'bold',
		fontSize: 20,
		marginBottom: 20,
	},
	status: {
		color: colors.black,
		fontWeight: '300',
		fontSize: 20,
		marginVertical: 15,
	},
	switchContainer: {
		//flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
	},
	title: {
		color: colors.black,
		fontSize: 24,
		fontWeight: '500',
		marginVertical: 5,
	},
	titleCategory: {
		color: colors.medium,
		fontSize: 14,
		fontWeight: '300',
	},
	button: {
		borderRadius: 25,
		width: '30%',
		justifyContent: 'center',
		alignItems: 'center',
		padding: 10,
		elevation: 5,
		marginVertical: 10,
	},
	textBtn: {
		color: colors.white,
		fontSize: 16,
	},
	editBtn: {
		flex: 1,
		flexDirection: 'row',
		marginTop: 20,
		justifyContent: 'space-evenly',
	},
});

const mapStateToProps = ({ serviceReducer: { services, loading } }) => ({
	services,
	loading,
});

const mapActionToProps = { updateStatus, deleteService, getRecords };

export default connect(mapStateToProps, mapActionToProps)(ServiceDetailsScreen);

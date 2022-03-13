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
import {
	updateSpecialistStatus,
	deleteSpecialist,
} from '../../redux/actions/specialistAction';
import { getRecords } from '../../redux/actions/mainRecords';

function SpecialistDetailsScreen({
	navigation: { navigate, goBack },
	updateSpecialistStatus,
	deleteSpecialist,
	getRecords,
	loading,
	route,
}) {
	const [specialist, setSpecialist] = useState(route.params.Specialist);

	return (
		<Root>
			<ScrollView>
				<View>
					<Image
						style={styles.image}
						source={{
							uri: `data:${specialist.picture.type};base64,${specialist.picture.data}`,
						}}
					/>
					<View style={styles.detailsContainer}>
						<Text style={styles.title}>{specialist.name}</Text>
						<Separator />
						<View style={styles.switchContainer}>
							<Text style={styles.status}>Specialist Status</Text>
							<Switch
								value={specialist.status}
								onValueChange={(value) => {
									updateSpecialistStatus({
										_id: specialist._id,
										status: value,
									});
									setSpecialist({ ...specialist, status: value });
								}}
							/>
						</View>
						<Separator />
						<Text style={styles.status}>About</Text>
						<Text style={styles.description}>{specialist.description}</Text>
						<View style={styles.editBtn}>
							<LinearGradient
								colors={[colors.orange, colors.red]}
								style={styles.button}
							>
								<TouchableOpacity
									onPress={() => navigate('Update Specialist', { specialist })}
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
										deleteSpecialist({ _id: specialist._id });
										getRecords();
										Popup.show({
											type: 'Success',
											title: 'Specialist Deleted',
											// button: false,
											textBody: 'Specialist deleted successfully.',
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
		marginVertical: 10,
	},
	titleCategory: {
		color: colors.medium,
		fontSize: 14,
		fontWeight: '300',
	},
	textBtn: {
		color: colors.white,
		fontSize: 16,
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
	editBtn: {
		flex: 1,
		flexDirection: 'row',
		marginTop: 20,
		justifyContent: 'space-evenly',
	},
});

const mapStateToProps = ({ specialistReducer: { specialists, loading } }) => ({
	specialists,
	loading,
});

const mapActionToProps = {
	updateSpecialistStatus,
	deleteSpecialist,
	getRecords,
};

export default connect(
	mapStateToProps,
	mapActionToProps,
)(SpecialistDetailsScreen);

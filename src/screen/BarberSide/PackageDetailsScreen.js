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
	updatePackageStatus,
	deletePackage,
} from '../../redux/actions/packageAction';
import { getRecords } from '../../redux/actions/mainRecords';

function PackageDetailsScreen({
	navigation: { navigate, goBack },
	updatePackageStatus,
	deletePackage,
	getRecords,
	loading,
	route,
}) {
	const [pkg, setPackage] = useState(route.params.pkg);

	return (
		<Root>
			<ScrollView>
				<View>
					<Image
						style={styles.image}
						source={{
							uri: `data:${pkg.picture.type};base64,${pkg.picture.data}`,
						}}
					/>
					<View style={styles.detailsContainer}>
						<Text style={styles.titleCategory}>{`Package#${pkg._id}`}</Text>
						<Text style={styles.title}>{pkg.name}</Text>
						<Text style={styles.price}>{`Rs. ${pkg.cost}`}</Text>
						<Separator />
						<View style={styles.switchContainer}>
							<Text style={styles.status}>Package Status</Text>
							<Switch
								value={pkg.status}
								onValueChange={(value) => {
									updatePackageStatus({
										_id: pkg._id,
										status: value,
									});
									setPackage({ ...pkg, status: value });
								}}
							/>
						</View>
						<Separator />
						<Text style={styles.status}>Package Description</Text>
						<Text style={styles.description}>{pkg.description}</Text>
						<View style={styles.editBtn}>
							<LinearGradient
								colors={[colors.orange, colors.red]}
								style={styles.button}
							>
								<TouchableOpacity
									onPress={() => navigate('Update Package', { pkg })}
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
										deletePackage({ _id: pkg._id });
										getRecords();
										Popup.show({
											type: 'Success',
											title: 'Package Deleted',
											// button: false,
											textBody: 'Package deleted successfully.',
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

const mapStateToProps = ({ packageReducer: { packages, loading } }) => ({
	packages,
	loading,
});

const mapActionToProps = { updatePackageStatus, deletePackage, getRecords };

export default connect(mapStateToProps, mapActionToProps)(PackageDetailsScreen);

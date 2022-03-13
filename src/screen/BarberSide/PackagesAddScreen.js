import React, { useEffect, useState } from 'react';
import {
	Image,
	Text,
	TextInput,
	View,
	TouchableOpacity,
	StyleSheet,
} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import LinearGradient from 'react-native-linear-gradient';
import { Root, Popup } from 'popup-ui';

import colors from '../../styles/colors';

import { connect } from 'react-redux';
import { addPackage } from '../../redux/actions/packageAction';
import { getRecords } from '../../redux/actions/mainRecords';

function PackagesAddScreen({
	navigation: { navigate, goBack },
	packages,
	addPackage,
	getRecords,
}) {
	const [apiMage, setApiMage] = useState({});
	const [imagePicked, setImagePicked] = useState();
	const [title, setTitle] = React.useState('');
	const [price, setPrice] = React.useState('');
	const [description, setDescription] = React.useState('');

	const selectFile = () => {
		var options = {
			title: 'Select Image',
			storageOptions: {
				skipBackup: true,
				path: 'images',
			},
		};

		ImagePicker.showImagePicker(options, (res) => {
			console.log('Response = ', res);

			if (res.didCancel) {
				console.log('User cancelled image picker');
			} else if (res.error) {
				console.log('ImagePicker Error: ', res.error);
			} else {
				setApiMage({ type: res.type, data: res.data });
				const uri = `data:${res.type};base64,${res.data}`;
				setImagePicked(uri);
			}
		});
	};

	const addNewPackage = () => {
		const newPackage = {
			name: title,
			cost: price,
			picture: apiMage,
			status: true,
			description,
		};
		addPackage(newPackage);
	};

	return (
		<Root>
			<View style={styles.container}>
				<Text style={styles.text}>Title</Text>
				<TextInput
					style={styles.textInput}
					placeholder={'e.g. Hair Cutting'}
					maxLength={50}
					onChangeText={(text) => setTitle(text)}
					value={title}
				/>
				<Text style={styles.text}>Price</Text>
				<TextInput
					style={styles.textInput}
					placeholder={'e.g. 150'}
					keyboardType="numeric"
					maxLength={5}
					onChangeText={(text) => setPrice(text)}
					value={price}
				/>
				<Text style={styles.text}>Description</Text>
				<TextInput
					style={styles.textInput}
					maxLength={255}
					numberOfLines={3}
					onChangeText={(text) => setDescription(text)}
					value={description}
				/>
				{imagePicked && (
					<View style={{ justifyContent: 'center', alignItems: 'center' }}>
						<Image style={styles.image} source={{ uri: imagePicked }} />
					</View>
				)}
				<LinearGradient
					colors={[colors.orange, colors.red]}
					style={[styles.button]}
				>
					<TouchableOpacity onPress={selectFile}>
						<Text style={styles.textBtn}>Select Image</Text>
					</TouchableOpacity>
				</LinearGradient>
				<LinearGradient
					colors={[colors.orange, colors.red]}
					style={[styles.button]}
				>
					<TouchableOpacity
						onPress={() => {
							addNewPackage();
							getRecords();
							Popup.show({
								type: 'Success',
								title: 'Package Added',
								// button: false,
								textBody: 'New package added successfully.',
								buttonText: 'Ok',
								callback: () => {
									Popup.hide();
									goBack();
								},
							});
						}}
					>
						<Text style={styles.textBtn}>Add Package</Text>
					</TouchableOpacity>
				</LinearGradient>
			</View>
		</Root>
	);
}

const styles = StyleSheet.create({
	button: {
		borderRadius: 25,
		justifyContent: 'center',
		alignItems: 'center',
		padding: 10,
		elevation: 5,
		marginVertical: 10,
		marginHorizontal: 70,
	},
	container: {
		flex: 1,
		backgroundColor: colors.white,
		alignContent: 'center',
		paddingTop: 20,
		paddingHorizontal: 15,
	},
	image: {
		height: 170,
		width: 170,
		borderRadius: 10,
		borderColor: colors.red,
		borderWidth: 1,
	},
	text: {
		color: colors.black,
		fontSize: 14,
		paddingHorizontal: 20,
	},
	textBtn: {
		color: colors.white,
		fontSize: 18,
		textTransform: 'uppercase',
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
		marginBottom: 20,
	},
});

const mapStateToProps = ({ packageReducer: { packages, loading } }) => ({
	packages,
	loading,
});

const mapActionToProps = { addPackage, getRecords };

export default connect(mapStateToProps, mapActionToProps)(PackagesAddScreen);

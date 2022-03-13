import React, { useState } from 'react';
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
import { addSpecialist } from '../../redux/actions/specialistAction';
import { getRecords } from '../../redux/actions/mainRecords';

function SpecialistAddScreen({
	navigation: { navigate, goBack },
	specialists,
	addSpecialist,
	getRecords,
}) {
	const [apiMage, setApiMage] = useState({});
	const [imagePicked, setImagePicked] = useState();
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');

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
				setImagePicked(uri);
			}
		});
	};

	const addNewSpecialist = () => {
		const newSpecialist = {
			name: title,
			picture: apiMage,
			status: true,
			description,
		};
		addSpecialist(newSpecialist);
	};

	return (
		<Root>
			<View style={styles.container}>
				<Text style={styles.text}>Name</Text>
				<TextInput
					style={styles.textInput}
					placeholder={'e.g. Ahmed'}
					maxLength={50}
					onChangeText={(text) => setTitle(text)}
					value={title}
				/>
				<Text style={styles.text}>About</Text>
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
							addNewSpecialist();
							getRecords();
							Popup.show({
								type: 'Success',
								title: 'Specialist Added',
								// button: false,
								textBody: 'New Specialist Added successfully.',
								buttonText: 'Ok',
								callback: () => {
									Popup.hide();
									goBack();
								},
							});
						}}
					>
						<Text style={styles.textBtn}>Add Specialist</Text>
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

const mapStateToProps = ({ specialistReducer: { specialists, loading } }) => ({
	specialists,
	loading,
});

const mapActionToProps = { addSpecialist, getRecords };

export default connect(mapStateToProps, mapActionToProps)(SpecialistAddScreen);

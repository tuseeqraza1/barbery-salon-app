import React, { useState, useEffect } from 'react';
import {
	Image,
	Text,
	TextInput,
	View,
	TouchableOpacity,
	StyleSheet,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import ImagePicker from 'react-native-image-picker';
import LinearGradient from 'react-native-linear-gradient';
import { Root, Popup } from 'popup-ui';

import { connect } from 'react-redux';
import { updateService } from '../../redux/actions/serviceAction';
import { getRecords } from '../../redux/actions/mainRecords';

import colors from '../../styles/colors';

function ServicesEditScreen({
	navigation: { navigate, goBack },
	loading,
	updateService,
	getRecords,
	route,
}) {
	const [service, setService] = useState(route.params.service);

	const [apiMage, setApiMage] = useState({});
	const [imagePicked, setImagePicked] = useState();
	const [title, setTitle] = useState('');
	const [price, setPrice] = useState('');
	const [description, setDescription] = useState('');
	const [selectedValue, setSelectedValue] = useState('');

	useEffect(() => {
		setImagePicked(
			`data:${service.picture.type};base64,${service.picture.data}`,
		);
		setTitle(service.name);
		setPrice(service.cost);
		setDescription(service.description);
		setSelectedValue(service.category);
		return () => {};
	}, []);

	const updateCurrentService = {
		_id: service._id,
		name: title,
		cost: price,
		picture: apiMage,
		status: true,
		description,
		category: selectedValue,
	};

	const update = () => {
		updateService(updateCurrentService);
	};

	const selectImage = () => {
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
				<Text style={styles.text}>Category</Text>
				<View style={styles.textInput}>
					<Picker
						selectedValue={selectedValue}
						style={{ flex: 1 }}
						onValueChange={(itemValue) => setSelectedValue(itemValue)}
						itemStyle={styles.picker}
						mode={'dropdown'}
					>
						<Picker.Item label="Hair" value="hair" />
						<Picker.Item label="Shaves" value="shaves" />
						<Picker.Item label="Styling" value="styling" />
						<Picker.Item label="Hair Color" value="hairColor" />
						<Picker.Item label="Waxing" value="waxing" />
						<Picker.Item label="Men's Services" value="menServices" />
						<Picker.Item label="Nails" value="nails" />
						<Picker.Item label="Other" value="other" />
					</Picker>
				</View>
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
					<TouchableOpacity onPress={selectImage}>
						<Text style={styles.textBtn}>Select Image</Text>
					</TouchableOpacity>
				</LinearGradient>
				<LinearGradient
					colors={[colors.orange, colors.red]}
					style={[styles.button]}
				>
					<TouchableOpacity
						onPress={() => {
							update();
							getRecords();
							Popup.show({
								type: 'Success',
								title: 'Service Updated',
								// button: false,
								textBody: 'Service updated successfully.',
								buttonText: 'Ok',
								callback: () => {
									Popup.hide();
									navigate('Services List');
								},
							});
						}}
					>
						<Text style={styles.textBtn}>Update Service</Text>
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
	picker: {
		fontSize: 14,
		height: 40,
		color: 'black',
		textAlign: 'center',
		fontWeight: 'bold',
	},
});

const mapStateToProps = ({ serviceReducer: { services, loading } }) => ({
	services,
	loading,
});

const mapActionToProps = { updateService, getRecords };

export default connect(mapStateToProps, mapActionToProps)(ServicesEditScreen);

import React, { useState, useEffect } from 'react';
import {
	View,
	Image,
	FlatList,
	TouchableOpacity,
	StyleSheet,
} from 'react-native';
import ImageView from 'react-native-image-viewing';
import LinearGradient from 'react-native-linear-gradient';
import ImagePicker from 'react-native-image-picker';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';

import LoadingIndicator from '../../components/LoadingIndicator';
import ImageGalleryCard from '../../components/ImageGalleryCard';
import colors from '../../styles/colors';

import { connect } from 'react-redux';
import {
	getCollection,
	addPicture,
	deletePicture,
} from '../../redux/actions/galleryAction';

function GalleryScreen({
	navigation: { navigate },
	collection,
	getCollection,
	addPicture,
	deletePicture,
	loading,
}) {
	const [visible, setIsVisible] = useState(false);
	const [photos, setPhotos] = useState([]);
	const [imageIndex, setImageIndex] = useState(0);
	const columns = 4;

	useEffect(() => {
		getCollection();
		return () => {};
	}, []);
	useEffect(() => {
		const photosList = collection?.map(({ picture }) => ({
			uri: `data:${picture?.type};base64,${picture?.data}`,
		}));
		setPhotos(photosList);
		return () => {};
	}, [collection]);

	// useEffect(() => {
	// 	if (!visible) setIsVisible(true);
	// 	return () => {};
	// }, [imageIndex]);

	// +(
	// useEffect(() => {
	// 	setPhotos(photosList);
	// }, []);

	// const deleteHandle = (id) => {
	// 	console.log(id + ' clicked');
	// 	const updatedPhotoList = photos.filter((photo) => photo.id !== id);
	// 	setPhotos(updatedPhotoList);
	// };

	// useEffect(() => {
	// 	addPicture({ picture: apiMage });
	// 	return () => {};
	// }, [apiMage]);
	// );

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
				// setApiMage({ type: res.type, data: res.data });
				// const uri = `data:${res.type};base64,${res.data}`;
				// setImagePicked(uri);
				addPicture({ picture: { type: res.type, data: res.data } });
			}
		});
	};

	return (
		<View style={styles.screen}>
			{loading && <LoadingIndicator />}
			{!loading && (
				<FlatList
					style={{ flex: 1 }}
					numColumns={columns}
					showsVerticalScrollIndicator={false}
					showsHorizontalScrollIndicator={false}
					data={collection}
					keyExtractor={(picture, index) => index.toString()}
					renderItem={({ item, index }) => (
						<ImageGalleryCard
							image={`data:${item?.picture?.type};base64,${item?.picture?.data}`}
							onPress={() => {
								setImageIndex(index);
								setIsVisible(true);
							}}
							onDelete={() => {
								deletePicture({ _id: item._id });
							}}
						/>
					)}
				/>
			)}
			<LinearGradient
				colors={[colors.orange, colors.red]}
				style={[styles.button]}
			>
				<TouchableOpacity onPress={selectFile}>
					<Image
						style={styles.icon}
						source={require('../../assets/icons/plus.png')}
					/>
				</TouchableOpacity>
			</LinearGradient>
			<ImageView
				images={photos}
				imageIndex={imageIndex}
				visible={visible}
				onRequestClose={() => setIsVisible(false)}
			/>
		</View>
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
	button: {
		backgroundColor: colors.red,
		borderRadius: 30,
		position: 'absolute',
		elevation: 5,
		right: 20,
		bottom: 20,
		padding: 10,
		width: 60,
		height: 60,
	},
	icon: {
		tintColor: colors.white,
		padding: 10,
		width: 40,
		height: 40,
	},
});

const mapStateToProps = ({ galleryReducer: { collection, loading } }) => ({
	collection,
	loading,
});

const mapActionToProps = { getCollection, addPicture, deletePicture };

export default connect(mapStateToProps, mapActionToProps)(GalleryScreen);

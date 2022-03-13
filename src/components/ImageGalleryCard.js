import React, { useState } from 'react';
import {
	View,
	StyleSheet,
	Image,
	TouchableOpacity,
	Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';

import colors from '../styles/colors';

export default function ImageGalleryCard({ image, onPress, onDelete }) {
	const width = Math.round(Dimensions.get('window').width);

	return (
		<View style={styles.screen}>
			<TouchableOpacity
				style={{
					height: width / 4,
					width: width / 4,
					backgroundColor: colors.white,
					overflow: 'hidden',
				}}
				onPress={onPress}
			>
				<Image style={styles.image} source={{ uri: image }} />
			</TouchableOpacity>
			<Icon
				style={{
					position: 'absolute',
					right: 5,
					top: 5,
					borderRadius: 15,
					elevation: 5,
					backgroundColor: colors.white,
				}}
				name="closecircle"
				size={25}
				color={colors.red}
				onPress={onDelete}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	screen: {
		flex: 1 / 4,
		backgroundColor: colors.dark,
	},
	image: {
		width: '100%',
		height: '100%',
	},
});

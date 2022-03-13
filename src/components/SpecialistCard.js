import React from 'react';
import {
	Text,
	View,
	StyleSheet,
	Image,
	TouchableHighlight,
	Dimensions,
} from 'react-native';

import colors from '../styles/colors';

function SpecialistCard({ title, status, image, onPress }) {
	return (
		<TouchableHighlight
			style={styles.screen}
			underlayColor={colors.light}
			onPress={onPress}
		>
			<View style={styles.card}>
				<Image style={styles.image} source={{ uri: image }} />
				<Text style={styles.title}>{title}</Text>
				<Text style={[status ? styles.active : styles.inActive, styles.status]}>
					{status ? 'Active' : 'Inactive'}
				</Text>
			</View>
		</TouchableHighlight>
	);
}

const styles = StyleSheet.create({
	active: {
		color: colors.green,
	},
	inActive: {
		color: colors.red,
	},
	screen: {
		flex: 1 / 2,
		marginVertical: 8,
		marginHorizontal: 15,
	},
	card: {
		borderRadius: 15,
		backgroundColor: colors.white,
		elevation: 7,
		flexDirection: 'row',
		overflow: 'hidden',
		shadowRadius: 30,
		width: '100%',
		height: 200,
	},
	detailsContainer: {
		flex: 1,
		padding: 20,
	},
	image: {
		width: '100%',
		height: 130,
	},
	subTitle: {
		color: colors.orange,
		fontSize: 24,
		fontWeight: '700',
		textAlign: 'right',
		marginTop: 15,
	},
	status: {
		fontWeight: '700',
		position: 'absolute',
		top: 170,
		right: 15,
	},
	title: {
		color: colors.black,
		fontSize: 18,
		fontWeight: '500',
		position: 'absolute',
		top: 140,
		left: 10,
	},
});

export default SpecialistCard;

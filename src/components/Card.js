import React from 'react';
import {
	Text,
	View,
	StyleSheet,
	Image,
	TouchableHighlight,
} from 'react-native';

import colors from '../styles/colors';

function Card({ title, subTitle, status, image, onPress }) {
	return (
		<TouchableHighlight
			style={styles.screen}
			underlayColor={colors.light}
			onPress={onPress}
		>
			<View style={styles.card}>
				<Image style={styles.image} source={{ uri: image }} />
				<View style={styles.detailsContainer}>
					<Text style={styles.title}>{title}</Text>
					<Text style={styles.subTitle}>{subTitle}</Text>
					<Text
						style={[status ? styles.active : styles.inActive, styles.status]}
					>
						{status ? 'Active' : 'Inactive'}
					</Text>
				</View>
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
		flex: 1,
		// backgroundColor: colors.red,
		paddingVertical: 8,
		paddingHorizontal: 15,
	},
	card: {
		backgroundColor: colors.white,
		borderRadius: 15,
		elevation: 10,
		flexDirection: 'row',
		overflow: 'hidden',
		shadowRadius: 20,
	},
	detailsContainer: {
		paddingHorizontal: 20,
		paddingVertical: 15,
	},
	image: {
		width: '40%',
		height: 120,
	},
	subTitle: {
		color: colors.dark,
		fontWeight: '200',
	},
	status: {
		fontWeight: '700',
		marginTop: 25,
	},
	title: {
		fontWeight: 'bold',
		marginBottom: 5,
	},
});

export default Card;

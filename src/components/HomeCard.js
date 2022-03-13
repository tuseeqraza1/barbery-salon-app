import React from 'react';
import { Text, View, StyleSheet, Dimensions } from 'react-native';

import colors from '../styles/colors';

const width = Dimensions.get('window').width;

function HomeCard({ title, subTitle }) {
	return (
		<View style={styles.screen}>
			<View style={styles.card}>
				<View style={styles.detailsContainer}>
					<Text style={styles.title}>{title}</Text>
					<Text style={styles.subTitle}>{subTitle}</Text>
				</View>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		paddingVertical: 8,
		paddingHorizontal: 10,
	},
	card: {
		flex: 1,
		backgroundColor: colors.white,
		borderRadius: 15,
		elevation: 10,
		flexDirection: 'row',
		overflow: 'hidden',
		shadowRadius: 30,
	},
	detailsContainer: {
		flex: 1,
		padding: 15,
	},
	subTitle: {
		color: colors.orange,
		fontSize: 20,
		marginTop: 15,
		textAlign: 'right',
	},
	title: {
		color: colors.black,
		fontSize: 14,
		fontWeight: '500',
		marginVertical: 5,
	},
});

export default HomeCard;

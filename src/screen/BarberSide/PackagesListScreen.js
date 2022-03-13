import React, { useEffect } from 'react';
import {
	View,
	FlatList,
	TouchableOpacity,
	Image,
	StyleSheet,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import LoadingIndicator from '../../components/LoadingIndicator';
import Card from '../../components/Card';
import colors from '../../styles/colors';

import { connect } from 'react-redux';
import { getPackages } from '../../redux/actions/packageAction';

function PackagesListScreen({
	navigation: { navigate },
	packages,
	getPackages,
	loading,
}) {
	useEffect(() => {
		getPackages();
		return () => {};
	}, []);

	return (
		<View style={styles.screen}>
			{loading && <LoadingIndicator />}
			{!loading && (
				<FlatList
					contentContainerStyle={{ paddingBottom: 15 }}
					style={styles.flatScreen}
					data={packages}
					keyExtractor={(pkg, index) => index.toString()}
					renderItem={({ item }) => (
						<Card
							title={item.name}
							subTitle={'Rs.' + item.cost}
							status={item.status}
							image={`data:${item.picture.type};base64,${item.picture.data}`}
							onPress={() => navigate('Package Details', { pkg: item })}
						/>
					)}
				/>
			)}
			<LinearGradient
				colors={[colors.orange, colors.red]}
				style={[styles.button]}
			>
				<TouchableOpacity onPress={() => navigate('Add Package')}>
					<Image
						style={styles.icon}
						source={require('../../assets/icons/plus.png')}
					/>
				</TouchableOpacity>
			</LinearGradient>
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
		bottom: 30,
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

const mapStateToProps = ({ packageReducer: { packages, loading } }) => ({
	packages,
	loading,
});

const mapActionToProps = { getPackages };

export default connect(mapStateToProps, mapActionToProps)(PackagesListScreen);

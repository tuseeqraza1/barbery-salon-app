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
import { getServices } from '../../redux/actions/serviceAction';

function ServicesListScreen({
	navigation: { navigate },
	services,
	getServices,
	loading,
}) {
	useEffect(() => {
		getServices();
		return () => {};
	}, []);

	return (
		<View style={styles.screen}>
			{loading && <LoadingIndicator />}
			{!loading && (
				<FlatList
					contentContainerStyle={{ paddingBottom: 15 }}
					style={styles.flatScreen}
					data={services}
					keyExtractor={(service, index) => index.toString()}
					renderItem={({ item }) => (
						<Card
							title={item.name}
							subTitle={'Rs.' + item.cost}
							status={item.status}
							image={`data:${item.picture.type};base64,${item.picture.data}`}
							onPress={() => navigate('Service Details', { service: item })}
						/>
					)}
				/>
			)}
			<LinearGradient
				colors={[colors.orange, colors.red]}
				style={[styles.button]}
			>
				<TouchableOpacity onPress={() => navigate('Add Service')}>
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

const mapStateToProps = ({ serviceReducer: { services, loading } }) => ({
	services,
	loading,
});

const mapActionToProps = { getServices };

export default connect(mapStateToProps, mapActionToProps)(ServicesListScreen);

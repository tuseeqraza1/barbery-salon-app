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
import SpecialistCard from '../../components/SpecialistCard';
import colors from '../../styles/colors';

import { connect } from 'react-redux';
import { getSpecialists } from '../../redux/actions/specialistAction';

const noColumns = 2;

function SpecialistScreen({
	navigation: { navigate },
	specialists,
	getSpecialists,
	loading,
}) {
	useEffect(() => {
		getSpecialists();
		return () => {};
	}, []);

	return (
		<View style={styles.screen}>
			{loading && <LoadingIndicator />}
			{!loading && (
				<FlatList
					contentContainerStyle={{ paddingBottom: 15 }}
					style={styles.card}
					numColumns={noColumns}
					data={specialists}
					keyExtractor={(Specialist, index) => index.toString()}
					renderItem={({ item }) => (
						<SpecialistCard
							title={item.name}
							status={item.status}
							image={`data:${item.picture.type};base64,${item.picture.data}`}
							onPress={() =>
								navigate('Specialist Details', { Specialist: item })
							}
						/>
					)}
				/>
			)}
			<LinearGradient
				colors={[colors.orange, colors.red]}
				style={[styles.button]}
			>
				<TouchableOpacity onPress={() => navigate('Add Specialist')}>
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
		// paddingBottom: 10,
		backgroundColor: colors.white,
	},
	card: {
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

const mapStateToProps = ({ specialistReducer: { specialists, loading } }) => ({
	specialists,
	loading,
});

const mapActionToProps = { getSpecialists };

export default connect(mapStateToProps, mapActionToProps)(SpecialistScreen);

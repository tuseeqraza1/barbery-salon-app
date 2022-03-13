import 'react-native-gesture-handler';
import React from 'react';

import BarberAuth from './src/components/AuthStack';
import axios from 'axios';
import { connect } from 'react-redux';
import setAuthToken from './config';
import { StatusBar } from 'react-native';
import colors from './src/styles/colors';

function App({ user }) {
	return (
		<>
			<StatusBar backgroundColor={colors.red} />
			<BarberAuth />
		</>
	);
}

const mapStateToProps = ({ mainRecords: { user } }) => ({ user });

export default connect(mapStateToProps)(App);

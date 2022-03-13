import 'react-native-gesture-handler';
import React from 'react';

import BarberAuth from './src/components/AuthStack';
import axios from 'axios';
import { connect } from 'react-redux';
import setAuthToken from './config';
import { StatusBar } from 'react-native';
import colors from './src/styles/colors';

// axios.defaults.baseURL = 'http://barbery.herokuapp.com/api';

// import Pusher from 'pusher-js/react-native';
// Pusher.logToConsole = true;

// const pusher = new Pusher('c40fc88b49979eb832b7', {
// 	cluster: 'ap2',
// });

function App({ user }) {
	// if (token) {
	// 	console.log('object');
	// 	setAuthToken(token);
	// }
	// if (user) {
	// const channel = pusher.subscribe('notification');
	// channel.bind('appointment', (data) => {
	// 	console.log('appointment', data);
	// });
	// channel.bind('review', (data) => {
	// 	console.log('review', data);
	// });
	// // }

	return (
		<>
			<StatusBar backgroundColor={colors.red} />
			<BarberAuth />
		</>
	);
	// return <Check />;
}

const mapStateToProps = ({ mainRecords: { user } }) => ({ user });

export default connect(mapStateToProps)(App);

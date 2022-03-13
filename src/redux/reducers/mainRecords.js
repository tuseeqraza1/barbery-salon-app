import {
	SET_CURRENT_USER,
	SET_UPDATE_LOADING,
	UPDATE_CURRENT_USER,
	GET_RECORDS,
	UPDATE_RECORDS,
	LOGOUT,
} from '../types';

const initialState = {
	user: null,
	records: [],
	loading: false,
};

export default (state = initialState, action) => {
	const { type, payload } = action;

	switch (type) {
		case UPDATE_CURRENT_USER:
		case SET_CURRENT_USER:
			return {
				...state,
				user: payload,
				loading: false,
			};
		case GET_RECORDS:
			return {
				...state,
				records: payload,
				loading: false,
			};
		case SET_UPDATE_LOADING:
			return {
				...state,
				loading: payload,
			};
		// case UPDATE_RECORDS:
		//   return{
		//     ...state,
		//     records: state.records.map((record) => ())
		//   }
		case LOGOUT:
			return initialState;
		default:
			return state;
	}
};

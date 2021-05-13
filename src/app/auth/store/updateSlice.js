import { createSlice } from '@reduxjs/toolkit';
import { showMessage } from 'app/store/fuse/messageSlice';
import firebaseService from 'app/services/firebaseService';
import jwtService from 'app/services/jwtService';
import { updateUserSettingsFirebase, setUserData } from './userSlice';
import history from '@history';

export const submitRegister = ({ displayName, password, email }) => async dispatch => {
	return jwtService
		.createUser({
			displayName,
			password,
			email
		})
		.then(user => {
			dispatch(setUserData(user));
			return dispatch(updateSuccess());
		})
		.catch(error => {
			return dispatch(updateError(error));
		});
};

export const updateWithFirebase = model => async dispatch => {
	if (!firebaseService.auth) {
		console.warn("Firebase Service didn't initialize, check your configuration");

		return () => false;
	} 
	const { displayName, profile, promoCode } = model;
	
	dispatch(updateUserSettingsFirebase({
		displayName,
		profile,
		promoCode,
	}));
	return dispatch(updateSuccess());
};

const initialState = {
	success: false,
	error: {
		username: null,
		password: null
	}
};

const updateSlice = createSlice({
	name: 'auth/register',
	initialState,
	reducers: {
		updateSuccess: (state, action) => {
			state.success = true;			
		},
		updateError: (state, action) => {
			state.success = false;
			state.error = action.payload;
		}
	},
	extraReducers: {}
});

export const { updateSuccess, updateError } = updateSlice.actions;

export default updateSlice.reducer;

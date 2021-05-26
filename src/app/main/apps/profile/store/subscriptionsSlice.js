import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';
import firebaseService from 'app/services/firebaseService';

export const getSubscription = createAsyncThunk('profileApp/subscription', params => 
	new Promise((resolve, reject) => {
		
		var dbRef = firebaseService.db.ref(`subscriptions/${params.uid}/`);
		var subscriptions = []; 
		dbRef.on('value', snapshot => { 
			const data = snapshot.val();

			if(data) {
				Object.keys(data).map(key => {
					subscriptions.push(data[key]);
				});
			} else {
				resolve(subscriptions)
			}
						
			resolve(subscriptions);
		});
	})		
);	

export const saveSubscription = createAsyncThunk('profileApp/subscription/save', async (params, { dispatch, getState } ) => { 
	const response = await axios.post('/api/profile-app/subscription/save', params);
	const data = await response.data;
	
	return dispatch(getSubscription({ uid: params.uid }));
});

export const deleteSubscription = createAsyncThunk('profileApp/subscription/delete', async (params, { dispatch, getState } ) => { 
	const response = await axios.post('/api/profile-app/subscription/delete', params);
	const data = await response.data;
	
	return dispatch(getSubscription({ uid: params.uid }));
});

const subscriptionsAdapter = createEntityAdapter({});

export const { selectAll: selectSubscriptions, selectById: selectSubscriptionsById } = subscriptionsAdapter.getSelectors(
	state => state.profileApp.subscriptions
);

const subscriptionsSlice = createSlice({
	name: 'profileApp/subscriptions',
	initialState: subscriptionsAdapter.getInitialState({}),
	reducers: {},
	extraReducers: {
		[getSubscription.fulfilled]: subscriptionsAdapter.setAll,
	}
});

export const {} = subscriptionsSlice.actions;

export default subscriptionsSlice.reducer;

import { combineReducers } from '@reduxjs/toolkit';
import business from './businessSlice';
import profile from './profileSlice';
import creditCard from './creditCardSlice';

const reducer = combineReducers({
	business,	
	profile,
	creditCard,	
});

export default reducer;

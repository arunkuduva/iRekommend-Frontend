import { combineReducers } from '@reduxjs/toolkit';
import projects from './projectsSlice';
import widgets from './widgetsSlice';
import order from './orderSlice';
import orders from './ordersSlice';
import product from './productSlice';
import products from './productsSlice';

const reducer = combineReducers({
	widgets,
	projects,
	products,
	product,
	orders,
	order
});

export default reducer;

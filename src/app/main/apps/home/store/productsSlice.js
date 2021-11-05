import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';
import { eCommerceDB}  from './../../../../../@fake-db/db/e-commerce-db'

export const getProducts = createAsyncThunk('eCommerceApp/products/getProducts', async () => {
	
	// const response = await axios.get('/api/e-commerce-app/products');
	// const data = await response.data;
	const data = eCommerceDB.products
	return data;
});

export const removeProducts = createAsyncThunk(
	'eCommerceApp/products/removeProducts',
	async (productIds, { dispatch, getState }) => {
		const response = await axios.post('/api/e-commerce-app/remove-products', { productIds });
		const data = await response.data;

		dispatch(getProducts());

		return data;
	}
);

const productsAdapter = createEntityAdapter({});

export const { selectAll: selectProducts, selectById: selectProductById } = productsAdapter.getSelectors(
	state => state.eCommerceApp.products
);

const productsSlice = createSlice({
	name: 'eCommerceApp/products',
	initialState: productsAdapter.getInitialState({
		searchText: ''
	}),
	reducers: {
		setProductsSearchText: {
			reducer: (state, action) => {
				state.searchText = action.payload;
			},
			prepare: event => ({ payload: event.target.value || '' })
		}
	},
	extraReducers: {
		[getProducts.fulfilled]: productsAdapter.setAll
	}
});

export const { setProductsSearchText } = productsSlice.actions;

export default productsSlice.reducer;

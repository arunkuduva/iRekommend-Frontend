import { useForm } from '@fuse/hooks';
import FuseUtils from '@fuse/utils/FuseUtils';
import { TextFieldFormsy } from '@fuse/core/formsy';
import InputAdornment from '@material-ui/core/InputAdornment';
import Formsy from 'formsy-react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Icon from '@material-ui/core/Icon';
import TextField from '@material-ui/core/TextField';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import _ from '@lodash';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { openMailDialog, closeMailDialog } from './store/projectsSlice';
import IconButton from '@material-ui/core/IconButton';
import { showMessage } from 'app/store/fuse/messageSlice';

const defaultFormState = {
	email: '',
};

function AddUserDialog(props) {
	const dispatch = useDispatch();	
	const mailDialog = useSelector(({ projectDashboardApp }) => projectDashboardApp.projects.mailDialog);	
	const { form, handleChange, setForm } = useForm(defaultFormState); 	
	const formRef = useRef(null);

	const initDialog = useCallback(() => {	
		setForm({
			...mailDialog.data,
		}); 
	}, [mailDialog.data, setForm]);

	const [isFormValid, setIsFormValid] = useState(false);

	useEffect(() => {		
		if (mailDialog.props.open) {
			initDialog();
		}
	}, [mailDialog.props.open, initDialog]);

	function closeComposeDialog() {
		return dispatch(closeMailDialog());
	}

	function disableButton() {
		setIsFormValid(false);
	}

	function enableButton() {
		setIsFormValid(true);
	}

	function handleSubmit(event) {
		mailDialog.data.e();
		event.preventDefault();		
		closeComposeDialog();
	}

	function handleRemove() {
		closeComposeDialog();
	}

	return (
		<Dialog
			classes={{
				paper: 'm-24 rounded-8'
			}}
			{...mailDialog.props}
			onClose={closeComposeDialog}
			fullWidth
			maxWidth="xs"
		>
			<AppBar position="static" className="shadow-md">
				<Toolbar className="flex w-full">
					<Typography variant="subtitle1" color="inherit">
						Please confirm the email ID
					</Typography>
				</Toolbar>
			</AppBar>
			<Formsy 
				onValidSubmit={handleSubmit}
					onValid={enableButton}
					onInvalid={disableButton}
					ref={formRef} 
					className="flex flex-col md:overflow-hidden"
				>
				<Typography className='self-center mt-24' variant="subtitle1" color="inherit">
					Edit the email ID here
				</Typography>
				<DialogContent classes={{ root: 'px-24 pb-24' }}>					
					<div className="flex">
						<div className="flex flex-col justify-center w-full">
							<TextFieldFormsy
								className="mb-16"
								type="email"
								name="email"
								label="Email"
								value={form.email}
								validations="isEmail"					
								validationErrors={{
									isEmail: 'Please enter a valid email'
								}}
								validationErrors={{
									isEmail: 'Please enter a valid email'
								}}
								onChange={handleChange}
								InputProps={{
									endAdornment: (
										<InputAdornment position="end">
											<Icon className="text-20" color="action">
												email
											</Icon>
										</InputAdornment>
									)
								}}
								variant="outlined"
								required
							/> 	
						</div>
					</div>				
				</DialogContent>				
				<DialogActions className="justify-between p-8">
					<div className="px-16">
						<Button
							variant="contained"
							color="primary"
							type="submit"
							onClick={handleSubmit}
							disabled={!isFormValid}
						>
							OK
						</Button>
					</div>
					<IconButton onClick={handleRemove}>
						<Icon>delete</Icon>
					</IconButton>
				</DialogActions>
			</Formsy>
		</Dialog>
	);
}

export default AddUserDialog;

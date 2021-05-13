import { TextFieldFormsy } from '@fuse/core/formsy';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import InputAdornment from '@material-ui/core/InputAdornment';
import Avatar from '@material-ui/core/Avatar';
import Formsy from 'formsy-react';
import Typography from '@material-ui/core/Typography';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { updateWithFirebase } from 'app/auth/store/updateSlice';
import { setActiveStep } from '../store/profileSlice';
import { useForm } from '@fuse/hooks';
import { Link } from 'react-router-dom'

const useStyles = makeStyles(theme => ({
	upload: {
		'& > *': {
			margin: theme.spacing(1)
		}
	},
	input: {
		display: 'none'
	}
}));

function FirebaseUpdateTab(props) {
	const dispatch = useDispatch();
	const register = useSelector(({ auth }) => auth.register);
	const user = useSelector(({ auth }) => auth.user); 
	const classes = useStyles();

	const { form, handleChange, setForm } = useForm({ ...user.data, promoCode: user.data.hasOwnProperty('promoCode') ? user.data.promoCode : '' });
	const [profileImg, setProfileImgData] = useState('');
	const [profileObject, setProfileObject] = useState();
	const [isFormValid, setIsFormValid] = useState(false);
	const formRef = useRef(null);

	useEffect(() => {
		if (register.error && (register.error.username || register.error.password || register.error.email)) {
			formRef.current.updateInputsWithError({
				...register.error
			});
			disableButton();
		}
	}, [register]);

	function disableButton() {
		setIsFormValid(false);
	}

	function enableButton() {
		setIsFormValid(true);
	}

	function handleSubmit(model) { 			
		if (profileObject) model["profile"] = profileObject;
		else model["profile"] = ''; 
		dispatch(updateWithFirebase(model)).then(() => {
			dispatch(setActiveStep(1));
		});
	}

	function onChangeProfile(img) { 
		setProfileObject(img);
		var reader = new FileReader();
		reader.readAsBinaryString(img);

		reader.onload = function () {
			setProfileImgData(btoa(reader.result));
		};
		reader.onerror = function () {
			console.log('there are some problems');
		};
	}

	return (
		<div className="w-full">
			<Formsy
				onValidSubmit={handleSubmit}
				onValid={enableButton}
				onInvalid={disableButton}
				ref={formRef}
				className="flex flex-col justify-center w-full"
			>
				<div
					style={{
						marginBottom: 20,
						display: 'flex',
						flexDirection: 'row',
						alignContent: 'center',
						alignItems: 'center'
					}}
				>
					<Avatar className="w-96 h-96" src={profileImg ? `data:image/png;base64,${profileImg}` : `${form.photoURL}`} />
					<div className={classes.upload}>
						<TextFieldFormsy
							name="profile"
							accept="image/png"
							className={classes.input}
							id="contained-button-file"
							multiple
							type="file"
							onChange={e => onChangeProfile(e.target.files[0])}
						/>
						<label htmlFor="contained-button-file">
							<Button variant="contained" color="primary" component="span">
								{profileImg ? `Change` : `Add image`}
							</Button>
						</label>
						{profileImg && (
							<Button
								variant="outlined"
								color="primary"
								component="span"
								onClick={() => setProfileImgData('')}
							>
								Delete
							</Button>
						)}
					</div>
				</div>
				<TextFieldFormsy
					className="mb-16"
					type="text"
					name="displayName"
					label="Display name"
					value={form.displayName}
					onChange={handleChange}
					validations={{
						minLength: 4
					}}
					validationErrors={{
						minLength: 'Min character length is 4'
					}}
					InputProps={{
						endAdornment: (
							<InputAdornment position="end">
								<Icon className="text-20" color="action">
									person
								</Icon>
							</InputAdornment>
						)
					}}
					variant="outlined"
					required
				/>

				<TextFieldFormsy
					className="mb-16"
					type="text"
					name="promoCode"
					label="Promo Code"
					value={form.promoCode}
					onChange={handleChange}					
					InputProps={{
						endAdornment: (
							<InputAdornment position="end">
								<Icon className="text-20" color="action">
									vpn_lock
								</Icon>
							</InputAdornment>
						)
					}}
					variant="outlined"
					// required
				/>
			
				<div className="flex flex-col items-center justify-center pb-32">
					<Typography>
						<span className="font-medium mr-8">Reach out to</span>
						<Link className="font-medium mr-8">Arvind@jobsage.app</Link>  
						<span className="font-medium">for your promo code</span>		
					</Typography>				
				</div>

				<Button
					type="submit"
					variant="contained"
					color="primary"
					className="w-full mx-auto mt-16 normal-case"
					aria-label="UPDATE WITH FIREBASE"
					disabled={!isFormValid}
				>
					Update
				</Button>
			</Formsy>
		</div>
	);
}

export default FirebaseUpdateTab;

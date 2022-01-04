import FuseAnimateGroup from '@fuse/core/FuseAnimateGroup';
import FusePageSimple from '@fuse/core/FusePageSimple';
import Card from '@material-ui/core/Card';
import Toolbar from '@material-ui/core/Toolbar';
import AppBar from '@material-ui/core/AppBar';

import CardContent from '@material-ui/core/CardContent';
import Hidden from '@material-ui/core/Hidden';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import withReducer from 'app/store/withReducer';
import _ from '@lodash';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import reducer from './store';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import { openMailDialog } from './store/projectsSlice';
import Products from './Products'
import MailDialog from './MailDialog';
import axios from 'axios';
import { API_URL } from 'app/fuse-configs/endpointConfig';
import { logoutUser } from 'app/auth/store/userSlice';
import { DataGrid } from '@material-ui/data-grid';
import * as userSliceData from 'app/auth/store/userSlice';
import * as loginSliceData from 'app/auth/store/loginSlice';


import firebaseService from 'app/services/firebaseService';


import Step1 from './steps/step1';
import Step2 from './steps/step2';
import Step3 from './steps/step3';
//import FirebaseService from 'app/services/firebaseService';

//import { app1 } from "./firebase";

const useStyles = makeStyles(theme => ({
	content: {
		'& canvas': {
			maxHeight: '100%'
		}
	},
	selectedProject: {
		background: theme.palette.primary.main,
		color: theme.palette.primary.contrastText,
		borderRadius: '8px 0 0 0'
	},
	projectMenuButton: {
		background: theme.palette.primary.main,
		color: theme.palette.primary.contrastText,
		borderRadius: '0 8px 0 0',
		marginLeft: 1
	}
}));

function ProjectDashboardApp(props) {
	const dispatch = useDispatch();
	const classes = useStyles(props);
	const pageLayout = useRef(null);
	const user = useSelector(({ auth }) => auth.user); 
	const email = useSelector(({ projectDashboardApp }) => projectDashboardApp.projects.email); 
	const resumeFileName = useSelector(({ projectDashboardApp }) => projectDashboardApp.projects.resumeFileName.name); 
	const templateFileName = useSelector(({ projectDashboardApp }) => projectDashboardApp.projects.templateFileName.name); 
	const isFileUploadCompleted = useSelector(({ projectDashboardApp }) => projectDashboardApp.projects.isFileUploadCompleted); 
	const [activeStep, setActiveStep] = useState(0);
	const [trialState, setTrialState] = useState(0);

	const [fileUrl, setFileUrl] = useState('');
  	const [users, setUsers] = React.useState([]);
	// console.log('email at the start' || user  || ' ')
	// console.log('userSliceData at the start' )
	// console.log(userSliceData.getUserData())

	// console.log('userSliceData at the start' )
	// console.log(loginSliceData)
	

	useEffect(() => {
		if(!user.data.emailVerified) {
			dispatch(logoutUser());
			return;
		}
		axios.get(`${API_URL}/dashboard/${user.uid}`).then(response => { 
			if(response.data) {
				setTrialState(response.data.flag);
			}
		})
	}, []);

	function getSteps() {
		return ['Upload Resume'
		//, 'Download Recommendations'
//	, 'Select Matching Candidates'
	];
	}

	const steps = getSteps();

	const openDialog = () => {
		dispatch(openMailDialog({ email, handleNext: () => handleNext() }));
	};

	const handleNext = () => { 
		setActiveStep(prevActiveStep => prevActiveStep + 1);
	};

	const handleBack = () => {
		setActiveStep(prevActiveStep => prevActiveStep - 1);
	};

	const onSubmit = async (e) => {
	
		console.log('resume uploaded')
	}

	const onFileChange = async (e) => {
				const file = e.target.files[0];
 				const storageRef = firebaseService.firestoredb.storage().ref();

			//	const storageRef = firebaseService.storage().ref();
				const fileRef = await storageRef.child(`Files/${file.name}`);
				console.log('file.name ' + e.target.files[0])
				await fileRef.put(file);
				console.log(storageRef)
				console.log(fileRef.storage)
				console.log(fileRef.fullPath)
				console.log(fileRef.getMetadata())

				const fileDownladURL = await fileRef.getDownloadURL()
				
				setFileUrl(fileDownladURL);

				console.log('fileDownladURL ' + fileUrl);
				handleResumeParser(fileDownladURL)
  };


	const handleResumeParser = async (fileDownladURL) => {
		console.log('handle resue parse')

		console.log( firebaseService.auth.currentUser.email)
		// const storageRef = firebaseService.firestoredb.storage().ref()
		// // const storageRef = firebaseService.firestoredb.storage().ref();

		//  const fileRef = storageRef.child(resumeFileName);
		//  await fileRef.put(resumeFileName);
		//  setFileUrl(await fileRef.getDownloadURL());

//		 console.log('fileUrl ' || resumeFileName  || ' ' || fileUrl)
			console.log('email ' + email  + ' ')
			axios.get('https://irekommend-ml-code-lle.uc.r.appspot.com/process-only-resumes' ,{params: {
					url1: fileDownladURL, //'gs://jobsage-sai-temp/test_resume_28.06.2021.zip',
					user_email: firebaseService.auth.currentUser.email }// 'arvindrkrishnen11@gmail.com'}
				}
				)
				.then ((data)=> {
					console.log('rekommender call completed ')
					console.log(data.data)
				})
				.catch((e)=>{
							console.log(e)
				})

	}
	function getStepContent(stepIndex) {
		switch (stepIndex) {
			case 0:
				return <Step1 />;
			case 1:
				return <Step2 />;
			// case 2:
			// 	return <Step3 />;
			default:
				return 'Unknown stepIndex';
		}
	}

	const showRecommendationsOnline = () =>{


	}

	return (
		<>
			<FusePageSimple
				classes={{
					toolbar: 'min-h-48 h-48',
					rightSidebar: 'w-288',
					content: classes.content
				}}
				header={
					<Card className="w-full mb-16 rounded-8 shadow">
						<AppBar position="static" elevation={0}>
								<Toolbar className="px-8">
									<div className="p-24 rounded-8 shadow">
									<h3>{`Welcome ${user.data.displayName}!`}</h3>
									</div>
								</Toolbar>
						</AppBar>
					</Card>
					
				}
				content={

							
					<div className="p-12">
						<div className='p-12'>
							<Stepper activeStep={activeStep} alternativeLabel>
								{steps.map(label => (
									<Step key={label}>
										<StepLabel>{label}</StepLabel>
									</Step>
								))}
							</Stepper>
						</div>
						<div>
							<Typography className={classes.instructions}>{getStepContent(activeStep)}</Typography>
							<div style={{ position: 'absolute', bottom: 20, right: 20 }}>
							
							{/* <form onSubmit={onSubmit}>
								<input type="file" onChange={onFileChange} />
								<input type="text" name="username" placeholder="NAME" />
								<button>Submit</button>
							</form> */}

							{activeStep === 1 ?
								<div>
									<Button 
									variant="contained" 
									color="primary" 
									disabled={!isFileUploadCompleted} 
									onClick={handleBack} 
									className={classes.backButton}
								>
									Back
								</Button>
								{/* <Button 
									variant="contained" 
									color="primary" 
									//disabled={resumeFileName && templateFileName && email && trialState>0 ? false : true} 
									onClick={handleNext}
								>
									{`Continue`}
								</Button> */}
								</div>
									 :																
								// <Button 
								// 	variant="contained" 
								// 	color="primary" 
								// 	disabled={resumeFileName ? false : true} 
								// 	//disabled={email && trialState>0 ? false : true} 
								// 	//onClick={handleResumeParser}
								// >
								// 	{`Parse Resume`}
								// </Button>
								<div>
									</div>
							
							}
							
							</div>
						</div>
					</div>

				}
				ref={pageLayout}
			/>
			<MailDialog />
			{/* <Products /> */}
		</>
	);
}

export default withReducer('projectDashboardApp', reducer)(ProjectDashboardApp);

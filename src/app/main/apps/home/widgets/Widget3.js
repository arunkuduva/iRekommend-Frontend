import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import ToolTip from '@material-ui/core/ToolTip';
import { setResumeFileName } from '../store/projectsSlice';
import { showMessage } from 'app/store/fuse/messageSlice';
import { closeMailDialog, setEmail, setProgress, setIsFileUploadCompleted } from './../store/projectsSlice'

import { getFilenameAndExtension } from 'app/utils';
import axios from 'axios';


import firebaseService from 'app/services/firebaseService';


const useStyles = makeStyles(theme => ({
	root: {
		'& > *': {
			margin: theme.spacing(1)
		}
	},
	input: {
		display: 'none'
	},
	alignright:{
		float: 'right'
	}
}));

function Widget3(props) {
	const classes = useStyles();
	const dispatch = useDispatch();
	const resumeFileName = useSelector(({ projectDashboardApp }) => projectDashboardApp.projects.resumeFileName.name); 	
	const [fileUrl, setFileUrl] = useState('');

	const handleChange = async (e) => { 
		const ext = getFilenameAndExtension(e.target.value)[1];
		const file = e.target.files[0];
		if(ext==='zip' || ext==='rar') {
			dispatch(setResumeFileName(file));
       		const storageRef = firebaseService.firestoredb.storage().ref();

				//	const storageRef = firebaseService.storage().ref();
				const fileRef = await storageRef.child(`Files/${file.name}`);
				console.log('file.name ' + e.target.files[0])
				let uploadTask = await fileRef.put(file);
				dispatch(setIsFileUploadCompleted(true));

				const fileDownladURL = await fileRef.getDownloadURL()
				
				setFileUrl(fileDownladURL);
				dispatch(showMessage({ message: 'Your file has been uploaded to the Server ! Thank you', variant: 'normal' }));
				console.log('fileDownladURL ' + fileUrl);
				handleResumeParser(fileDownladURL, file.name)
			return
		}
		
		dispatch(showMessage({ message: 'You can only upload *.zip files', variant: 'warning' }));
		return false;		
	}


const handleResumeParser = async (fileDownladURL, fileName) => {
		console.log('handle resue parse')

		console.log( firebaseService.auth.currentUser.email)
		// const storageRef = firebaseService.firestoredb.storage().ref()
		// // const storageRef = firebaseService.firestoredb.storage().ref();

		//  const fileRef = storageRef.child(resumeFileName);
		//  await fileRef.put(resumeFileName);
		//  setFileUrl(await fileRef.getDownloadURL());

//		 console.log('fileUrl ' || resumeFileName  || ' ' || fileUrl)
//			console.log('email ' + email  + ' ')
			axios.get('https://irekommend-ml-code-lle.uc.r.appspot.com/process-only-resumes' ,{params: {
					url1: 'gs://jobsage-sai-ui-firebase-001.appspot.com/Files/'+fileName, //fileDownladURL, //'gs://jobsage-sai-temp/test_resume_28.06.2021.zip',
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

	return (
		<Paper className="w-full rounded-8 shadow">
			<div className="flex items-center px-16 h-52 border-b-1">
				<Typography className="text-15 flex w-full" color="black">
					<span className="truncate">{`Zip your resume & upload it here`}</span>
				</Typography>
			</div>
			
			{resumeFileName && 
				<div className="flex items-center px-16 h-52 border-b-1">
					<Typography className="text-15 flex w-full" color="black">
						<span className="truncate">{`${resumeFileName}`}</span>
						{/* <span className="alignright">Upload Completed</span> */}
					</Typography>
				</div>
			}
			
			<div className="text-center pt-12 pb-28">
				<div className={classes.root}>
					<input 
						accept=".zip" 
						className={classes.input} 
						id="contained-button-resume-file" 
						multiple 
						type="file" 
						onChange={e => handleChange(e)}
					/>
					<label htmlFor="contained-button-resume-file">
					<ToolTip title={`Upload your resumes as .zip file`}>										
						<Button variant="contained" color="primary" startIcon={<CloudUploadIcon />} component="span">
							Upload
						</Button>
					</ToolTip>	
					</label>
				</div>
			</div>
		</Paper>
	);
}

export default React.memo(Widget3);

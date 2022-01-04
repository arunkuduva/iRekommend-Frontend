import FuseAnimateGroup from '@fuse/core/FuseAnimateGroup';
import FuseLoading from '@fuse/core/FuseLoading';
import withReducer from 'app/store/withReducer';
import _ from '@lodash';
import React, { useState, useEffect, useRef } from 'react';
import reducer from './store';
import SaveIcon from '@material-ui/icons/Save';
import Button from '@material-ui/core/Button';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardTimePicker, KeyboardDatePicker } from '@material-ui/pickers';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import FusePageSimple from '@fuse/core/FusePageSimple';
import Widget1 from './widgets/Widget1';
import Paper from '@material-ui/core/Paper';
import moment from 'moment';
import { showMessage } from 'app/store/fuse/messageSlice';
import { useDispatch, useSelector } from 'react-redux';
import { getFiles, selectFiles } from './store/filesSlice';
import axios from 'axios';
import 'firebase/auth';
import 'firebase/storage';
import { downloadURL, file_downloads } from 'app/utils';
import { API_URL } from 'app/fuse-configs/endpointConfig';


import AppBar from '@material-ui/core/AppBar';
import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';
import {ShowRecommendations1}	from './showRecommendations1'
import firebaseService from 'app/services/firebaseService';


const TMY = {
	T: [ 'Trial', 'Trial' ],
	M: [ 'Month to Date', 'Monthly' ],
	Y: [ 'Year to Date', 'Yearly' ]
};

let w = {
	widget1: {
		currentRange: 'requirements',
		id: 'widget1',
		label: 'Roles Processed',
		value: '0',
		des: ''
	},
	widget2: {
		currentRange: 'resumes',
		id: 'widget2',
		label: 'Roles Quota Available',
		value: '0',
		des: ''
	},
	widget3: {
		currentRange: 'requirements',
		id: 'widget3',
		label: 'Resumes Processed',
		value: '0',
		des: ''
	},
	widget4: {
		currentRange: 'resumes',
		id: 'widget4',
		label: 'Resumes Quota Available',
		value: '0',
		des: ''
	}
};

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
	},
	paper: {
		display: 'flex',
		flexWrap: 'wrap',
		justifyContent: 'center',
		'& > *': {
			padding: theme.spacing(3),
		},
		paddingBottom: 12
	},
	calendar: {
		display: 'flex',
		flexWrap: 'wrap',
		justifyContent: 'center',
		'& > *': {
			marginTop: theme.spacing(1),
			padding: theme.spacing(2)
		}
	}
}));

const DashboardApp = (props,a,b)  => {
	const dispatch = useDispatch();
	const classes = useStyles(props);
	const pageLayout = useRef(null);
	const [widgets, setWidgets] = useState(w);
	const [enableRecommendButton , setenableRecommendButton] = useState(false)
	const [ShowRecommendations , setShowRecommendations] = useState(false)
	const [roleDescription , setRoleDescription] = useState('')
	const [general , setGeneral] = useState([])
	const user = useSelector(({ auth }) => auth.user);
	const files = useSelector(selectFiles); 
	const [fromDate, setFromDate] = useState(moment().date(1));
	const [toDate, setToDate] = useState(moment()); 
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		axios.put(`${API_URL}/dashboard/${user.data.email}`).then((response) => {
			const data = response.data; 
			w = {
				...w, widget1: {
					...w.widget1,
					value: data.roles_processed ? data.roles_processed : 0,
					des: TMY[data.flag][0]
				}
			};
			w = {
				...w, widget2: {
					...widgets.widget2,
					value: data.roles_quota_available ? data.roles_quota_available : 0,
					des: TMY[data.flag][1] 
				}
			};
			w = {
				...w, widget3: {
					...w.widget3,
					value: data.resumes_processed ? data.resumes_processed : 0,
					des: TMY[data.flag][0] 
				}
			};
			w = {
				...w, widget4: {
					...w.widget4,
					value: data.resumes_quota_available ? data.resumes_quota_available : 0,
					des: TMY[data.flag][1] 
				}
			};

			setLoading(false);
			setWidgets(w);
		});
	}, [user]);

	useEffect(() => {
		if(toDate && fromDate) { 
			dispatch(getFiles({
				 uid: user.uid, 
				 toDate: moment(toDate).format('x'), 
				 fromDate: moment(fromDate).format('x') 
			}));
		}
	}, [toDate, fromDate]);

	const handleFromDateChange = date => {
		if(date > toDate) {
			dispatch(showMessage({ message: 'Please select correct date.', variant: 'warning' }));
			return;
		}
		setFromDate(date);
	};

	const handleToDateChange = date => {
		if(date < fromDate) {
			dispatch(showMessage({ message: 'Please select correct date.', variant: 'warning' }));
			return;
		} else if(date > moment()) {
			dispatch(showMessage({ message: 'Please select correct date.', variant: 'warning' }));
			return;
		}
		setToDate(date);
	};

	const handleDownload = () => { 
		// downloadFiles(files);
		const urls = [];
		files.map(f => {		
			// downloadURL(f.resumeFileDownloadURL, `${user.data.email}_${f.timestamp}_${f.resumeFileName}`);
			// downloadURL(f.templateFileDownloadURL, `${user.data.email}_${f.timestamp}_${f.templateFileName}`);	
			urls.push(f.resumeFileDownloadURL);
			urls.push(f.templateFileDownloadURL);
		}); console.log('===============================', urls)
		file_downloads(urls)
	}

	// if(loading) {
	// 	return <FuseLoading />
	// }
	  
				// let	l_general = 
				// 	[
				// 	{fileName : 'Arun.docx', RelevancyScore : '1' , explanableAI:' loren ipsumsk s;fdads dfhasljg ljsadflskjg loren ipsumsk s;fdads dfhasljg ljsadflskjg loren ipsumsk s;fdads dfhasljg ljsadflskjg loren ipsumsk s;fdads dfhasljg ljsadflskjg', relevantSkills: 'React , Amgular, Vue', githubLink : 'github.com'},
				// {fileName : 'prem.docx', RelevancyScore : '400' , explanableAI:' loren ipsumsk s;fdads dfhasljg ljsadflskjg loren ipsumsk s;fdads dfhasljg ljsadflskjg loren ipsumsk s;fdads dfhasljg ljsadflskjg', relevantSkills: 'React , Amgular, Vue',githubLink : 'github.com'},
				// {fileName : 'kuduva.docx', RelevancyScore : '400' , explanableAI:' loren ipsumsk s;fdads dfhasljg ljsadflskjg loren ipsumsk s;fdads dfhasljg ljsadflskjg loren ipsumsk s;fdads dfhasljg ljsadflskjg',relevantSkills: 'React , Amgular, Vue', githubLink : 'github.com'}
				// 	]
	
	const handleChange = event => {
    		//this.setState({value: event.target.value});
			setenableRecommendButton(true)
			setRoleDescription(event.target.value)
			console.log('inside handle change ' || event.target.value)
  }
	
  const handleRecommendations = async (event) =>{

	await setShowRecommendations(true)
	console.log('inside handleRecommendations')
	setLoading(true);
	const data = 
	await axios.get('https://irekommend-ml-code-lle.uc.r.appspot.com/role-resume-matching' ,
	{params: {role_title: 'developer',
        role_desc:roleDescription,
      //  role_location: 'NA',
      //  education_level:'NA',
        years_of_exp_required: 'NA',
        resume_last_updated_range:'NA',
        user_email:firebaseService.auth.currentUser.email }
  			}
    )
	setLoading(false);
	console.log(data.data)
	await setGeneral(data.data)

    
  }

//     console.log('printing roleDescription')

//   console.log(roleDescription)

	return (
		<FusePageSimple
			classes={{
				toolbar: 'min-h-48 h-48',
				rightSidebar: 'w-288',
				content: classes.content
			}}
			header={
				<div className="p-24">
					<h3>{`Welcome ${user.data.displayName}!`}</h3>
				</div>
			}
			content={
				<div>
					<label className="p-24 block text-left" >
  						<span className="text-gray-700 rounded-lg">Please enter your Role Description here</span>
 						 <textarea className="form-textarea mt-1 block w-full rounded-lg" rows="7" 
						  name={roleDescription}
						  value={roleDescription}
						  onChange={handleChange}
						  placeholder="Enter some Job description"></textarea>
					</label> 
					<div className='p-24 block'>
							<Button 
									variant="contained" 
									color="primary" 
									disabled = {!enableRecommendButton}
									//disabled={resumeFileName ? false : true} 
									//disabled={email && trialState>0 ? false : true} 
									onClick={handleRecommendations}
								>
									{`Show recommendations`}
								</Button>
					</div>
					

				{!loading && ShowRecommendations  && general.map((general1, index)=>
					 (
					<ShowRecommendations1 general = {general1}
				 />
					))
					}
					{loading &&<FuseLoading />}
				</div>
			}
			ref={pageLayout}
		/>
	);
};

export default withReducer('dashboardApp', reducer)(DashboardApp);

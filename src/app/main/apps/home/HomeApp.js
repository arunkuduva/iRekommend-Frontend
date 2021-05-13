import FuseAnimateGroup from '@fuse/core/FuseAnimateGroup';
import FusePageSimple from '@fuse/core/FusePageSimple';
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
import MailDialog from './MailDialog'

import Step1 from './steps/step1';
import Step2 from './steps/step2';

const defaultState = {
	email: '',
	resumeFileName: '',
	templateFileName: '',	
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
	}
}));

function ProjectDashboardApp(props) {
	const dispatch = useDispatch();
	const classes = useStyles(props);
	const pageLayout = useRef(null);
	const user = useSelector(({ auth }) => auth.user); 
	const [activeStep, setActiveStep] = useState(0);

	const [state, setState] = useState(defaultState);

	const onStateChanged = (data) => { 
		
		setState({ 
			...state, 
			...data 
		});
	}

	function getSteps() {
		return ['Upload Resume & Roles', 'Download Recommendations'];
	}

	const steps = getSteps();

	const handleNext = async() => {
		dispatch(openMailDialog({ email: state.email, e: (prev) => setActiveStep(1) }));
	};

	const handleBack = () => {
		setActiveStep(prevActiveStep => prevActiveStep - 1);
		setState(defaultState);
	};

	const handleReset = () => {
		setActiveStep(0);
	};

	function getStepContent(stepIndex) {
		switch (stepIndex) {
			case 0:
				return <Step1 onStateChanged={onStateChanged} />;
			case 1:
				return <Step2 email={state.email} />;
			default:
				return 'Unknown stepIndex';
		}
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
					<div className="p-24">
						<h3>{`Welcome ${user.data.displayName}!`}</h3>
					</div>
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
								<Button 
									disabled={activeStep === 0} 
									onClick={handleBack} 
									className={classes.backButton}
								>
									Back
								</Button>
								{activeStep === steps.length - 1 ? (
									<></>
								) : (
									<Button 
										variant="contained" 
										color="primary" 
										disabled={state.resumeFileName && state.templateFileName && state.email ? false : true} 
										onClick={handleNext}
									>
										{`Continue`}
									</Button>
								)}
							</div>
						</div>
					</div>
				}
				ref={pageLayout}
			/>
			<MailDialog />
		</>
	);
}

export default withReducer('projectDashboardApp', reducer)(ProjectDashboardApp);

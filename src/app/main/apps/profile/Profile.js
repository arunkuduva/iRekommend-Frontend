import FuseAnimate from '@fuse/core/FuseAnimate';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';
import { darken } from '@material-ui/core/styles/colorManipulator';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ProfileTab from './tabs/UserProfileTab';
import BillingProfileTab from './tabs/BillingProfileTab';
import { useDispatch, useSelector } from 'react-redux';
import { setActiveStep } from './store/profileSlice';
import withReducer from 'app/store/withReducer'; 
import reducer from './store';

const useStyles = makeStyles(theme => ({
	root: {
		background: `linear-gradient(to left, ${theme.palette.primary.dark} 0%, ${darken(
			theme.palette.primary.dark,
			0.5
		)} 100%)`,
		color: theme.palette.primary.contrastText
	},
	leftSection: {},
	rightSection: {
		background: `linear-gradient(to left, ${theme.palette.primary.dark} 0%, ${darken(
			theme.palette.primary.dark,
			0.5
		)} 100%)`,
		color: theme.palette.primary.contrastText
	}
}));

function Profile() {
	const dispatch = useDispatch();
	const classes = useStyles();
	const activeStep = useSelector(({ profileApp }) => profileApp.profile.activeStep);

	return (
		<div
			className={clsx(
				classes.root,
				'flex flex-col flex-auto items-center justify-center flex-shrink-0 p-16 md:p-24'
			)}
		>
			<FuseAnimate animation="transition.expandIn">
				<div className="flex w-full max-w-400 rounded-12 shadow-2xl overflow-hidden">
					<Card
						className={clsx(
							classes.leftSection,
							'flex flex-col w-full max-w-sm items-center justify-center shadow-0'
						)}
						square
					>
						<CardContent className="flex flex-col items-center justify-center w-full py-96 max-w-320">
							<FuseAnimate delay={300}>
								<div className="flex w-full items-center justif-center mb-32">									
									<Stepper className="w-full" activeStep={activeStep} alternativeLabel>
										<Step key={'profile'}>
											<StepLabel onClick={(e) => { dispatch(setActiveStep(0)) }}>
												<Link className="font-medium">
													Profile
												</Link>
											</StepLabel>
										</Step>
										<Step key={'billing'}>
											<StepLabel onClick={(e) => { dispatch(setActiveStep(1)) }}>
												<Link className="font-medium">
													Billing Details
												</Link>
											</StepLabel>
										</Step>
									</Stepper>
								</div>								
							</FuseAnimate>
							{
								activeStep === 0 ? <ProfileTab /> : <BillingProfileTab />
							}							
						</CardContent>

						<div className="flex flex-col items-center justify-center pb-32">							
							{/* <Link className="font-medium mt-8" to="/">
								Back to Dashboard
							</Link> */}
						</div>
					</Card>
				</div>
			</FuseAnimate>
		</div>
	);
}

export default withReducer('profileApp', reducer)(Profile)
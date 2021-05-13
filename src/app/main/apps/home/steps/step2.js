import FuseAnimateGroup from '@fuse/core/FuseAnimateGroup';
import { makeStyles } from '@material-ui/core/styles';
import withReducer from 'app/store/withReducer';
import _ from '@lodash';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import reducer from '../store';
import { selectProjects, getProjects } from '../store/projectsSlice';
import { getWidgets, selectWidgets } from '../store/widgetsSlice';
import Typography from '@material-ui/core/Typography';
import Widget5 from '../widgets/Widget5';
import LinearProgress from '@material-ui/core/LinearProgress';
import Box from '@material-ui/core/Box';
import PropTypes from 'prop-types';

function LinearProgressWithLabel(props) {
	return (
		<Box display="flex" alignItems="center">
			<Box width="100%" mr={1}>
				<LinearProgress variant="determinate" {...props} />
			</Box>
			<Box minWidth={35}>
				<Typography variant="body2" color="textSecondary">{`${Math.round(props.value)}%`}</Typography>
			</Box>
		</Box>
	);
}

LinearProgressWithLabel.propTypes = {
	/**
	 * The value of the progress indicator for the determinate and buffer variants.
	 * Value between 0 and 100.
	 */
	value: PropTypes.number.isRequired
};

const useStyles = makeStyles({
	root: {
		padding: 30
	}
});

function Step2(props) {
	const classes = useStyles();
	const [progress, setProgress] = React.useState(0);
	const [flag, setFlag] = React.useState(false);

	React.useEffect(() => {
		var callOut = 0;
		const timer = setInterval(() => {
			callOut += 5;
			setProgress(prevProgress => (prevProgress >= 100 ? 5 : prevProgress + 5));
			if (callOut == 100) {
				setFlag(true);
				clearInterval(timer);
			}
		}, 100);
		return () => {
			clearInterval(timer);
		};
	}, []);

	return (
		<div className={classes.root}>
			{flag ? (
				<div>
					<FuseAnimateGroup
						className="flex flex-wrap"
						enter={{
							animation: 'transition.slideUpBigIn'
						}}
					>
						<Typography variant="h5" gutterBottom>
							{`Your recommendations have been sent to ${props.email}`}
						</Typography>
					</FuseAnimateGroup>
					<FuseAnimateGroup
						className="flex flex-wrap"
						enter={{
							animation: 'transition.slideUpBigIn'
						}}
					>
						{/* <div className="widget flex w-full sm:w-1/2 md:w-1/2 p-16" style={{marginBottom: 30}}>
							<Widget5 />
						</div> */}
					</FuseAnimateGroup>
				</div>
			) : (
				<div>
					<LinearProgressWithLabel value={progress} />
					<Typography variant="h5" gutterBottom>
						Processing your resumes & roles....
					</Typography>
				</div>
			)}
		</div>
	);
}

export default withReducer('projectDashboardApp', reducer)(Step2);
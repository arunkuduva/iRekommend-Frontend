import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import SaveIcon from '@material-ui/icons/Save';

const useStyles = makeStyles(theme => ({
	root: {
		'& > *': {
			margin: theme.spacing(1)
		}
	},
	input: {
		display: 'none'
	}
}));

function Widget5(props) {
	const classes = useStyles();

	return (
		<Paper className="w-full rounded-8 shadow">
			<div className="flex items-center px-16 h-52 border-b-1">
				<Typography className="text-15 flex w-full" color="textSecondary">
					<span className="truncate">{`Your recommendations are available to download here...`}</span>
				</Typography>				
			</div>
			<div className="text-center pt-12 pb-28">
				<div className={classes.root}>
					<label htmlFor="contained-button-file">
						<Button
							variant="contained"
							color="primary"
							startIcon={<SaveIcon />}
							component="span"							
						>
							Download
						</Button>
					</label>
				</div>
			</div>
		</Paper>
	);
}

export default React.memo(Widget5);

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import SaveIcon from '@material-ui/icons/Save';
import Button from '@material-ui/core/Button';

function Widget2(props) {
	return (
		<Paper className="w-full rounded-8 shadow">
			<div className="flex items-center px-16 h-52 border-b-1">
				<Typography className="text-15 flex w-full" color="textSecondary">
					<span className="truncate">Download here previous recommendations here</span>
				</Typography>
			</div>
			<div className="text-center pt-12 pb-28">
				<Typography className="text-15" color="textSecondary">
					<Button
						variant="contained"
						color="primary"
						size="large"
						startIcon={<SaveIcon />}
					>
						Download
					</Button>
				</Typography>
			</div>
		</Paper>
	);
}

export default React.memo(Widget2);

import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import Select from '@material-ui/core/Select';
import Typography from '@material-ui/core/Typography';
import React, { useEffect, useState } from 'react';

function Widget1(props) {
	const [currentRange, setCurrentRange] = useState(props.widget.currentRange);

	const [state, setState] = useState({});

	const [className, setClassName] = useState();

	useEffect(() => {
		var cls = '';
		if (props.widget.currentRange == 'requirements') {
			cls = 'leading-none text-blue';
		} else {
			cls = 'leading-none text-red';

		}
		setState(props.widget);
		setClassName(cls);
	}, []);

	function handleChangeRange(ev) {
		setCurrentRange(ev.target.value);
	}

	return (
		<Paper className="w-full rounded-8 shadow">
			<div className="flex items-center px-16 h-52 border-b-1">
				<Typography className="text-15 flex w-full" color="textSecondary">
					<span className="truncate">{state.label}</span>
				</Typography>
			</div>
			<div className="text-center pt-12 pb-28">
				<Typography className={className} style={{ fontSize: '2.4rem' }}>
					{state.value}
				</Typography>
				<Typography className="text-15" color="textSecondary">
					{state.label}
				</Typography>
			</div>
		</Paper>
	);
}

export default React.memo(Widget1);

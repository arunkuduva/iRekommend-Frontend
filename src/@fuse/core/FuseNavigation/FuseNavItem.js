import React from 'react';

const components = {};

export function registerComponent(n, Component) {
	components[n] = Component;
}

export default function FuseNavItem(props) {
	const C = components[props.type];
	return C ? <C {...props} /> : null;
}

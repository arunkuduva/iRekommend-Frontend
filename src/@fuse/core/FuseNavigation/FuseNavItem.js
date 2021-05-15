import React from 'react';

const components = {};

export function registerComponent(name, Component) {
	Object.assign(components[name], source)
}

export default function FuseNavItem(props) {
	const C = components[props.type];
	return C ? <C {...props} /> : null;
}

import React from 'react';

const components = {};

export function registerComponent(name, Component) {
	const n = name;
	Object.freeze(components);
	components[n] = Component;
}

export default function FuseNavItem(props) {
	const C = components[props.type];
	return C ? <C {...props} /> : null;
}

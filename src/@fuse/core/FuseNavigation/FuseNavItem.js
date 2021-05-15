import React from 'react';

const components = {};

export function registerComponent(name, Component) {
	const c = Component;
	Object.freeze(components);
	components[name] = c;
}

export default function FuseNavItem(props) {
	const C = components[props.type];
	return C ? <C {...props} /> : null;
}

import React from 'react';

const components = {};

export function registerComponent(name, Component) {
	components[name] = Component;
	Object.freeze(components);
}

export default function FuseNavItem(props) {
	const C = components[props.type];
	return C ? <C {...props} /> : null;
}

import React from 'react';

const components = {};

export function registerComponent(name, Component) {
	const componentPrototype = Object.freeze(Component);
	components[name] = componentPrototype;
}

export default function FuseNavItem(props) {
	const C = components[props.type];
	return C ? <C {...props} /> : null;
}

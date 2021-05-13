import React from 'react';

const ProfilePageConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	routes: [
		{
			path: '/pages/profile/profile',
			component: React.lazy(() => import('./Profile'))
		},	
		{
			path: '/pages/profile/',
			component: React.lazy(() => import('./business/Business'))
		}
	]
};

export default ProfilePageConfig;

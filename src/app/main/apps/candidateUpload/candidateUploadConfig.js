import React from 'react';

const candidateUploadConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	routes: [		
		{
			path: '/apps/candidateUpload',
			component: React.lazy(() => import('./CandidateUpload'))
		},
	]
};

export default candidateUploadConfig;

import { authRoles } from 'app/auth';
import React from 'react';

const MailConfirmPageConfig = {
	settings: {
		layout: {
			config: {
				navbar: {
					display: false
				},
				toolbar: {
					display: false
				},
				footer: {
					display: false
				},
				leftSidePanel: {
					display: false
				},
				rightSidePanel: {
					display: false
				}
			}
		}
	},
	routes: [
		{
			path: '/mail-confirm',
			component: React.lazy(() => import('./MailConfirmPage'))
		}
	]
};

export default MailConfirmPageConfig;

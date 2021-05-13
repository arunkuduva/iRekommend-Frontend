import FuseUtils from '@fuse/utils';
import appsConfigs from 'app/main/apps/appsConfigs';
import CallbackConfig from 'app/main/callback/CallbackConfig';
import LoginConfig from 'app/main/login/LoginConfig';
import LogoutConfig from 'app/main/logout/LogoutConfig';
import pagesConfigs from 'app/main/pages/pagesConfigs';
import RegisterConfig from 'app/main/register/RegisterConfig';
import ForgotPasswordPageConfig from 'app/main/forgot-password/ForgotPasswordPageConfig';
import MailConfirmPageConfig from 'app/main/mail-confirm/MailConfirmPageConfig';
import React from 'react';
import { Redirect } from 'react-router-dom';

const routeConfigs = [
	...appsConfigs,
	...pagesConfigs,
	CallbackConfig,
	LogoutConfig,
	LoginConfig,
	RegisterConfig,
	ForgotPasswordPageConfig,
	MailConfirmPageConfig,
	LogoutConfig,
];

const routes = [
	// if you want to make whole app auth protected by default change defaultAuth for example:
	// ...FuseUtils.generateRoutesFromConfigs(routeConfigs, ['admin','staff','user']),
	// The individual route configs which has auth option won't be overridden.
	...FuseUtils.generateRoutesFromConfigs(routeConfigs, ['admin','staff','user']),
	...FuseUtils.generateRoutesFromConfigs(routeConfigs, null),
	{
		path: '/',
		exact: true,
		component: () => <Redirect to="/apps/home" />
	},
	{
		component: () => <Redirect to="/pages/errors/error-404" />
	}
];

export default routes;

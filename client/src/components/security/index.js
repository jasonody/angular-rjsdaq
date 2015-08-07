import angular from 'angular';
import securityDirective from './securityDirective';
import securityController from './securityController';

export default angular
	.module('rjsdaq.client.security', [])
	.controller('securityController', securityController)
	.directive('rjsdaqSecurity', securityDirective)
	.name;
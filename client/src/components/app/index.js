import angular from 'angular';
import appDirective from './appDirective';
import appController from './appController';

export default angular
	.module('rjsdaq.client.app', [])
	.controller('appController', appController)
	.directive('app', appDirective)
	.name;
import angular from 'angular';
import priceAgeController from './priceAgeController';
import priceAgeDirective from './priceAgeDirective';

export default angular
	.module('rjsdaq.client.priceAge', [])
	.controller('priceAgeController', priceAgeController)
	.directive('rjsdaqPriceAge', priceAgeDirective)
	.name;
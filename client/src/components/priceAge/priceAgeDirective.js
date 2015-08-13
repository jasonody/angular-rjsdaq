export default function priceAge () {
	
	return {
		template: require('./priceAgeTemplate.html'),
		controller: 'priceAgeController',
		controllerAs: 'vm',
		bindToController: true,
		scope: true
	};
}

priceAge.$inject = [];
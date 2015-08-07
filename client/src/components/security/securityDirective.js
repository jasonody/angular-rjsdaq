export default function security () {
	
	return {
		template: require('./securityTemplate.html'),
		replace: true,
		controller: 'securityController',
		controllerAs: 'vm',
		bindToController: true,
		scope: {
			security: '='
		}
	};
}
	
security.$inject = [];
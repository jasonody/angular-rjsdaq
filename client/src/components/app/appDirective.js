export default function app () {
	
	return {
		template: require('./appTemplate.html'),
		controller: 'appController',
		controllerAs: 'vm',
		bindToController: true
	};
}
	
app.$inject = [];
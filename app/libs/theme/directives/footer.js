function cvFooter($window) {
'ngInject';
  return {
    restrict: 'EA',
    templateUrl: 'directives/footer.html',
    link: (scope, element) => {
				let windowHeight = $window.innerHeight;			
    }
  };
}

export default {
  name: 'cvFooter',
  fn: cvFooter
};

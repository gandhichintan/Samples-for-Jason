function cvNavigation() {
'ngInject';
  return {
    restrict: 'EA',
    templateUrl: 'directives/navigation.html',
    link: (scope, element) => {

    }
  };
}

export default {
  name: 'cvNavigation',
  fn: cvNavigation
};

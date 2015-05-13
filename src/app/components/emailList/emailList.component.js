import controller from './emailList.controller';
import template from './emailList.template.html';
import './emailList.styl';

let emailListComponent = ()=>{
  return {
    controller,
    template,
    // just to isolate the scope
    scope: {},
    // we only want to use this as an element
    restrict: 'E',
    controllerAs: 'vm'
  };
};

export default emailListComponent;

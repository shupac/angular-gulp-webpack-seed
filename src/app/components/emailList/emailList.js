// run the test and follow the code that is
// already here to figure out what you need to do
import angular from 'angular';
import emailListComponent from './emailList.component';
import emailListFactory from './emailList.factory';
import uiRouter from 'angular-ui-router';

let emailList = angular.module('app.components.emailList', [uiRouter])
  .directive('acEmailList', emailListComponent)
  .factory('Emails', emailListFactory)
  .config(($stateProvider, $urlRouterProvider)=>{
    // setup routing for the emailList here
    // default to the this URL too using otherwise
  $stateProvider
      // for template here, remember everything is a component
      // so the template would just be a directive or the
      // emailList component itself
      })

export default emailList;

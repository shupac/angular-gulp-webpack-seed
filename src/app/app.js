import angular from 'angular';
import appComponent from './app.component';
import components from './components/components';
import './app.styl';

angular.module('app', [components.name])
  .directive('acApp', appComponent);

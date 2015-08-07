import angular from 'angular';
//import RJSDAQ from './RJSDAQ';

import app from './components/app';
import security from './components/security';

angular.module('rjsdaq.client', [app, security]);
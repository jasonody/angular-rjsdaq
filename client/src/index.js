import angular from 'angular';
//import RJSDAQ from './RJSDAQ';

import app from './components/app';
import security from './components/security';
import priceAge from './components/priceAge';

angular.module('rjsdaq.client', [app, security, priceAge]);
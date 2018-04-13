import { NgModule } from '@angular/core';
import { RouterModule, ExtraOptions } from '@angular/router';

import { environment } from './../../../../environments/environment';
import { ROUTES } from './routes';

const routeConfig: ExtraOptions = {
  // enableTracing: true, // routes debugging
  useHash: true, // this should be true since routing is handled in Angular app internally.
};

@NgModule({
  imports: [
    RouterModule.forRoot(
      ROUTES,
      routeConfig
    )
    // other imports here
  ],
  exports: [ RouterModule ]
})
export class RoutingModule { }

import { Routes } from '@angular/router';

import { LayoutComponent } from '../layout/layout.component';
import { AuthGuard } from '../shared/services/guard/auth.guard';

/**
 * Provides helper methods to create routes.
 */
export class Route {

  /**
   * Creates routes using the layout component and authentication.
   * @param routes The routes to add.
   * @return {Routes} The new routes using layout as the base.
   */
  static withShell(routes: Routes): Routes {
    return [{
      path: '',
      component: LayoutComponent,
      children: routes,
      canActivate: [AuthGuard],
      // Reuse LayoutComponent instance when navigating between child views
      data: { reuse: true },
}];
  }

}

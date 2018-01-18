import { TestBed, inject } from '@angular/core/testing';

import { AuthService } from './auth/authentication.service';
import { MockAuthenticationService } from './auth/authentication.service.mock';
import { AuthenticationGuard } from './auth/authentication.guard';
import { LayoutComponent } from '../layout/layout.component';
import { Route } from './route.service';

describe('Route', () => {
  let route: Route;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthenticationGuard,
        { provide: AuthService, useClass: MockAuthenticationService },
        Route
      ]
    });
  });

  beforeEach(inject([Route], (_route: Route) => {
    route = _route;
  }));

  describe('withShell', () => {
    it('should create routes as children of layout', () => {
      // Prepare
      const testRoutes = [{ path: 'test' }];

      // Act
      const routes = Route.withShell(testRoutes);

      // Assert
      expect(routes.length).toBe(1);
      expect(routes[0].path).toBe('');
      expect(routes[0].children).toBe(testRoutes);
      expect(routes[0].component).toBe(LayoutComponent);
    });
  });
});

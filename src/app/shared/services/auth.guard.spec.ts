import { TestBed, inject } from '@angular/core/testing';
import { Router } from '@angular/router';

import { AuthService } from './auth.service';
import { MockAuthenticationService } from './auth.service.mock';
import { AuthGuard } from './auth.guard';

describe('AuthGuard', () => {
  let authenticationGuard: AuthGuard;
  let authenticationService: MockAuthenticationService;
  let mockRouter: any;

  beforeEach(() => {
    mockRouter = {
      navigate: jasmine.createSpy('navigate')
    };
    TestBed.configureTestingModule({
      providers: [
        AuthGuard,
        { provide: AuthService, useClass: MockAuthenticationService },
        { provide: Router, useValue: mockRouter },
      ]
    });
  });

  beforeEach(inject([
    AuthGuard,
    AuthService
  ], (_authenticationGuard: AuthGuard,
      _authenticationService: MockAuthenticationService) => {

    authenticationGuard = _authenticationGuard;
    authenticationService = _authenticationService;
  }));

  it('should have a canActivate method', () => {
    expect(typeof authenticationGuard.canActivate).toBe('function');
  });

  it('should return true if user is authenticated', () => {
    expect(authenticationGuard.canActivate()).toBe(true);
  });

  it('should return false and redirect to login if user is not authenticated', () => {
    // Arrange
    authenticationService.credentials = null;

    // Act
    const result = authenticationGuard.canActivate();

    // Assert
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/login'], {replaceUrl: true});
    expect(result).toBe(false);
  });
});

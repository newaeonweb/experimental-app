import { TestBed, inject } from '@angular/core/testing';
import { Router } from '@angular/router';

import { AuthService } from '../auth/auth.service';
import { MockauthService } from '../auth/auth.service.mock';
import { AuthGuard } from './auth.guard';

describe('AuthGuard', () => {
  let authenticationGuard: AuthGuard;
  let authService: MockauthService;
  let mockRouter: any;

  beforeEach(() => {
    mockRouter = {
      navigate: jasmine.createSpy('navigate')
    };
    TestBed.configureTestingModule({
      providers: [
        AuthGuard,
        { provide: AuthService, useClass: MockauthService },
        { provide: Router, useValue: mockRouter },
      ]
    });
  });

  beforeEach(inject([
    AuthGuard,
    AuthService
  ], (_authenticationGuard: AuthGuard,
      _authService: MockauthService) => {

    authenticationGuard = _authenticationGuard;
    authService = _authService;
  }));

  it('should have a canActivate method', () => {
    expect(typeof authenticationGuard.canActivate).toBe('function');
  });

  it('should return true if user is authenticated', () => {
    expect(authenticationGuard.canActivate()).toBe(true);
  });

  it('should return false and redirect to login if user is not authenticated', () => {
    // Arrange
    authService.credentials = null;

    // Act
    const result = authenticationGuard.canActivate();

    // Assert
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/login'], {replaceUrl: true});
    expect(result).toBe(false);
  });
});

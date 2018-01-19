import { TestBed, inject, fakeAsync, tick } from '@angular/core/testing';

import { AuthService, Credentials} from './auth.service';

const credentialsKey = 'credentials';

describe('AuthService', () => {
  let authService: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthService]
    });
  });

  beforeEach(inject([
    AuthService
  ], (_authService: AuthService) => {
    authService = _authService;
  }));

  afterEach(() => {
    // Cleanup
    localStorage.removeItem(credentialsKey);
    sessionStorage.removeItem(credentialsKey);
  });

  describe('login', () => {
    it('should return credentials', fakeAsync(() => {
      // Act
      const request = authService.login({
        username: 'toto',
        password: '123'
      });
      tick();

      // Assert
      request.subscribe(credentials => {
        expect(credentials).toBeDefined();
        expect(credentials.token).toBeDefined();
      });
    }));

    it('should authenticate user', fakeAsync(() => {
      expect(authService.isAuthenticated()).toBe(false);

      // Act
      const request = authService.login({
        username: 'toto',
        password: '123'
      });
      tick();

      // Assert
      request.subscribe(() => {
        expect(authService.isAuthenticated()).toBe(true);
        expect(authService.credentials).toBeDefined();
        expect(authService.credentials).not.toBeNull();
        expect((<Credentials>authService.credentials).token).toBeDefined();
        expect((<Credentials>authService.credentials).token).not.toBeNull();
      });
    }));

    it('should persist credentials for the session', fakeAsync(() => {
      // Act
      const request = authService.login({
        username: 'toto',
        password: '123'
      });
      tick();

      // Assert
      request.subscribe(() => {
        expect(sessionStorage.getItem(credentialsKey)).not.toBeNull();
      });
    }));

    it('should persist credentials across sessions', fakeAsync(() => {
      // Act
      const request = authService.login({
        username: 'toto',
        password: '123',
        remember: true
      });
      tick();

      // Assert
      request.subscribe(() => {
        expect(localStorage.getItem(credentialsKey)).not.toBeNull();
      });
    }));
  });

  describe('logout', () => {
    it('should clear user auth', fakeAsync(() => {
      // Arrange
      const loginRequest = authService.login({
        username: 'toto',
        password: '123'
      });
      tick();

      // Assert
      loginRequest.subscribe(() => {
        expect(authService.isAuthenticated()).toBe(true);

        const request = authService.logout();
        tick();

        request.subscribe(() => {
          expect(authService.isAuthenticated()).toBe(false);
          expect(authService.credentials).toBeNull();
          expect(sessionStorage.getItem(credentialsKey)).toBeNull();
          expect(localStorage.getItem(credentialsKey)).toBeNull();
        });
      });
    }));

    it('should clear persisted user auth', fakeAsync(() => {
      // Arrange
      const loginRequest = authService.login({
        username: 'toto',
        password: '123',
        remember: true
      });
      tick();

      // Assert
      loginRequest.subscribe(() => {
        expect(authService.isAuthenticated()).toBe(true);

        const request = authService.logout();
        tick();

        request.subscribe(() => {
          expect(authService.isAuthenticated()).toBe(false);
          expect(authService.credentials).toBeNull();
          expect(sessionStorage.getItem(credentialsKey)).toBeNull();
          expect(localStorage.getItem(credentialsKey)).toBeNull();
        });
      });
    }));
  });
});

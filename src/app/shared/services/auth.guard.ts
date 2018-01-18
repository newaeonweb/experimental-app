import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

import { Logger } from './logger.service';
import { AuthService } from './auth.service';

const log = new Logger('AuthGuard');

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private router: Router,
              private authenticationService: AuthService) { }

  canActivate(): boolean {
    if (this.authenticationService.isAuthenticated()) {
      return true;
    }

    log.debug('Not authenticated, redirecting...');
    this.router.navigate(['/login'], { replaceUrl: true });
    return false;
  }

}

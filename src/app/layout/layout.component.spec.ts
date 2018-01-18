import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule } from '@ngx-translate/core';

import { AuthService } from '../settings/auth/authentication.service';
import { MockAuthenticationService } from '../settings/auth/authentication.service.mock';
import { LayoutComponent } from './layout.component';
import { CoreModule } from '../settings/core.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

describe('LayoutComponent', () => {
  let component: LayoutComponent;
  let fixture: ComponentFixture<LayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        TranslateModule.forRoot(),
        NgbModule.forRoot(),
        CoreModule
      ],
      providers: [
        { provide: AuthService, useClass: MockAuthenticationService }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

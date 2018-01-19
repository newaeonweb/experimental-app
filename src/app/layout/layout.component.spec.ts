import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule } from '@ngx-translate/core';

import { AuthService } from '../shared/services/auth/auth.service';
import { MockauthService } from '../shared/services/auth/auth.service.mock';
import { LayoutComponent } from './layout.component';
import { SettingsModule } from '../settings/settings.module';
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
        SettingsModule
      ],
      providers: [
        { provide: AuthService, useClass: MockauthService }
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

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';

import { AppComponent } from './app.component';
import { AuthService } from './services/auth.service';
import { of } from 'rxjs';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let mockAuthService: any;
  let router: Router;

  beforeEach(async () => {
    mockAuthService = {
      role$: of(null),
      logout: jasmine.createSpy('logout'),
      setRole: jasmine.createSpy('setRole')
    };

    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [AppComponent],
      providers: [
        { provide: AuthService, useValue: mockAuthService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    spyOn(router, 'navigate');
    fixture.detectChanges();
  });

  it('should create the app component', () => {
    expect(component).toBeTruthy();
  });


  it('should call authService.logout and navigate to /login on logout', () => {
    component.logout();

    expect(mockAuthService.logout).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['/login']);
  });

  describe('switchRole', () => {
    it('should call authService.setRole with the new role', () => {
      const newRole = 'admin';
      component.switchRole(newRole);

      expect(mockAuthService.setRole).toHaveBeenCalledWith(newRole);
    });

    it('should navigate to /form/list when switching to admin role', () => {
      component.switchRole('admin');

      expect(router.navigate).toHaveBeenCalledWith(['/form/list']);
    });

    it('should navigate to /form/create when switching to user role', () => {
      component.switchRole('user');

      expect(router.navigate).toHaveBeenCalledWith(['/form/create']);
    });
  });
});

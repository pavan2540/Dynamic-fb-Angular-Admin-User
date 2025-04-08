import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  role: 'admin' | 'user' | null = null;

  constructor(private authService: AuthService, private router: Router) {
    this.authService.role$.subscribe(role => {
      this.role = role;
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  switchRole(newRole: 'admin' | 'user') {
    this.authService.setRole(newRole);

    if (newRole === 'admin') {
      this.router.navigate(['/form/list']);
    } else {
      this.router.navigate(['/form/create']);
    }
  }
}

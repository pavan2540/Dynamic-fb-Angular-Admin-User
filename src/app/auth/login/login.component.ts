import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  selectedRole: string | null = null;

  constructor(private authService: AuthService, private router: Router) {}

  login(): void {
    if (this.selectedRole) {
      if (this.selectedRole === 'admin' || this.selectedRole === 'user') {
        this.authService.login(this.selectedRole);
      } else {
        alert('Invalid role selected.');
      }
      this.authService.setRole(this.selectedRole);

      if (this.selectedRole === 'admin') {
        this.router.navigate(['/form-list']);
      } else if (this.selectedRole === 'user') {
        this.router.navigate(['/form/create']);
      }
    } else {
      alert('Please select a role before logging in.');
    }
  }
}

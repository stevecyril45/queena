import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../guards/auth.service'; // keep correct path

@Component({
  selector: 'app-login-dashboard',
  templateUrl: './login-dashboard.component.html',
  styleUrls: ['./login-dashboard.component.css']
})
export class LoginDashboardComponent {

  username = '';
  password = '';
  errorMessage = '';

  // Hardcoded credentials
  private readonly correctUsername = 'Queena_Admin_2025!';
  private readonly correctPassword = 'Qn!9f$Z3@xT7#LpV';

  constructor(
    private router: Router,
    private authService: AuthService // <-- inject service here
  ) {}

  login() {
    if (this.username === this.correctUsername && this.password === this.correctPassword) {
      this.authService.setLoggedIn(true); // now works
      this.router.navigate(['/dashboard']);
    } else {
      this.errorMessage = 'Invalid username or password';
    }
  }
}

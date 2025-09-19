import { Component } from '@angular/core';

interface Submission {
  name: string;
  subject: string;
  email: string;
  phone: string;
  message: string;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  submissions: Submission[] = [];

  // Form model
  formData: Submission = {
    name: '',
    subject: '',
    email: '',
    phone: '',
    message: ''
  };

  // Submit handler
  submitForm() {
    this.submissions.push({ ...this.formData });
    this.formData = { name: '', subject: '', email: '', phone: '', message: '' }; // Reset form
  }
}

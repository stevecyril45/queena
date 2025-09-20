import { Component } from '@angular/core';
import { ContactService } from '../../core/services/contact.service';

declare var window: any; // Access Bootstrap modal

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {

  contact = {
    name: '',
    email: '',
    subject: '',
    phone: '',
    message: ''
  };

  private successModal: any;

  constructor(private contactService: ContactService) {}

  ngOnInit() {
    // Initialize modal once
    const modalElement = document.getElementById('successModal');
    this.successModal = new window.bootstrap.Modal(modalElement);
  }

  submitForm() {
    this.contactService.addContact(this.contact).subscribe(
      (res: any) => {
        // Reset form
        this.contact = { name: '', email: '', subject: '', phone: '', message: '' };

        // Show modal
        this.successModal.show();
      },
      (err: any) => console.error(err)
    );
  }

  closeModal() {
    this.successModal.hide();
  }
}

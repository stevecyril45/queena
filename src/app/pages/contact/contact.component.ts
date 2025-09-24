import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContactService } from '../../core/services/contact.service';

declare var window: any;

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  contactForm!: FormGroup;
  private successModal: any;
  submitted = false;
  contacts: any[] = [];   // ✅ hold contacts

  constructor(private fb: FormBuilder, private contactService: ContactService) {}

  ngOnInit() {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      subject: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: [''],
      message: ['', Validators.required]
    });

    const modalElement = document.getElementById('successModal');
    this.successModal = new window.bootstrap.Modal(modalElement);

    // ✅ Load contacts on page load
    this.loadContacts();
  }

  loadContacts() {
    this.contactService.getContacts().subscribe(
      data => {
        this.contacts = data;
        console.log('Contacts fetched:', this.contacts);
      },
      error => console.error('Error loading contacts:', error)
    );
  }

  submitForm() {
    this.submitted = true;

    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      return;
    }

    this.contactService.addContact(this.contactForm.value).subscribe(
      res => {
        this.contactForm.reset();
        this.submitted = false;
        this.successModal.show();

        // ✅ refresh list after adding
        this.loadContacts();
      },
      err => console.error(err)
    );
  }

  closeModal() {
    this.successModal.hide();
  }

  get f() {
    return this.contactForm.controls;
  }
}

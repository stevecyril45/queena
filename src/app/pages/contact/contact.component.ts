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
  submitted = false; // <-- new flag

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
  }

  submitForm() {
    this.submitted = true; // mark form as submitted

    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      return;
    }

    this.contactService.addContact(this.contactForm.value).subscribe(
      (res: any) => {
        this.contactForm.reset();
        this.submitted = false; // reset submission state
        this.successModal.show();
      },
      (err: any) => console.error(err)
    );
  }

  closeModal() {
    this.successModal.hide();
  }

  get f() {
    return this.contactForm.controls;
  }
}

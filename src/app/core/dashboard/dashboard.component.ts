import { Component, OnInit } from '@angular/core';
import { ContactService } from '../services/contact.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {

  contacts: any[] = [];

  constructor(private contactService: ContactService) { }

  ngOnInit(): void {
    this.contactService.getContacts().subscribe(data => {
      // Firebase REST returns object with keys, convert to array
      this.contacts = data ? Object.values(data) : [];
    });
  }
   records = [
    { name: 'John Doe', email: 'john@example.com', subject: 'Inquiry', message: 'Hello!' },
    { name: 'Jane Smith', email: 'jane@example.com', subject: 'Support', message: 'Need help' },
    { name: 'Mike Ross', email: 'mike@example.com', subject: 'Shipping', message: 'Where is my order?' },
    { name: 'Rachel Zane', email: 'rachel@example.com', subject: 'Billing', message: 'Payment issue' },
    { name: 'Harvey Specter', email: 'harvey@example.com', subject: 'Contract', message: 'Send details' },
    // add more records for testing
  ];

  pageSize = 3; // records per page
  currentPage = 1;

  get totalPages() {
    return Math.ceil(this.records.length / this.pageSize);
  }

  paginatedRecords() {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.records.slice(start, start + this.pageSize);
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  deleteRecord(record: any) {
    this.records = this.records.filter(r => r !== record);
  }

  deletePageRecords() {
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    this.records.splice(start, this.pageSize); // delete current page’s records
    if (this.currentPage > this.totalPages) {
      this.currentPage = this.totalPages || 1; // adjust if last page was removed
    }
  }
}

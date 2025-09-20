import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  // This is a placeholder for your actual data, populated from a service.
  // I have added more records to demonstrate pagination.
  records = [
    { id: 1, name: 'John Doe', email: 'john@example.com', subject: 'Inquiry', message: 'Hello!'},
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', subject: 'Support', message: 'Need help' },
    { id: 3, name: 'Mike Ross', email: 'mike@example.com', subject: 'Shipping', message: 'Where is my order?' },
    { id: 4, name: 'Rachel Zane', email: 'rachel@example.com', subject: 'Billing', message: 'Payment issue' },
    { id: 5, name: 'Harvey Specter', email: 'harvey@example.com', subject: 'Contract', message: 'Send details' },
    { id: 6, name: 'Donna Paulsen', email: 'donna@example.com', subject: 'Request', message: 'Can you please provide the report?' },
    { id: 7, name: 'Jessica Pearson', email: 'jessica@example.com', subject: 'Legal Advice', message: 'I need to discuss a case.' },
    { id: 8, name: 'Louis Litt', email: 'louis@example.com', subject: 'Client Meeting', message: 'Please schedule a meeting.' },
    { id: 9, name: 'Katrina Bennett', email: 'katrina@example.com', subject: 'Document Review', message: 'Review the attached document.' },
    { id: 10, name: 'Gretchen Bodinski', email: 'gretchen@example.com', subject: 'Office Supplies', message: 'We are out of paper.' },
    { id: 11, name: 'Harold Gunderson', email: 'harold@example.com', subject: 'File Audit', message: 'I am auditing the files.' },
    { id: 12, name: 'Daniel Hardman', email: 'daniel@example.com', subject: 'New Proposal', message: 'I have a new proposal.' },
    { id: 13, name: 'Jack Soloff', email: 'jack@example.com', subject: 'Partner Meeting', message: 'I want to be a partner.' },
  ];

  // Pagination properties
  pageSize = 10;
  currentPage = 1;

  // Modal properties
  showDeleteModal = false;
  recordToDelete: any = null;
  isDeletingPage = false;

  constructor() { }

  ngOnInit(): void { }

  get totalPages(): number {
    return Math.ceil(this.records.length / this.pageSize);
  }

  paginatedRecords(): any[] {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.records.slice(start, start + this.pageSize);
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  // Opens the modal for a single record deletion
  confirmDeleteRecord(record: any): void {
    this.recordToDelete = record;
    this.isDeletingPage = false;
    this.showDeleteModal = true;
  }

  // Opens the modal for deleting all records on the current page
  confirmDeletePageRecords(): void {
    this.isDeletingPage = true;
    this.showDeleteModal = true;
  }

  // Hides the modal and resets the state
  cancelDelete(): void {
    this.showDeleteModal = false;
    this.recordToDelete = null;
    this.isDeletingPage = false;
  }

  // Executes the delete action after confirmation
  executeDelete(): void {
    if (this.isDeletingPage) {
      const start = (this.currentPage - 1) * this.pageSize;
      this.records.splice(start, this.paginatedRecords().length);
      // Adjust page if the last page was deleted
      if (this.currentPage > this.totalPages) {
        this.currentPage = this.totalPages > 0 ? this.totalPages : 1;
      }
    } else if (this.recordToDelete) {
      this.records = this.records.filter(r => r.id !== this.recordToDelete.id);
    }
    this.cancelDelete(); // Hide modal
  }

  // Generates a PDF of the table using the browser's print functionality
  downloadPdf(): void {
    window.print();
  }
}

import { Component, OnInit } from '@angular/core';
import { ContactService } from '../services/contact.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  records: any[] = [];
  recordToDelete: any = null;

  // ✅ Pagination variables
  currentPage = 1;
  pageSize = 5;   // show 5 per page
  totalPages = 1;

  // ✅ Modal
  showDeleteModal = false;

  constructor(private contactService: ContactService) {}

  ngOnInit(): void {
    this.loadContacts();
  }

  // Load contacts
  loadContacts() {
    this.contactService.getContacts().subscribe(data => {
      this.records = data;
      this.updateTotalPages();
    });
  }

  // ✅ Pagination helpers
  paginatedRecords() {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.records.slice(start, start + this.pageSize);
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  private updateTotalPages() {
    this.totalPages = Math.ceil(this.records.length / this.pageSize) || 1;
  }

  // ✅ Print-to-PDF (browser’s save-as-pdf)
  downloadPdf() {
    window.print();
  }

  // ✅ Open modal for single delete
  confirmDeleteRecord(record: any) {
    this.recordToDelete = record;
    this.showDeleteModal = true;
  }

  // ✅ Execute delete
  executeDelete() {
    if (!this.recordToDelete) return;
    this.contactService.deleteContact(this.recordToDelete.id).subscribe(() => {
      this.records = this.records.filter(r => r.id !== this.recordToDelete.id);
      this.updateTotalPages();
      this.recordToDelete = null;
      this.showDeleteModal = false;
    });
  }

  // ✅ Cancel modal
  cancelDelete() {
    this.recordToDelete = null;
    this.showDeleteModal = false;
  }

  // ✅ Delete all records on current page
  confirmDeletePageRecords() {
    if (confirm('Delete all records on this page?')) {
      const idsToDelete = this.paginatedRecords().map(r => r.id);
      idsToDelete.forEach(id => {
        this.contactService.deleteContact(id).subscribe();
      });
      this.records = this.records.filter(r => !idsToDelete.includes(r.id));
      this.updateTotalPages();
    }
  }
}

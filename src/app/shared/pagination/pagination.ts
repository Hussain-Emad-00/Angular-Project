import {Component, input, OnInit, output, signal} from '@angular/core';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.html',
  styleUrl: './pagination.scss',
  imports: [FormsModule]
})
export class PaginationComponent implements OnInit {
  pageSize = signal(50)
  currentPage = signal(1)
  currentPageInput = signal(1)
  totalPages = signal(0)

  totalItems = input(0)
  pageSizeOutput = output<number>()
  currentPageOutput = output<number>()

  ngOnInit() {
    this.loadData()
  }

  onPageSizeChange() {
    this.currentPage.set(1)
    this.currentPageInput.set(1);
    this.pageSizeOutput.emit(this.pageSize())
    this.loadData()
  }

  goToPage(page: number) {
    if (page < 1 || page > this.totalPages()) return;

    this.currentPage.set(page);
    this.currentPageInput.set(page);
    this.currentPageOutput.emit(this.currentPage())
  }

  loadData() {
    this.totalPages.set(Math.ceil(this.totalItems() / this.pageSize()))

    this.currentPageInput.set(this.currentPage());
  }
}

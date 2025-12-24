import {Component, Input, output} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {NgbPagination, NgbPaginationPages} from '@ng-bootstrap/ng-bootstrap';

const FILTER_PAG_REGEX = /[^0-9]/g;

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss',
  imports: [FormsModule, NgbPagination, NgbPaginationPages],
})
export class PaginationComponent {
  @Input({required: true}) totalItems!: number;
  pagination = output<{ page?: number, size?: number }>()
  pageSize = 50;
  page = 1;

  selectPage(page: string) {
    this.page = parseInt(page, 10) || 1;
  }

  formatInput(input: HTMLInputElement) {
    input.value = input.value.replace(FILTER_PAG_REGEX, '');
  }

  onPageChange(page: number) {
    this.pagination.emit({page});
  }

  onSizeChange() {
    this.page = 1
    this.pagination.emit({size: this.pageSize});
  }
}

import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common'; // Import this

@Component({
  selector: 'app-custom-paginator',
  templateUrl: './custom-paginator.component.html',
  styleUrls: ['./custom-paginator.component.css'],
})
export class CustomPaginatorComponent {
  @Input() totalCourses = 0;
  @Input() pageSize = 10;
  @Input() pageIndex = 0;
  @Output() pageChanged = new EventEmitter<number>();

  get totalPages(): number {
    return Math.ceil(this.totalCourses / this.pageSize);
  }

  get pages(): number[] {
    const totalPages = this.totalPages;
    const pageNumbers = [];
    const range = 5; // Number of page buttons to display on each side of the current page
    for (let i = 0; i < totalPages; i++) {
      if (i >= this.pageIndex - range && i <= this.pageIndex + range) {
        pageNumbers.push(i);
      }
    }

    return pageNumbers;
  }

  changePage(index: number): void {
    this.pageIndex = index;
    this.pageChanged.emit(index);
  }

  previousPage(): void {
    if (this.pageIndex > 0) {
      this.pageIndex--;
      this.pageChanged.emit(this.pageIndex);
    }
  }

  nextPage(): void {
    console.log(this.totalPages);
    if (this.pageIndex < this.totalPages - 1) {
      this.pageIndex++;
      this.pageChanged.emit(this.pageIndex);
    }
  }
}

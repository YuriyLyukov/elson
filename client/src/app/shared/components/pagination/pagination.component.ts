import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit, OnChanges {
  @Input() totalItems: number;
  @Input() itemsPerPage: number;

  @Output() PageChange: EventEmitter<number> = new EventEmitter();

  public pages: number [] = [];
  activePage: number;

  ngOnChanges(): any {
    const pageCount = this.getPageCount();
    this.pages = this.getArrayOfPage(pageCount);
    this.activePage = 1;
    this.PageChange.emit(1);
  }

  private  getPageCount(): number {
    let totalPage = 0;

    if (this.totalItems > 0 && this.itemsPerPage > 0) {
      const pageCount = this.totalItems / this.itemsPerPage;
      const roundedPageCount = Math.floor(pageCount);

      totalPage = roundedPageCount < pageCount ? roundedPageCount + 1 : roundedPageCount;
    }

    return totalPage;
  }

  private getArrayOfPage(pageCount: number): number [] {
    const pageArray = [];

    if (pageCount > 0) {
      for (let i = 1 ; i <= pageCount ; i++) {
        pageArray.push(i);
      }
    }
    return pageArray;
  }

  onClickPage(pageNumber: number): void {
    if (pageNumber >= 1 && pageNumber <= this.pages.length) {
      this.activePage = pageNumber;
      this.PageChange.emit(this.activePage);
    }
  }

  constructor() { }

  ngOnInit(): void {
  }

}

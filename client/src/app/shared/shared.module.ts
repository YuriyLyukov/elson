import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginationHeaderComponent } from './components/pagination-header/pagination-header.component';
import {PaginationComponent} from './components/pagination/pagination.component';
import { OrderTotalsComponent } from './components/order-totals/order-totals.component';
import {RouterModule} from '@angular/router';


@NgModule({
  declarations: [PaginationHeaderComponent, PaginationComponent, OrderTotalsComponent],
  imports: [
    CommonModule,
    RouterModule,
  ],
    exports: [
        PaginationHeaderComponent,
        PaginationComponent,
        OrderTotalsComponent
    ]
})
export class SharedModule { }

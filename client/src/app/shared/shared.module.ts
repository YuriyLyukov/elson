import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginationHeaderComponent } from './components/pagination-header/pagination-header.component';
import {PaginationComponent} from './components/pagination/pagination.component';
import { OrderTotalsComponent } from './components/order-totals/order-totals.component';
import {RouterModule} from '@angular/router';
import {ReactiveFormsModule} from '@angular/forms';
import { TextInputComponent } from './components/text-input/text-input.component';


@NgModule({
  declarations: [PaginationHeaderComponent, PaginationComponent, OrderTotalsComponent, TextInputComponent],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule
  ],
    exports: [
        PaginationHeaderComponent,
        PaginationComponent,
        OrderTotalsComponent,
        ReactiveFormsModule,
        TextInputComponent
    ]
})
export class SharedModule { }

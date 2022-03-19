import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorMessageDirective } from './_directives/errorMessage.directive';
import { SuccessMessageDirective } from './_directives/successMessage.directive';
import { ComponentTitleDirective } from './_directives/componentTitle.directive';



@NgModule({
  declarations: [
    ErrorMessageDirective,
    SuccessMessageDirective,
    ComponentTitleDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ErrorMessageDirective,
    SuccessMessageDirective,
    ComponentTitleDirective
  ]
})
export class SharedModule { }

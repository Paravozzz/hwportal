import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[successMessage]'
})
export class SuccessMessageDirective {

  @Input() successMessage: string = '';


  constructor(private element: ElementRef) { }

  ngOnChanges(): void {
    if (!(this.element.nativeElement instanceof HTMLDivElement)) {
      return;
    }

    let div: HTMLDivElement = this.element.nativeElement;

    if (!this.successMessage) {
      div.innerHTML = '';
      div.classList.remove('alert', 'alert-success')
    } else {
      div.classList.add('alert', 'alert-success');
      div.innerHTML = this.successMessage;
    }

  }

}

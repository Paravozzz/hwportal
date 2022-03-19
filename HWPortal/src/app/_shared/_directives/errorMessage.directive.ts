import { Directive, ElementRef, Input, OnChanges } from '@angular/core';

@Directive({
  selector: '[errorMessage]'
})
export class ErrorMessageDirective implements OnChanges {

  @Input() errorMessage: string = '';


  constructor(private element: ElementRef) { }

  ngOnChanges(): void {
    if (!(this.element.nativeElement instanceof HTMLDivElement)) {
      return;
    }

    let div: HTMLDivElement = this.element.nativeElement;

    if (!this.errorMessage) {
      div.innerHTML = '';
      div.classList.remove('alert', 'alert-danger')
    } else {
      div.classList.add('alert', 'alert-danger');
      div.innerHTML = this.errorMessage;
    }
    
  }

}

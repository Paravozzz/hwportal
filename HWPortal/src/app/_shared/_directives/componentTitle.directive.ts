import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[componentTitle]'
})
export class ComponentTitleDirective implements OnInit {

  @Input() componentTitle: string = '';

  constructor(private element: ElementRef) { }

    ngOnInit(): void {
      if (!(this.element.nativeElement instanceof HTMLDivElement)) {
        return;
      }

      let div: HTMLDivElement = this.element.nativeElement;

      div.classList.add('border-start', 'border-2');

      div.innerHTML = `<p class="fs-4 ms-3">${this.componentTitle}</p>`
    }

}

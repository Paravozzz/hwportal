import { Directive, HostListener } from '@angular/core';
import { DataService } from '../_services/data.service';

@Directive({
  selector: '[dataElement]'
})
export class DataElementDirective {

  constructor(private data : DataService) { }

  @HostListener('change', ['$event.target']) change(target: HTMLElement) {
    if (target instanceof HTMLSelectElement) {
      console.log(target.selectedIndex);
    } else if (target instanceof HTMLInputElement) {
      console.log(target.value);
    }
    this.data.send();
  }

}

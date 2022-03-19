import { Directive, ElementRef, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Directive({
  selector: '[routerLinkActiveDropdown]'
})
export class RouterLinkActiveDropdownDirective implements OnInit {

  constructor(private router: Router, private element: ElementRef) { }

  ngOnInit(): void {
    this.router.events.subscribe((evnt) => {
      if (evnt instanceof NavigationEnd && this.element.nativeElement instanceof HTMLElement) {
        let htmlElement: HTMLElement = this.element.nativeElement;
        if (evnt.url.startsWith('/products/')) {
          htmlElement.classList.add('active');
        } else {
          htmlElement.classList.remove('active');
        } 
      }
    });
  }
}

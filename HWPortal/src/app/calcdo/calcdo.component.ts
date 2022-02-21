import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calcdo',
  templateUrl: './calcdo.component.html',
  styleUrls: ['./calcdo.component.css']
})
export class CalcdoComponent implements OnInit {

  currentTab: string = "idtab";

  tabComponentMap: Map<string, string> = new Map();

  constructor() { }

  ngOnInit(): void {
    this.tabComponentMap.set("Исходные данные", "idtab");
    this.tabComponentMap.set("Нагрузки", "loadstab");
    this.tabComponentMap.set("Варианты конструкций", "variantstab");
    this.tabComponentMap.set("Расчёты", "calcstab");
  }

  //обработка нажатия на вкладку
  onTabClick(event: Event): void {
    if (!event) {
      return;
    }

    let targetTab = event.target as HTMLElement;

    if (!targetTab) {
      return;
    }

    let currentTab = document.querySelector(".nav.nav-tabs .nav-link.active");
    currentTab?.classList.remove("active");
    currentTab?.classList.add("link-secondary");

    targetTab.classList.add("active");
    targetTab.classList.remove("link-secondary");

    if (this.tabComponentMap.has(targetTab.innerText)) {
      this.currentTab = this.tabComponentMap.get(targetTab.innerText)!;
    }

  }

}

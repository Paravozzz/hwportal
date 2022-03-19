import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { EnvironmentUrlService } from '../_services/environment-url.service';

@Component({
  selector: 'app-calcdo',
  templateUrl: './calcdo.component.html',
  styleUrls: ['./calcdo.component.css']
})
export class CalcdoComponent implements OnInit {

  loaded: boolean = false;
  errorMessage: string = "";
  successMessage: string = "";
  currentTab: string = "idtab";

  tabComponentMap: Map<string, string> = new Map();

  constructor(private _http: HttpClient, private _envUrl: EnvironmentUrlService) { }

  ngOnInit(): void {
    this.tabComponentMap.set("Исходные данные", "idtab");
    this.tabComponentMap.set("Нагрузки", "loadstab");
    this.tabComponentMap.set("Варианты конструкций", "variantstab");
    this.tabComponentMap.set("Расчёты", "calcstab");

    let queryParams = new HttpParams();
    queryParams = queryParams.append("modelType", "Расчёт_ДО");
    this._http.get(this._envUrl.createCompleteRoute("api/models/default"), { params: queryParams }).subscribe(
      res => {
        if (!res) {
          this.errorMessage = "responce is null";
          return;
        }
        this.loaded = true;
    }, error => {
      this.errorMessage = error;
    })

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

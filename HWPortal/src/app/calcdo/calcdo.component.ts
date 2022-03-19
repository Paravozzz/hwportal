import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import { FormValues } from '../_interfaces/FormValues';
import { ModelService } from '../_services/model.service';

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

  model: object = {};

  constructor(private _model: ModelService) { }

  ngOnInit(): void {
    this.tabComponentMap.set("Исходные данные", "idtab");
    this.tabComponentMap.set("Нагрузки", "loadstab");
    this.tabComponentMap.set("Варианты конструкций", "variantstab");
    this.tabComponentMap.set("Расчёты", "calcstab");

    this._model.getDefaultModel("Расчёт_ДО").subscribe(
      response => {
        if (!response) {
          this.errorMessage = "responce is null";
          return;
        }
        this.loaded = true;
        if (!environment.production) {
          console.log(response);
        }
        this.model = response;
    }, error => {
      this.errorMessage = error;
    })

  }

  /**
   * Обработка события нажатия на вкладку
   * @param event
   */
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

  /**
   * Выполняется при измении дочерних форм во вложенных компонентах
   * @param formValues
   */
  childFormChanged(formValues: FormValues) {
    (this.model as any)[formValues.name] = formValues.values;
    if (!environment.production) {
      console.group('Форма после изменения:');
      console.log(this.model);
      console.groupEnd();
    }
  }

}

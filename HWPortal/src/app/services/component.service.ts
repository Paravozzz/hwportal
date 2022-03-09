import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ComponentService {

  private componentName: string = "app-landing";
  private componentNames: string[] = ["app-landing", 'app-news', "app-calcdo", "app-calcwalls", "app-about", "app-credits", "app-login", "app-register"]

  constructor() { }

  // Функция переключает компоненты
  switchComponent(componentName: string): void {
    if (!this.componentNames.includes(componentName)) {
      return;
    }
    this.componentName = componentName;
    let activeElement = document.querySelector("nav .nav-link.active");
    switch (componentName) {
      case 'app-login':
      case 'app-register':
        activeElement?.classList.remove("active");
        break;

      default:
        let element = document.getElementById(componentName);
        if (componentName === "app-calcdo" || componentName == "app-calcwalls") {
          element = document.getElementById("app-products");
        }
        activeElement?.classList.remove("active");
        element?.classList.add("active");
    }
  }

  currentComponent(): string {
    return this.componentName;
  }

}

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  componentName : string = "app-landing";
  componentNames : string[] = ["app-landing", 'app-news', "app-calcdo", "app-calcwalls", "app-about", "app-credits" ]

  constructor() { }

  ngOnInit(): void {

  }

  // Функция переключает компоненты
  switchComponent(componentName: string) : void {
    if (this.componentNames.includes(componentName)){
      this.componentName = componentName;
      let activeElement = document.querySelector("nav .nav-link.active");
      let element = document.getElementById(componentName);
      if (componentName === "app-calcdo" || componentName == "app-calcwalls") {
        element = document.getElementById("app-products");
      }
      activeElement?.classList.remove("active");
      element?.classList.add("active");
    }
  }

}

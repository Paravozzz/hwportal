import { Component, OnInit } from '@angular/core';
import { ComponentService } from '../../services/component.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private componentSevice : ComponentService) { }

  ngOnInit(): void {
  }

  // Функция переключает компоненты
  switchComponent(componentName: string): void {
    this.componentSevice.switchComponent(componentName);
  }

  currentComponent(): string {
    return this.componentSevice.currentComponent();
  }

}

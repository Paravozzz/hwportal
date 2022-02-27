import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';

/**
 * Слой в дорожной одежде
 * */
export interface PavementLayer {
  id: number,
  checked: boolean,
  name: string,
  height: number,
  minHeight: number,
  maxHeight: number,
  heightStep: number
}
/**
 * Таблица со слоями дорожной одежды
 * */
@Component({
  selector: 'app-layers-table',
  templateUrl: './layers-table.component.html',
  styleUrls: ['./layers-table.component.css']
})
export class LayersTableComponent implements OnInit {

  /**
   * набор слоёв ДО в таблице
   */
  @Input() variant: PavementLayer[] = [];

  /**
   * чекбокс в шапке таблицы
   */
  @ViewChild('allLayersCheckbox') allLayersCheckbox!: ElementRef;

  /**
   * состояние чекбокса в шапке таблицы
   */
  allLayersChecked: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  /**
   * Выбирает/развыбирает все чекбоксы-слои в таблице, после нажатия на чекбокс в шапке таблицы #allLayersCheckbox
   * */
  selectAll() {
    this.variant.forEach(element => element.checked = this.allLayersChecked);
  }

  /**
   * Cрабатывает при выборе чекбокса слоя в таблице
   * @param i индекс слоя
   */
  layerSelected(i: number) {
    //расставляем чекбоксики
    if (this.variant.every(e => e.checked === true)) {
      this.allLayersChecked = true;
      this.allLayersCheckbox.nativeElement.indeterminate = false;
    } else if (this.variant.every(e => e.checked === false)) {
      this.allLayersChecked = false;
      this.allLayersCheckbox.nativeElement.indeterminate = false;
    } else {
      if (this.allLayersCheckbox) {
        this.allLayersCheckbox.nativeElement.indeterminate = true;
      }
    }
  }

}

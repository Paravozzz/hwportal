import { Component, OnInit } from '@angular/core';
import { PavementLayer } from '../layers-table/layers-table.component';

/**
 * Вариант дорожной одежды (ДО).
 * Включает в себя таблицу со слоями ДО и кнопки добавления/удаления/перемещения слоёв ДО
 * */
@Component({
  selector: 'app-pavement-var',
  templateUrl: './pavement-var.component.html',
  styleUrls: ['./pavement-var.component.css']
})
export class PavementVarComponent implements OnInit {

  /**
  * слои варианта конструкции ДО
  */
  variant: PavementLayer[] = [
    {
      id: 1, checked:false, name: 'Слой 1', height: 5, minHeight: 3, maxHeight: 7, heightStep: 1.5
    },
    {
      id: 2, checked: false, name: 'Слой 2', height: 7, minHeight: 7, maxHeight: 10, heightStep: 1
    }];

  constructor() { }

  ngOnInit(): void {
  }

  /**
   * Выполняется, когда в таблице слоёв срабатывает событие добавление нового слоя
   * @param layer слой ДО
   */
  onAddLayer(layer: PavementLayer) {
    this.variant.push(layer);
  }

  /**
   * Выполняется, когда в таблице слоёв срабатывает событие удаления слоя
   * */
  onDelLayer() {
    this.variant = this.variant.filter(layer => layer.checked !== true);
  }

}

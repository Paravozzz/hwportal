import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { PavementLayer } from '../layers-table/layers-table.component';

/**
 * Кнопки добавления/удаления/перемещения слоёв ДО
 * */
@Component({
  selector: 'app-layers-controls',
  templateUrl: './layers-controls.component.html',
  styleUrls: ['./layers-controls.component.css']
})
export class LayersControlsComponent implements OnInit {

  /**
   * Событие добавления нового слоя
   */
  @Output() onAddLayer = new EventEmitter<PavementLayer>();
  /**
   * Событие удаления слоя
   */
  @Output() onDelLayer = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  /**
   * Создаёт новый слой ДО и вызывает событие добавление нового слоя
   * */
  addLayer() {
    let layer: PavementLayer = { id: 1, checked: false, name: 'Слой 1', height: 5, minHeight: 3, maxHeight: 7, heightStep: 1}
    this.onAddLayer.emit(layer);
  }

  /**
   * Вызывает событие удаления слоя
   * */
  delLayer() {
    this.onDelLayer.emit();
  }
}

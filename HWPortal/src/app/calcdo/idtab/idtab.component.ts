import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { FormValues } from '../../_interfaces/FormValues';

@Component({
  selector: 'app-idtab',
  templateUrl: './idtab.component.html',
  styleUrls: ['./idtab.component.css']
})
export class IdtabComponent implements OnInit {

  @Output() onValueChange = new EventEmitter<FormValues>();

  form!: FormGroup;

  constructor() { }

  ngOnInit(): void {

    //TODO: Сделать загрузку дефолтных значений из получаемой дефолтной модели с сервера

    this.initForm();

    this.form.valueChanges.subscribe((values) => { this.emitFormValues(values) });
    
  }
  /**
  * Отправляет наружу данные формы
  * @param values
  */
  private emitFormValues(values: object) {
    let fv: FormValues = { name: 'Исходные_данные', values: values };
    this.onValueChange.emit(fv);
  }

  /**
   * Задаёт начальные значения контролов формы
   * */
  private initForm(): void {
    this.form = new FormGroup({
      Район_проектирования: new FormControl(''),
      Наименование_объекта: new FormControl(''),
      Тип_местности_по_рельефу: new FormControl('1'),
      Дорожно_климатическая_зона: new FormControl('1'),
      Номер_района_по_количеству_расчётных_дней: new FormControl('1'),
      Схема_увлажнения_рабочего_слоя: new FormControl('1'),
      Категория_дороги: new FormControl('1'),
      Поправка_на_влажность: new FormControl('0'),
      Тип_дорожной_одежды: new FormControl('1'),
      Количество_полос_движения: new FormControl('1'),
      Заданная_надёжность: new FormControl('1'),
      Тип_земляного_полотна: new FormControl('1'),
      Глубина_промерзания_грунта_от_поверхности_покрытия: new FormControl('0'),
      Расстояние_от_низа_дорожной_одежды_до_расчётного_УГВ: new FormControl('0'),
      Коэффициент_уплотнения_грунта: new FormControl('2'),
      Ширина_проезжей_части: new FormControl('')
    })
  }

}

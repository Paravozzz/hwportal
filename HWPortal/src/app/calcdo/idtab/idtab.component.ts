import { Component, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { FormValues } from '../../_interfaces/FormValues';

@Component({
  selector: 'app-idtab',
  templateUrl: './idtab.component.html',
  styleUrls: ['./idtab.component.css']
})
export class IdtabComponent implements OnInit, OnDestroy {

  @Output() onValueChange = new EventEmitter<FormValues>();

  form!: FormGroup;

  formValueChanges!: Subscription;

  constructor() { }

  ngOnInit(): void {
    //TODO: Сделать загрузку дефолтных значений из получаемой дефолтной модели с сервера

    this.initForm();

    this.subscribeToValueChanges();


  }

  ngOnDestroy(): void {
    this.unsubscribeToValueChanges();
  }

  subscribeToValueChanges(): void {
    this.formValueChanges = this.form.valueChanges.subscribe(() => { this.emitFormValues() });
  }

  unsubscribeToValueChanges(): void {
    this.formValueChanges.unsubscribe();
  }

  /**
  * Отправляет наружу данные формы
  * @param values
  */
  private emitFormValues() {

    this.checkForm();

    let fv: FormValues = { name: 'Исходные_данные', values: this.form.value };
    this.onValueChange.emit(fv);
  }

  /**
   * Изменение состояния одних контролов в зависимости от состояния других
   * */
  private checkForm(): void {
    this.unsubscribeToValueChanges();



    this.subscribeToValueChanges();
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

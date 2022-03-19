import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { FormValues } from '../../_interfaces/FormValues';


@Component({
  selector: 'app-loadstab',
  templateUrl: './loadstab.component.html',
  styleUrls: ['./loadstab.component.css']
})
export class LoadstabComponent implements OnInit {

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
    let fv: FormValues = { name: 'Нагрузки', values: values }; 
    this.onValueChange.emit(fv);
  }

  /**
   * Задаёт начальные значения контролов формы
   * */
  private initForm(): void {
    this.form = new FormGroup({
      Группа_расчётной_нагрузки: new FormControl('2'),
      Однобалонное_колесо: new FormControl(false),
      Статическая_нагрузка_на_колесо: new FormControl({ value: '', disabled: true }),
      Давление_в_шине: new FormControl({ value: '', disabled: true }),
      Показатель_изменения_интенсивности: new FormControl('1.04'),
      Год_на_который_задана_интенсивность: new FormControl(''),
      Срок_работ_по_капитальному_ремонту: new FormControl(''),
      Срок_работ_по_ремонту: new FormControl(''),
      Суммарное_число_приложений_расчётной_нагрузки_flag: new FormControl(false),
      Суммарное_число_приложений_расчётной_нагрузки: new FormControl({ value: '', disabled: true }),
      Приведённая_интенсивность_на_одну_полосу_flag: new FormControl(false),
      Приведённая_интенсивность_на_одну_полосу: new FormControl({ value: '', disabled: true }),
      Коэффициенты_приведения_к_нагрузке: new FormControl('2'),
      Таблица_нагрузок: new FormArray([
        new FormGroup({
          Категория_ТС: new FormControl('B'),
          Наименование: new FormControl('Небольшие грузовики (фургоны) и другие автомобили с прицепом и без него'),
          Коэффициент: new FormControl({ value: '0', disabled: true }),
          Интенсивность: new FormControl('0'),
        }),
        new FormGroup({
          Категория_ТС: new FormControl('C1'),
          Наименование: new FormControl('Двухосные грузовые автомобили'),
          Коэффициент: new FormControl({ value: '0', disabled: true }),
          Интенсивность: new FormControl('0'),
        }),
        new FormGroup({
          Категория_ТС: new FormControl('C2'),
          Наименование: new FormControl('Трехосные грузовые автомобили'),
          Коэффициент: new FormControl({ value: '0', disabled: true }),
          Интенсивность: new FormControl('0'),
        }),
        new FormGroup({
          Категория_ТС: new FormControl('C3'),
          Наименование: new FormControl('Четырехосные грузовые автомобили'),
          Коэффициент: new FormControl({ value: '0', disabled: true }),
          Интенсивность: new FormControl('0'),
        }),
        new FormGroup({
          Категория_ТС: new FormControl('C4'),
          Наименование: new FormControl('Четырехосные автопоезда (двухосный грузовой автомобиль с прицепом)'),
          Коэффициент: new FormControl({ value: '0', disabled: true }),
          Интенсивность: new FormControl('0'),
        }),
        new FormGroup({
          Категория_ТС: new FormControl('C5'),
          Наименование: new FormControl('Пятиосные автопоезда (трехосный грузовой автомобиль с прицепом)'),
          Коэффициент: new FormControl({ value: '0', disabled: true }),
          Интенсивность: new FormControl('0'),
        }),
        new FormGroup({
          Категория_ТС: new FormControl('C6'),
          Наименование: new FormControl('Трехосные седельные автопоезда (двухосный седельный тягач с полуприцепом)'),
          Коэффициент: new FormControl({ value: '0', disabled: true }),
          Интенсивность: new FormControl('0'),
        }),
        new FormGroup({
          Категория_ТС: new FormControl('C7'),
          Наименование: new FormControl('Четырехосные седельные автопоезда (двухосный седельный тягач с полуприцепом)'),
          Коэффициент: new FormControl({ value: '0', disabled: true }),
          Интенсивность: new FormControl('0'),
        }),
        new FormGroup({
          Категория_ТС: new FormControl('C8'),
          Наименование: new FormControl('Пятиосные седельные автопоезда (двухосный седельный тягач с полуприцепом)'),
          Коэффициент: new FormControl({ value: '0', disabled: true }),
          Интенсивность: new FormControl('0'),
        }),
        new FormGroup({
          Категория_ТС: new FormControl('C9'),
          Наименование: new FormControl('Пятиосные седельные автопоезда (трехосный седельный тягач с полуприцепом)'),
          Коэффициент: new FormControl({ value: '0', disabled: true }),
          Интенсивность: new FormControl('0'),
        }),
        new FormGroup({
          Категория_ТС: new FormControl('C10'),
          Наименование: new FormControl('Шестиосные седельные автопоезда'),
          Коэффициент: new FormControl({ value: '0', disabled: true }),
          Интенсивность: new FormControl('0'),
        }),
        new FormGroup({
          Категория_ТС: new FormControl('C11'),
          Наименование: new FormControl('Автомобили с семью и более осями и другие'),
          Коэффициент: new FormControl({ value: '0', disabled: true }),
          Интенсивность: new FormControl('0'),
        }),
        new FormGroup({
          Категория_ТС: new FormControl('D'),
          Наименование: new FormControl('Автобусы'),
          Коэффициент: new FormControl({ value: '0', disabled: true }),
          Интенсивность: new FormControl('0'),
        }),
      ])
    });
  }

  get LoadsTable() {
    return this.form.get('Таблица_нагрузок') as FormArray;
  }

}

import { Component, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { FormValues } from '../../_interfaces/FormValues';


@Component({
  selector: 'app-loadstab',
  templateUrl: './loadstab.component.html',
  styleUrls: ['./loadstab.component.css']
})
export class LoadstabComponent implements OnInit, OnDestroy {

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
    
    let fv: FormValues = { name: 'Нагрузки', values: this.form.value };
    this.onValueChange.emit(fv);
  }

  /**
   * Изменение состояния одних контролов в зависимости от состояния других
   * */
  private checkForm(): void {
    this.unsubscribeToValueChanges();

    if (this.form.get('Суммарное_число_приложений_расчётной_нагрузки_flag')?.value === true) {
      this.form.get('Суммарное_число_приложений_расчётной_нагрузки')?.enable();
    } else {
      this.form.get('Суммарное_число_приложений_расчётной_нагрузки')?.disable();
    }

    if (this.form.get('Приведённая_интенсивность_на_одну_полосу_flag')?.value === true) {
      this.form.get('Приведённая_интенсивность_на_одну_полосу')?.enable();
    } else {
      this.form.get('Приведённая_интенсивность_на_одну_полосу')?.disable();
    }

    if (this.form.get('Группа_расчётной_нагрузки')?.value === '99') {
      this.form.get('Статическая_нагрузка_на_колесо')?.enable();
      this.form.get('Давление_в_шине')?.enable();
    } else {
      this.form.get('Статическая_нагрузка_на_колесо')?.disable();
      this.form.get('Давление_в_шине')?.disable();
    }

    ((this.form.get('Таблица_нагрузок') as FormArray).controls as FormGroup[]).forEach((element) => {
      if (this.form.get('Коэффициенты_приведения_к_нагрузке')?.value === '99') {
        element.controls['Коэффициент'].enable();
      } else {
        element.controls['Коэффициент'].disable();
      }
      
    });

    this.subscribeToValueChanges();
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
          Коэффициент: new FormControl({value: '0', disabled: true}),
          Интенсивность: new FormControl('0'),
        }),
        new FormGroup({
          Категория_ТС: new FormControl('C1'),
          Наименование: new FormControl('Двухосные грузовые автомобили'),
          Коэффициент: new FormControl({value: '0', disabled: true}),
          Интенсивность: new FormControl('0'),
        }),
        new FormGroup({
          Категория_ТС: new FormControl('C2'),
          Наименование: new FormControl('Трехосные грузовые автомобили'),
          Коэффициент: new FormControl({value: '0', disabled: true}),
          Интенсивность: new FormControl('0'),
        }),
        new FormGroup({
          Категория_ТС: new FormControl('C3'),
          Наименование: new FormControl('Четырехосные грузовые автомобили'),
          Коэффициент: new FormControl({value: '0', disabled: true}),
          Интенсивность: new FormControl('0'),
        }),
        new FormGroup({
          Категория_ТС: new FormControl('C4'),
          Наименование: new FormControl('Четырехосные автопоезда (двухосный грузовой автомобиль с прицепом)'),
          Коэффициент: new FormControl({value: '0', disabled: true}),
          Интенсивность: new FormControl('0'),
        }),
        new FormGroup({
          Категория_ТС: new FormControl('C5'),
          Наименование: new FormControl('Пятиосные автопоезда (трехосный грузовой автомобиль с прицепом)'),
          Коэффициент: new FormControl({value: '0', disabled: true}),
          Интенсивность: new FormControl('0'),
        }),
        new FormGroup({
          Категория_ТС: new FormControl('C6'),
          Наименование: new FormControl('Трехосные седельные автопоезда (двухосный седельный тягач с полуприцепом)'),
          Коэффициент: new FormControl({value: '0', disabled: true}),
          Интенсивность: new FormControl('0'),
        }),
        new FormGroup({
          Категория_ТС: new FormControl('C7'),
          Наименование: new FormControl('Четырехосные седельные автопоезда (двухосный седельный тягач с полуприцепом)'),
          Коэффициент: new FormControl({value: '0', disabled: true}),
          Интенсивность: new FormControl('0'),
        }),
        new FormGroup({
          Категория_ТС: new FormControl('C8'),
          Наименование: new FormControl('Пятиосные седельные автопоезда (двухосный седельный тягач с полуприцепом)'),
          Коэффициент: new FormControl({value: '0', disabled: true}),
          Интенсивность: new FormControl('0'),
        }),
        new FormGroup({
          Категория_ТС: new FormControl('C9'),
          Наименование: new FormControl('Пятиосные седельные автопоезда (трехосный седельный тягач с полуприцепом)'),
          Коэффициент: new FormControl({value: '0', disabled: true}),
          Интенсивность: new FormControl('0'),
        }),
        new FormGroup({
          Категория_ТС: new FormControl('C10'),
          Наименование: new FormControl('Шестиосные седельные автопоезда'),
          Коэффициент: new FormControl({value: '0', disabled: true}),
          Интенсивность: new FormControl('0'),
        }),
        new FormGroup({
          Категория_ТС: new FormControl('C11'),
          Наименование: new FormControl('Автомобили с семью и более осями и другие'),
          Коэффициент: new FormControl({value: '0', disabled: true}),
          Интенсивность: new FormControl('0'),
        }),
        new FormGroup({
          Категория_ТС: new FormControl('D'),
          Наименование: new FormControl('Автобусы'),
          Коэффициент: new FormControl({value: '0', disabled: true}),
          Интенсивность: new FormControl('0'),
        }),
      ])
    });
  }

  get LoadsTable() {
    return this.form.get('Таблица_нагрузок') as FormArray;
  }

}

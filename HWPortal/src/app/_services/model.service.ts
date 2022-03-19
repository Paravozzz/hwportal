import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EnvironmentUrlService } from './environment-url.service';

@Injectable({
  providedIn: 'root'
})
export class ModelService {

  constructor(private _http: HttpClient, private _envUrl: EnvironmentUrlService) { }

  /**
   * Запрос новой модели со значениями по-умолчанию
   * @param modelType Тип модели
   */
  public getDefaultModel(modelType: string) {
    let queryParams = new HttpParams();
    queryParams = queryParams.append("modelType", modelType);
    return this._http.get(this._envUrl.createCompleteRoute("api/models/default"), { params: queryParams })
  } 

}

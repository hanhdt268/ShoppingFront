import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Manufacturer} from "../_model/manufacturer.model";

@Injectable({
  providedIn: 'root'
})
export class ManufacturerService {

  private apiBaseUrl = environment.apiBaseUrl
  constructor(private _http: HttpClient) { }

  public addManufacturer(manufacturer: Manufacturer){
    return this._http.post<Manufacturer>(`${this.apiBaseUrl}/manufacturer/`, manufacturer)
  }

  public updateManufacturer(manufacturer: Manufacturer){
    return this._http.put<Manufacturer>(`${this.apiBaseUrl}/manufacturer/`, manufacturer)
  }

  public getManufacturers(){
    return this._http.get(`${this.apiBaseUrl}/manufacturer/`)
  }

  public getManufacturerById(mId: any){
    return this._http.get(`${this.apiBaseUrl}/manufacturer/${mId}`)
  }

  public deleteManufacturer(mId: any){
    return this._http.delete(`${this.apiBaseUrl}/manufacturer/${mId}`)
  }

  public getManufacturer(cId: any){
    return this._http.get(`${this.apiBaseUrl}/manufacturer/category/${cId}`)
  }
}

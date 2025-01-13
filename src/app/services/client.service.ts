import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Client } from '../model/class/Client';
import { environment  } from '../../environments/environment';
import { APIResponseModel } from '../model/interface/role';
import { Constant } from '../constant/Constant';


@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private Http: HttpClient) { }

  getAllClients():Observable<APIResponseModel> {
    return this.Http.get<APIResponseModel>(environment.API_URL + Constant.API_METHOD.GET_ALL_CLIENT);
  }

  getAllEmployees():Observable<APIResponseModel> {
    return this.Http.get<APIResponseModel>(environment.API_URL + Constant.API_METHOD.GET_ALL_EMP);
  }

  addUpdate (obj:Client):Observable<APIResponseModel> {
    return this.Http.post<APIResponseModel>(environment.API_URL + "AddUpdateClient", obj);
  }

  deleteClientById(id:number):Observable<APIResponseModel> {
    return this.Http.delete<APIResponseModel>(environment.API_URL + "DeleteClientByClientId?ClientId=" + id);
  }

  addClientProjectUpdate (obj:Client):Observable<APIResponseModel> {
    return this.Http.post<APIResponseModel>(environment.API_URL + "AddUpdateClientProject", obj);
  }

  getAllClientsProjects():Observable<APIResponseModel> {
    return this.Http.get<APIResponseModel>(environment.API_URL + Constant.API_METHOD.GET_ALL_CLIENT_PROJECT);
  }
}

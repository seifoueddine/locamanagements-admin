import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private serviceDashbordStatUrl = environment.ENDPOINTS.STATS;
  constructor(private http: HttpClient) {}

  getStats(): Observable<any> {
    
    const req = this.serviceDashbordStatUrl ;
    return this.http.get(req, { observe: 'response' });
  }




}

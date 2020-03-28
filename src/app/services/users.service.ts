import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Users } from '../../app/shared/models/users.model';
import { environment } from 'src/environments/environment';




const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private serviceUrl = environment.ENDPOINTS.USERS_PATH;
  constructor(private http: HttpClient) {}

  addUser(user: Users): Observable<Users> {
    return this.http.post<Users>(this.serviceUrl, user, httpOptions);
  }


  /**
   * this method call the server to get all the contact-bases
   * @param page number of the page
   * @param active the field to sort
   * @param direction the sort direction
   * @param size the page size
   */
  getUsers(page = 0, active = 'name', direction = 'desc', size?: number): Observable<any> {
 
    const req = this.serviceUrl + `?page=${page}&per_page=${size}&sort=${active},${direction}`;
    return this.http.get(req, { observe: 'response' });
  }
  /**
    * this method call the server to get all the structure by ID
    * @param userId
    */
  getUserById(userId: number): Observable<Users> {
    const req = this.serviceUrl + `/${userId}`;
    console.log(req);
    return this.http.get<Users>(req);
  }

  /**
   * update the contact base informations
   * @param user
   */
  updateUser(user: Users): Observable<Users> {
    const req = this.serviceUrl + `/${user.id}`;
    console.log(req);
    console.log(user);
    return this.http.put<Users>(req, user);
  }



}
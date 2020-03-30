import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { Slugs } from '../shared/models/slugs.model';




const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
  providedIn: 'root'
})
export class SlugsService {

  private serviceUrl = environment.ENDPOINTS.SLUGS_PATH;
  constructor(private http: HttpClient) {}

  addSlug(slug: Slugs): Observable<Slugs> {
    return this.http.post<any>(this.serviceUrl, slug, httpOptions);
  }


  /**
   * this method call the server to get all the contact-bases
   * @param page number of the page
   * @param active the field to sort
   * @param direction the sort direction
   * @param size the page size
   */
  getSlugs(page = 1, active = 'created_at', direction = 'desc', size= 10): Observable<any> {
 
    const req = this.serviceUrl + `?page=${page}&per_page=${size}&order=${active}&direction=${direction}`;
    return this.http.get(req, { observe: 'response' });
  }
  /**
    * this method call the server to get all the structure by ID
    * @param slugId
    */
  getSlugById(slugId: number): Observable<Slugs> {
    const req = this.serviceUrl + `/${slugId}`;
    console.log(req);
    return this.http.get<Slugs>(req);
  }

  /**
   * update the contact base informations
   * @param slug
   */
  updateSlug(slug: any): Observable<Slugs> {
    const req = this.serviceUrl + `/${slug.id}`;
    console.log(req);
    console.log(slug);
    return this.http.put<Slugs>(req, slug);
  }



}
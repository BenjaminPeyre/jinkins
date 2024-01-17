import { Injectable } from '@angular/core';
import { CD } from '../models/cd';
import {HttpClient, HttpClientModule } from '@angular/common/http';
import { map, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CdsService {

  constructor(private http: HttpClient) { }

  getAllCDs(): Observable<CD[]> {
    return this.http.get<CD[]>("http://localhost:3000/CD")

  }

  getCDById(id: number): Observable<CD> {
    const cd = this.http.get<CD>("http://localhost:3000/CD?id=" +id);
    if (cd!==undefined) {
      return cd;
    }
    else {
      throw new Error('CD introuvable');
    }
  }
  addCd(cd: CD): Observable<CD> {
    return this.getAllCDs().pipe(
      map(cds => [...cds].sort((a,b) => a.id - b.id)),
      map(cds_tries => cds_tries[cds_tries.length - 1]),
      map(cd_max  => (cd.id = cd_max.id +1)),
      switchMap(() => this.http.post<CD> ('http://localhost:3000/CD', cd))
    );
  }
}

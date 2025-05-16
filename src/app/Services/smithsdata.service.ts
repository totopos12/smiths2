import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SmithsdataService {
  private apiUrl = 'https://datausa.io/api/data?drilldowns=Nation&measures=Population';

  constructor(private httpClient: HttpClient) { }

  getMethod(): Observable<any> {
    return this.httpClient.get<any>(this.apiUrl).pipe(
      tap(data => console.log('Data received:', data))
    );
  }
}
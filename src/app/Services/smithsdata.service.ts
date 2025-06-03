// src/app/Services/smithsdata.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SmithsdataService {
  // URL de la API REST
  private apiUrl = 'https://localhost:44374/api/Compressor';

  constructor(private httpClient: HttpClient) { }

  getMethod(): Observable<any> {
    return this.httpClient.get<any>(this.apiUrl).pipe(
      tap(data => console.log('Data received:', data))
    );
  }
}

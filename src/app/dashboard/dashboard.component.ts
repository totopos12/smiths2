import { Component } from '@angular/core';
import { SmithsdataService } from './../Services/smithsdata.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'dashboard.component.html',
  styleUrl: 'dashboard.component.css'
})

export class DashboardComponent {
  constructor(private smithsdataService: SmithsdataService) { }

  onClick(): void {
    this.smithsdataService.getMethod().subscribe({
      next: (data) => console.log('Datos recibidos en el componente:', data),
      error: (error) => console.error('Error:', error)
    });
  }
}
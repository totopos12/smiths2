import { Component, OnInit } from '@angular/core';
import { SmithsdataService } from '../Services/smithsdata.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule} from '@angular/material/button'
import * as XLSX from 'xlsx';

@Component({
  selector: 'tableComponent',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
  imports:[CommonModule,MatButtonModule]
})

export class DataTableComponent implements OnInit {
  data: any[] = [];

  constructor(private smithsdataService: SmithsdataService) {}

  ngOnInit(): void {
    this.smithsdataService.getMethod().subscribe(response => {
      this.data = response.data; 
    });
  }
   exportToCSV(): void {
    const csvContent = [
      ['Nation', 'Year', 'Population'],
      ...this.data.map(item => [item.Nation, item.Year, item.Population])
    ].map(e => e.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'data_export.csv';
    a.click();
  }
  

exportToExcel(): void {
  const worksheet = XLSX.utils.json_to_sheet(this.data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Data");

  XLSX.writeFile(workbook, "data_export.xlsx");
}
}

import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { MatPaginator } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';

export interface CompressorData {
  WORKING_PRESSURE_PSI: number;
  WORKING_PRESSURE_BAR: number;
  MOTOR_POWER_HP: number;
  MOTOR_POWER_KW: number;
  VOLTAGE: string;
}

@Component({
  imports:[ MatPaginator, MatTableModule, MatButtonModule],
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit, AfterViewInit {
  // Columnas que se mostrarán en la tabla
  displayedColumns: string[] = [
    'WORKING_PRESSURE_PSI', 
    'WORKING_PRESSURE_BAR', 
    'MOTOR_POWER_HP', 
    'MOTOR_POWER_KW', 
    'VOLTAGE'
  ];
  
  // Instancia del datasource para la tabla
  dataSource = new MatTableDataSource<CompressorData>();

  // Usamos el paginator de Angular Material
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  // Datos estáticos (hardcodeados) que se mostrarán en la tabla
  staticData: CompressorData[] = [
    { WORKING_PRESSURE_PSI: 143.24, WORKING_PRESSURE_BAR: 9.87, MOTOR_POWER_HP: 10.00, MOTOR_POWER_KW: 7.50, VOLTAGE: "220V" },
    { WORKING_PRESSURE_PSI: 157.48, WORKING_PRESSURE_BAR: 10.82, MOTOR_POWER_HP: 10.00, MOTOR_POWER_KW: 7.50, VOLTAGE: "220V" },
    { WORKING_PRESSURE_PSI: 149.15, WORKING_PRESSURE_BAR: 10.20, MOTOR_POWER_HP: 10.00, MOTOR_POWER_KW: 7.50, VOLTAGE: "220V" },
    { WORKING_PRESSURE_PSI: 145.68, WORKING_PRESSURE_BAR: 10.01, MOTOR_POWER_HP: 10.00, MOTOR_POWER_KW: 7.50, VOLTAGE: "220V" },
    { WORKING_PRESSURE_PSI: 154.33, WORKING_PRESSURE_BAR: 10.56, MOTOR_POWER_HP: 10.00, MOTOR_POWER_KW: 7.50, VOLTAGE: "220V" },
    { WORKING_PRESSURE_PSI: 147.52, WORKING_PRESSURE_BAR: 10.08, MOTOR_POWER_HP: 10.00, MOTOR_POWER_KW: 7.50, VOLTAGE: "220V" },
    { WORKING_PRESSURE_PSI: 151.87, WORKING_PRESSURE_BAR: 10.44, MOTOR_POWER_HP: 10.00, MOTOR_POWER_KW: 7.50, VOLTAGE: "220V" },
    { WORKING_PRESSURE_PSI: 148.76, WORKING_PRESSURE_BAR: 10.23, MOTOR_POWER_HP: 10.00, MOTOR_POWER_KW: 7.50, VOLTAGE: "220V" },
    { WORKING_PRESSURE_PSI: 155.20, WORKING_PRESSURE_BAR: 10.75, MOTOR_POWER_HP: 10.00, MOTOR_POWER_KW: 7.50, VOLTAGE: "220V" },
    { WORKING_PRESSURE_PSI: 144.99, WORKING_PRESSURE_BAR: 9.93, MOTOR_POWER_HP: 10.00, MOTOR_POWER_KW: 7.50, VOLTAGE: "220V" },
    { WORKING_PRESSURE_PSI: 152.47, WORKING_PRESSURE_BAR: 10.53, MOTOR_POWER_HP: 10.00, MOTOR_POWER_KW: 7.50, VOLTAGE: "220V" },
    { WORKING_PRESSURE_PSI: 146.28, WORKING_PRESSURE_BAR: 10.01, MOTOR_POWER_HP: 10.00, MOTOR_POWER_KW: 7.50, VOLTAGE: "220V" },
    { WORKING_PRESSURE_PSI: 150.84, WORKING_PRESSURE_BAR: 10.32, MOTOR_POWER_HP: 10.00, MOTOR_POWER_KW: 7.50, VOLTAGE: "220V" },
    { WORKING_PRESSURE_PSI: 153.93, WORKING_PRESSURE_BAR: 10.63, MOTOR_POWER_HP: 10.00, MOTOR_POWER_KW: 7.50, VOLTAGE: "220V" }
  ];

  constructor() { }

  ngOnInit(): void {
    // Asigna los datos estáticos al datasource
    this.dataSource.data = this.staticData;
  }

  ngAfterViewInit(): void {
    // Asigna el paginador al datasource una vez que la vista se haya inicializado
    this.dataSource.paginator = this.paginator;
  }

  /**
   * Exporta los datos de la tabla a Excel.
   */
  exportToExcel(): void {
    // Crea una hoja de Excel a partir de los datos JSON
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.staticData);
    const workbook: XLSX.WorkBook = {
      Sheets: { 'DatosCompresor': worksheet },
      SheetNames: ['DatosCompresor']
    };

    // Genera el buffer del libro de Excel
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile(excelBuffer, 'DatosCompresor');
  }

  /**
   * Guarda el buffer como archivo Excel usando FileSaver.
   */
  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], { type: 'application/octet-stream' });
    saveAs(data, `${fileName}_${new Date().getTime()}.xlsx`);
  }
}
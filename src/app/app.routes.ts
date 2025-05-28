import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DataTableComponent } from './table/table.component';
import { ChartsComponent } from './charts/charts.component';
import { HelloComponent } from './hello/hello.component';

export const routes: Routes = [
    {
        path: '',
        component: DashboardComponent
    },
    {
        path: 'charts',
        component: ChartsComponent
    },
    {
        path: 'tables',
        component: DataTableComponent
    },
    {
        path: 'hello',
        component: HelloComponent
    },
];

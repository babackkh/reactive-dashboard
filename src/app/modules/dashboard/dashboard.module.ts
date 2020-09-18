import { TeamsComponent } from './../../components/dashboard/teams/teams.component';
import { CallsWidgetComponent } from './../../components/dashboard/calls-widget/calls-widget.component';
import { CallsChartComponent } from './../../components/dashboard/calls-chart/calls-chart.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ChartsModule } from 'ng2-charts';
import { DashboardComponent } from '../../components/dashboard/dashboard.component';
import { SharedModule } from '../shared/shared.module';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';

@NgModule({
  imports: [
    RouterModule,
    DashboardRoutingModule,
    SharedModule,
    ChartsModule,
    FormsModule,
  ],
  exports: [],
  declarations: [
    DashboardComponent,
    CallsChartComponent,
    CallsWidgetComponent,
    TeamsComponent,
  ],
  providers: [DatePipe],
})
export class DashboardModule {}

import { Component, OnInit, Input, OnChanges, OnDestroy } from '@angular/core';
import { Observable, timer, Subscription, concat, forkJoin } from 'rxjs';
import { ChartDataSets } from 'chart.js';
import { Label, Color } from 'ng2-charts';
import { CallService } from 'src/app/services/call.service';
import { count, map, tap, concatAll } from 'rxjs/operators';

@Component({
  selector: 'app-calls-chart',
  templateUrl: './calls-chart.component.html',
  styleUrls: ['./calls-chart.component.scss'],
})
export class CallsChartComponent implements OnInit, OnDestroy {
  callsCount: number;
  timeStampSubs: Observable<string[]>;
  callCountSubs: Observable<number>;
  callsChartSubscription: Subscription;

  constructor(private callService: CallService) {}

  lineChartData: ChartDataSets[] = [{ data: [], label: 'Active Calls' }];

  lineChartLabels: Label[];

  lineChartOptions = {
    responsive: true,
  };

  lineChartColors: Color[] = [
    {
      borderColor: 'grey',
      backgroundColor: '#9aa5e4',
    },
  ];

  lineChartLegend = true;
  lineChartPlugins = [];
  lineChartType = 'line';

  ngOnInit(): void {
    this.timeStampSubs = this.callService.timeStamps().pipe(
      tap((timeStamps) => {
        this.lineChartData[0].data.length = 0;
        this.lineChartLabels = timeStamps;
      })
    );
    this.callCountSubs = this.callService.callsUpdateListener().pipe(
      tap((value) => {
        this.callsCount = value;
        this.lineChartData[0].data.push(this.callsCount);
      })
    );
    this.callsChartSubscription = forkJoin([
      this.timeStampSubs,
      this.callCountSubs,
    ]).subscribe();
  }

  ngOnDestroy(): void {
    this.callsChartSubscription.unsubscribe();
  }
}

import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { forkJoin, Observable, Subscription } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { SettingsModel } from 'src/app/models/settings.model';
import { CallService } from 'src/app/services/call.service';
import { SettingsService } from 'src/app/services/settings.service';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.scss'],
})
export class TeamsComponent implements OnInit, OnDestroy {
  teamName: string;
  showCharts: boolean;
  showWidget: boolean;
  callsGenSubs: Observable<number>;
  settingsSubs: Observable<SettingsModel>;
  teamsSubscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private callService: CallService,
    private settingsService: SettingsService,
    private breakpointObserver: BreakpointObserver
  ) {}

  cards = this.breakpointObserver
    .observe([
      Breakpoints.Handset,
      Breakpoints.HandsetPortrait,
      Breakpoints.Small,
      Breakpoints.TabletPortrait,
    ])
    .pipe(
      map(({ matches }) => {
        if (matches) {
          return [
            { cols: 3, rows: 1 },
            { cols: 3, rows: 1 },
          ];
        }
        return [
          { cols: 2, rows: 1 },
          { cols: 1, rows: 1 },
        ];
      })
    );

  ngOnInit(): void {
    /* this.route.paramMap.subscribe((params: ParamMap) => {
      if (params.has('teamId')) {
        this.teamName = `Team ${params.get('teamId')}`;
      }
    }); */
    this.callsGenSubs = this.callService.callsNumberGenerator().pipe(
      tap((callsNumber) => {
        this.callService.callsNumberSub$.next(callsNumber);
      })
    );
    this.settingsSubs = this.settingsService.settingsUpdateListener().pipe(
      tap((settingsData) => {
        this.showCharts = settingsData.showChart.checked;
        this.showWidget = settingsData.showDataWidget.checked;
      })
    );
    this.teamsSubscription = forkJoin([
      this.settingsSubs,
      this.callsGenSubs,
    ]).subscribe();
  }

  ngOnDestroy(): void {
    this.teamsSubscription.unsubscribe();
  }
}

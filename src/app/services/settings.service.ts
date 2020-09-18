import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { SettingsModel, SettingsResponse } from './../models/settings.model';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  settings: SettingsModel;
  settingsSub$ = new ReplaySubject<SettingsModel>();

  constructor(private http: HttpClient) {}

  getSettings(): SettingsModel {
    return this.settings;
  }

  settingsUpdateListener(): Observable<SettingsModel> {
    return this.settingsSub$.asObservable();
  }

  getSettingsData(): void {
    this.http
      .get<SettingsResponse>('assets/data/settings.json')
      .pipe(
        map((responseData) => {
          const settingsData: SettingsModel = {
            showAdminsOnly: {
              name: 'Show Admin Users Only',
              checked: responseData.showAdminsOnly,
            },
            showChart: {
              name: 'Show Real-Time Chart',
              checked: responseData.showChart,
            },
            showDataWidget: {
              name: 'Show Current Calls Widget',
              checked: responseData.showDataWidget,
            },
          };
          return settingsData;
        })
      )
      .subscribe((settingsData) => {
        this.updateSettings(settingsData);
      });
  }

  updateSettings(updatedSettings: SettingsModel): void {
    this.settings = updatedSettings;
    this.settingsSub$.next({ ...this.settings });
  }
}

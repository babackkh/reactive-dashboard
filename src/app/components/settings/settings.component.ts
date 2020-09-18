import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { SettingsModel } from 'src/app/models/settings.model';
import { SettingsService } from 'src/app/services/settings.service';
import { Subscription } from 'rxjs';
import { skipWhile } from 'rxjs/operators';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit, OnDestroy {
  settings: SettingsModel;
  settingsForm: FormGroup;
  settingsSubs: Subscription;

  constructor(private settingsService: SettingsService) {}

  ngOnInit(): void {
    this.settingsSubs = this.settingsService
      .settingsUpdateListener()
      .pipe(skipWhile((settingsData) => !settingsData))
      .subscribe((settingsData) => {
        this.settings = settingsData;
        this.initForm(settingsData);
        this.settingsForm.valueChanges.subscribe((formData) => {
          const updatedSettings: SettingsModel = {
            showAdminsOnly: {
              checked: formData.showAdminsOnly,
              name: this.settings.showAdminsOnly.name,
            },
            showChart: {
              checked: formData.showChart,
              name: this.settings.showChart.name,
            },
            showDataWidget: {
              checked: formData.showDataWidget,
              name: this.settings.showDataWidget.name,
            },
          };
          this.settingsService.updateSettings(updatedSettings);
        });
      });
  }

  ngOnDestroy(): void {
    this.settingsSubs.unsubscribe();
  }

  private initForm(settingsData: SettingsModel): void {
    this.settingsForm = new FormGroup({
      showAdminsOnly: new FormControl(settingsData.showAdminsOnly.checked),
      showChart: new FormControl(settingsData.showChart.checked),
      showDataWidget: new FormControl(settingsData.showDataWidget.checked),
    });
  }
}

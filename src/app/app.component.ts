import { CallService } from './services/call.service';
import { SettingsService } from './services/settings.service';
import { Component, OnInit } from '@angular/core';
import { UsersService } from './services/users.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'plusone';

  constructor(
    private settingsService: SettingsService,
    private usersService: UsersService,
    private callService: CallService
  ) {
    this.settingsService.getSettingsData();
    this.usersService.getUsersData();
    this.callService.getTeams();
  }

  ngOnInit(): void {}
}

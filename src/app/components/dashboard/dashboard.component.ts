import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TeamsModel } from 'src/app/models/teams.model';
import { CallService } from 'src/app/services/call.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  teams: TeamsModel[];
  teamId: string;

  constructor(
    private callService: CallService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.callService.teamsUpdateListener().subscribe((teamsData) => {
      this.teams = teamsData;
    });
    const routeHasChildren = this.route.snapshot.children[0];
    if (routeHasChildren) {
      this.teamId = routeHasChildren.params.teamId;
    }
  }

  onTeamSelect(teamId: string): void {
    this.router.navigate(['dashboard', teamId]);
  }
}

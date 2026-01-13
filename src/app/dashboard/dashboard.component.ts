import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { ChartData, ChartOptions } from 'chart.js';

import { MemberService } from '../../services/memeber.service';
import { EvtService } from '../../services/evt.service';
import { PublicationService } from '../../services/publication.service';
import { OutilService } from '../../services/outil.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  NbMembers = 0;
  NbEvents = 0;
  NbPublications = 0;
  NbTools = 0;
  NbStudents = 0;
  NbTeachers = 0;
  NbArticles = 0;

  chartOptions: ChartOptions = { responsive: true };
  pieChartOptions: ChartOptions<'pie'> = { responsive: true };

  chartData: ChartData<'line'> = { labels: [], datasets: [{ data: [], label: 'Totals' }] };
  pieChartData: ChartData<'pie', number[], string> = {
    labels: ['Students', 'Teachers'],
    datasets: [{ data: [0, 0] }]
  };

  constructor(
    private Ms: MemberService,
    private Es: EvtService,
    private Ps: PublicationService,
    private Os: OutilService
  ) {}

  ngOnInit(): void {
    forkJoin({
      members: this.Ms.GETALLMembers(),
      events: this.Es.GETALLEvts(),
      tools: this.Os.GETALLOutils(),
      publications: this.Ps.GETALLPublications()
    }).subscribe({
      next: ({ members, events, tools, publications }) => {
        this.NbMembers = (members ?? []).length;
        this.NbEvents = (events ?? []).length;
        this.NbTools = (tools ?? []).length;
        this.NbPublications = (publications ?? []).length;

        const list = members ?? [];
        this.NbStudents = list.filter((m: any) => m?.dateInscription != null || m?.diplome != null).length;
        this.NbTeachers = list.filter((m: any) => m?.grade != null || m?.etablissement != null).length;

        this.NbArticles = (publications ?? []).filter((p: any) => {
          const t = String(p?.type ?? '').toLowerCase();
          return t === 'article' || t.includes('article');
        }).length;

        this.pieChartData = {
          labels: ['Students', 'Teachers'],
          datasets: [{ data: [this.NbStudents, this.NbTeachers] }]
        };

        this.chartData = {
          labels: ['Members', 'Events', 'Tools', 'Articles'],
          datasets: [{ data: [this.NbMembers, this.NbEvents, this.NbTools, this.NbArticles], label: 'Totals' }]
        };
      },
      error: (err) => console.error('Dashboard load failed', err)
    });
  }
}
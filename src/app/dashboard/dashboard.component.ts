import { Component, OnInit } from '@angular/core';
import { MemberService } from 'src/services/memeber.service';
import { EvtService } from 'src/services/evt.service';
import { PublicationService } from 'src/services/publication.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  NbMembers: number = 0;
  NbEvents: number = 0;
  NbPublications: number = 0;
  NbTools: number = 0;
  NbStudents: number = 0;
  NbTeachers: number = 0;
  NbArticles: number = 0;

  // Chart Properties (Initialized to avoid errors)
  chartData: any[] = [];
  chartLabels: string[] = [];
  chartOptions: any = { responsive: true };
  
  pieChartData: any[] = [];
  pieChartLabels: string[] = [];
  pieChartOptions: any = { responsive: true };

  constructor(
    private Ms: MemberService,
    private Es: EvtService,
    private Ps: PublicationService
  ) {}

  ngOnInit(): void {
    // 1. Load Members (Safe Subscription)
    this.Ms.GETALLMembers().subscribe({
      next: (data) => {
        this.NbMembers = data.length;
        this.NbStudents = data.filter((m: any) => m.role === 'STUDENT').length;
        this.NbTeachers = data.filter((m: any) => m.role === 'TEACHER').length;
        
        // Prepare Pie Chart
        this.pieChartLabels = ['Students', 'Teachers'];
        this.pieChartData = [
          { data: [this.NbStudents, this.NbTeachers], label: 'Distribution' }
        ];
      },
      error: (err) => {
        console.error('Error loading members', err);
        // Set defaults so UI doesn't look broken
        this.NbMembers = 0;
      }
    });

    // 2. Load Events (Safe Subscription)
    this.Es.GETALLEvts().subscribe({
      next: (data) => {
        this.NbEvents = data.length;
        // Simple line chart mock data based on count
        this.chartLabels = ['Total Events'];
        this.chartData = [
          { data: [this.NbEvents], label: 'Events' }
        ];
      },
      error: (err) => {
        console.error('Error loading events', err);
        this.NbEvents = 0;
      }
    });

    // 3. Load Publications (Safe Subscription)
    this.Ps.GETALLPublications().subscribe({
      next: (data) => {
        this.NbPublications = data.length;
        this.NbArticles = data.filter((p: any) => p.type === 'Article').length;
      },
      error: (err) => {
        console.error('Error loading publications', err);
        this.NbPublications = 0;
      }
    });
  }
}
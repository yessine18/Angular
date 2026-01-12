import { Component } from '@angular/core';
import { ChartDataset, ChartOptions } from 'chart.js';
import { Member } from 'src/models/Member';
import { MemeberService } from 'src/services/memeber.service';
import { EvtService } from 'src/services/evt.service';
import { PublicationService } from 'src/services/publication.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  NbMembers: number = 0;
  NbEvents: number = 0;
  NbTools: number = 0;
  NbArticles: number = 0;
  NbStudents: number = 0;
  NbTeachers: number = 0;

  chartData: ChartDataset[] = [
    {
      label: 'Statistics',
      data: [0, 0, 0, 0]
    }
  ];
  chartLabels: string[] = ['Members', 'Events', 'Tools', 'Articles'];
  chartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: true
  };

  pieChartData: ChartDataset[] = [
    {
      data: [0, 0]
    }
  ];
  pieChartLabels: string[] = ['Students', 'Teachers'];
  pieChartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        position: 'bottom'
      }
    }
  };

  constructor(
    private Ms: MemeberService,
    private ES: EvtService,
    private PS: PublicationService
  ){
    this.Ms.GETALLMembers().subscribe((res: Member[]) => {
      this.NbMembers = res.length;
      this.NbStudents = res.filter(m => m.type === 'student').length;
      this.NbTeachers = res.filter(m => m.type === 'teacher').length;
      this.updateCharts();
    });
    this.ES.GETALLEvts().subscribe((res) => {
      this.NbEvents = res.length;
      this.updateCharts();
    });
    this.PS.GETALLPublications().subscribe((res: any[]) => {
      this.NbArticles = res.filter(p => p.type === 'article').length;
      this.updateCharts();
    });
  }

  updateCharts() {
    this.chartData = [
      {
        label: 'Statistics',
        data: [this.NbMembers, this.NbEvents, this.NbTools, this.NbArticles]
      }
    ];

    this.pieChartData = [
      {
        data: [this.NbStudents, this.NbTeachers]
      }
    ];
  }
}

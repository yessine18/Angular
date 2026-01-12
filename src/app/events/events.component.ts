import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { Evt } from '../../models/Evt';
import { EvtService } from '../../services/evt.service';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { EventsFormComponent } from '../events-form/events-form.component';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent {
  dataSource: Evt[] = [];
  displayedColumns: string[] = ['id', 'titre', 'lieu', 'dateApparition', 'actions'];

  constructor(private es: EvtService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.reload();
  }

  reload(): void {
    this.es.GETALLEvts().subscribe({
      next: (data) => (this.dataSource = data ?? []),
      error: (err) => console.error('Load events failed:', err)
    });
  }

  addEvent(): void {
    const ref = this.dialog.open(EventsFormComponent, { width: '650px', data: null });
    ref.afterClosed().subscribe((changed) => changed && this.reload());
  }

  editEvent(e: Evt): void {
    const ref = this.dialog.open(EventsFormComponent, { width: '650px', data: e });
    ref.afterClosed().subscribe((changed) => changed && this.reload());
  }

  deleteEvent(e: Evt): void {
    if (e.id == null) return;

    // keep same confirm dialog usage style as your app
    const ref = this.dialog.open(ConfirmDialogComponent, { height: '200px', width: '300px' });

    ref.afterClosed().subscribe((ok: boolean) => {
      if (!ok) return;

      this.es.DELETEEvt(e.id!).subscribe({
        next: () => this.reload(),
        error: (err) => console.error('Delete failed:', err)
      });
    });
  }
}
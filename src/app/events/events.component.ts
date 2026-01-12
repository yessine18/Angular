import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';

import { EvtService } from 'src/services/evt.service';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { ModalEventComponent } from '../modal-event/modal-event.component';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit, AfterViewInit {
  // IMPORTANT: these ids MUST match matColumnDef values in the HTML
  displayedColumns: string[] = ['id', 'title', 'date', 'actions'];

  // Must be initialized to avoid undefined paginator errors
  dataSource = new MatTableDataSource<any>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private es: EvtService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.getAllEvents();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  getAllEvents(): void {
    this.es.GETALLEvts().subscribe({
      next: (data: any[]) => {
        this.dataSource.data = Array.isArray(data) ? data : [];
        this.dataSource.paginator = this.paginator;
      },
      error: (err) => {
        console.error('Error fetching events:', err);
        this.dataSource.data = [];
      }
    });
  }

  applyFilter(event: Event): void {
    const value = (event.target as HTMLInputElement).value ?? '';
    this.dataSource.filter = value.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  addEvent(): void {
    const ref = this.dialog.open(ModalEventComponent, {
      width: '600px',
      data: null
    });

    ref.afterClosed().subscribe((changed) => {
      if (changed) this.getAllEvents();
    });
  }

  editEvent(element: any): void {
    const ref = this.dialog.open(ModalEventComponent, {
      width: '600px',
      data: element
    });

    ref.afterClosed().subscribe((changed) => {
      if (changed) this.getAllEvents();
    });
  }

  deleteEvent(id: any): void {
    const ref = this.dialog.open(ConfirmDialogComponent, {
      width: '420px',
      data: {
        title: 'Delete event',
        message: 'Are you sure you want to delete this event?'
      }
    });

    ref.afterClosed().subscribe((ok: boolean) => {
      if (!ok) return;

      this.es.DELETEEvt(id).subscribe({
        next: () => this.getAllEvents(),
        error: (err) => console.error('Delete failed:', err)
      });
    });
  }

  // Helpers so the UI works even if backend field names differ
  getTitle(e: any): string {
    return e?.title ?? e?.titre ?? e?.name ?? '';
  }

  getDate(e: any): any {
    return e?.date ?? e?.dateEvt ?? e?.dateDebut ?? e?.startDate ?? null;
  }
}
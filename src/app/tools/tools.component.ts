import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { Outil } from '../../models/Outil';
import { OutilService } from '../../services/outil.service';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { OutilFormComponent } from '../outil-form/outil-form.component';

@Component({
  selector: 'app-tools',
  templateUrl: './tools.component.html',
  styleUrls: ['./tools.component.css']
})
export class ToolsComponent {
  dataSource: Outil[] = [];
  displayedColumns: string[] = ['id', 'source', 'dateApparition', 'actions'];

  constructor(private os: OutilService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.reload();
  }

  reload(): void {
    this.os.GETALLOutils().subscribe({
      next: (data) => (this.dataSource = data ?? []),
      error: (err) => console.error('Load tools failed:', err)
    });
  }

  addTool(): void {
    const ref = this.dialog.open(OutilFormComponent, { width: '650px', data: null });
    ref.afterClosed().subscribe((changed) => changed && this.reload());
  }

  editTool(o: Outil): void {
    const ref = this.dialog.open(OutilFormComponent, { width: '650px', data: o });
    ref.afterClosed().subscribe((changed) => changed && this.reload());
  }

  deleteTool(o: Outil): void {
    if (o.id == null) return;

    const ref = this.dialog.open(ConfirmDialogComponent, { height: '200px', width: '300px' });
    ref.afterClosed().subscribe((ok: boolean) => {
      if (!ok) return;

      this.os.DELETEOutil(o.id!).subscribe({
        next: () => this.reload(),
        error: (err) => console.error('Delete tool failed:', err)
      });
    });
  }
}
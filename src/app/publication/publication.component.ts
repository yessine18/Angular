import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { Publication } from '../../models/Publication';
import { PublicationService } from '../../services/publication.service';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { PublicationFormComponent } from '../publication-form/publication-form.component';

@Component({
  selector: 'app-publication',
  templateUrl: './publication.component.html',
  styleUrls: ['./publication.component.css']
})
export class PublicationComponent {
  constructor(private PS: PublicationService, private dialog: MatDialog) {}

  dataSource: Publication[] = [];

  displayedColumns: string[] = ['id', 'type', 'titre', 'lien', 'dateApparition', 'sourcePdf', 'actions'];

  ngOnInit(): void {
    this.reload();
  }

  reload(): void {
    this.PS.GETALLPublications().subscribe({
      next: (x) => (this.dataSource = x ?? []),
      error: (e) => console.error('Load publications failed:', e)
    });
  }

  addPublication(): void {
    const ref = this.dialog.open(PublicationFormComponent, {
      width: '650px',
      data: null
    });

    ref.afterClosed().subscribe((changed) => {
      if (changed) this.reload();
    });
  }

  editPublication(publication: Publication): void {
    const ref = this.dialog.open(PublicationFormComponent, {
      width: '650px',
      data: publication
    });

    ref.afterClosed().subscribe((changed) => {
      if (changed) this.reload();
    });
  }

  deletePublication(id: number): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      height: '200px',
      width: '300px'
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (!result) return;

      this.PS.DELETEPublication(id).subscribe({
        next: () => this.reload(),
        error: (e) => console.error('Delete publication failed:', e)
      });
    });
  }
}
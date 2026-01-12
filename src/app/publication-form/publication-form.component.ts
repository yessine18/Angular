import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { finalize } from 'rxjs/operators';

import { Publication } from '../../models/Publication';
import { PublicationService } from '../../services/publication.service';

@Component({
  selector: 'app-publication-form',
  templateUrl: './publication-form.component.html',
  styleUrls: ['./publication-form.component.css']
})
export class PublicationFormComponent implements OnInit {
  form!: FormGroup;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private ps: PublicationService,
    private dialogRef: MatDialogRef<PublicationFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Publication | null
  ) {}

  get isEdit(): boolean {
    return !!this.data?.id;
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      type: [this.data?.type ?? '', Validators.required],
      titre: [this.data?.titre ?? '', Validators.required],
      lien: [this.data?.lien ?? ''],
      sourcePdf: [this.data?.sourcePdf ?? ''],
      dateApparition: [this.toDate(this.data?.dateApparition ?? null)]
    });
  }

  close(): void {
    this.dialogRef.close(false);
  }

  save(): void {
    if (this.loading || this.form.invalid) return;

    this.loading = true;
    const payload = this.buildPayload();

    const req$ = this.isEdit && this.data?.id != null
      ? this.ps.UPDATEPublication(this.data.id, payload)
      : this.ps.ADDPublication(payload);

    req$
      .pipe(finalize(() => (this.loading = false)))
      .subscribe({
        next: () => this.dialogRef.close(true),
        error: (err) => console.error('Save publication failed:', err)
      });
  }

  private buildPayload(): Partial<Publication> {
    const v = this.form.value;

    const payload: Partial<Publication> = {
      type: (v.type ?? '').trim(),
      titre: (v.titre ?? '').trim(),
      lien: (v.lien ?? '').trim() || undefined,
      sourcePdf: (v.sourcePdf ?? '').trim() || undefined
    };

    if (v.dateApparition) {
      const d = new Date(v.dateApparition);
      if (!isNaN(d.getTime())) payload.dateApparition = d.toISOString().slice(0, 10); // yyyy-MM-dd
    }

    return payload;
  }

  private toDate(value: any): Date | null {
    if (!value) return null;
    const d = new Date(value);
    return isNaN(d.getTime()) ? null : d;
  }
}
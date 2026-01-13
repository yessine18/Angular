import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { finalize } from 'rxjs/operators';

import { Outil } from '../../models/Outil';
import { OutilService } from '../../services/outil.service';

@Component({
  selector: 'app-outil-form',
  templateUrl: './outil-form.component.html',
  styleUrls: ['./outil-form.component.css']
})
export class OutilFormComponent implements OnInit {
  form!: FormGroup;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private os: OutilService,
    private dialogRef: MatDialogRef<OutilFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Outil | null
  ) {}

  get isEdit(): boolean {
    return this.data?.id != null;
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      source: [this.data?.source ?? '', Validators.required],
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

    const req$ = this.isEdit
      ? this.os.UPDATEOutil(this.data!.id!, payload) // PATCH backend
      : this.os.ADDOutil(payload);

    req$
      .pipe(finalize(() => (this.loading = false)))
      .subscribe({
        next: () => this.dialogRef.close(true),
        error: (err) => console.error('Save outil failed:', err)
      });
  }

  private buildPayload(): Partial<Outil> {
    const v = this.form.value;

    const payload: Partial<Outil> = {
      source: (v.source ?? '').trim()
    };

    if (v.dateApparition) {
      const d = new Date(v.dateApparition);
      if (!isNaN(d.getTime())) payload.dateApparition = d.toISOString().slice(0, 10);
    }

    return payload;
  }

  private toDate(value: any): Date | null {
    if (!value) return null;
    const d = new Date(value);
    return isNaN(d.getTime()) ? null : d;
  }
}
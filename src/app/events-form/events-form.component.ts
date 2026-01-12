import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { finalize } from 'rxjs/operators';

import { Evt } from '../../models/Evt';
import { EvtService } from '../../services/evt.service';

@Component({
  selector: 'app-events-form',
  templateUrl: './events-form.component.html',
  styleUrls: ['./events-form.component.css']
})
export class EventsFormComponent implements OnInit {
  form!: FormGroup;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private es: EvtService,
    private dialogRef: MatDialogRef<EventsFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Evt | null
  ) {}

  get isEdit(): boolean {
    return this.data?.id != null;
  }

  ngOnInit(): void {
  this.form = this.fb.group({
    titre: [this.data?.titre ?? '', Validators.required],
    lieu: [this.data?.lieu ?? '', Validators.required],
    dateApparition: [this.toDate((this.data as any)?.dateApparition ?? null)]
  });
}
  

  close(): void {
    this.dialogRef.close(false);
  }

  save(): void {
    if (this.loading || this.form.invalid) return;

    const deb = new Date(this.form.value.dateDeb);
    const fin = new Date(this.form.value.dateFin);
    if (!isNaN(deb.getTime()) && !isNaN(fin.getTime()) && fin < deb) {
      console.error('Invalid dates: dateFin must be >= dateDeb');
      return;
    }

    this.loading = true;
    const payload = this.buildPayload();

    const req$ = this.isEdit
      ? this.es.UPDATEEvt(this.data!.id!, payload)
      : this.es.ADDEvt(payload);

    req$
      .pipe(finalize(() => (this.loading = false)))
      .subscribe({
        next: () => this.dialogRef.close(true),
        error: (err) => console.error('Save event failed:', err)
      });
  }

  private buildPayload(): any {
  const v = this.form.value;

  const payload: any = {
    titre: (v.titre ?? '').trim(),
    lieu: (v.lieu ?? '').trim()
  };

  if (v.dateApparition) {
    const d = new Date(v.dateApparition);
    if (!isNaN(d.getTime())) payload.dateApparition = d.toISOString().slice(0, 10);
  }

  return payload;
}

  private toYyyyMmDd(value: any): string {
    const d = new Date(value);
    if (isNaN(d.getTime())) return '';
    return d.toISOString().slice(0, 10);
  }

  private toDate(value: any): Date | null {
    if (!value) return null;
    const d = new Date(value);
    return isNaN(d.getTime()) ? null : d;
  }
}
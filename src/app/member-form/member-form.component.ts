import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { finalize } from 'rxjs/operators';

import { MemberService } from 'src/services/memeber.service';

@Component({
  selector: 'app-member-form',
  templateUrl: './member-form.component.html',
  styleUrls: ['./member-form.component.css']
})
export class MemberFormComponent implements OnInit {
  form!: FormGroup;
  isEdit = false;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private ms: MemberService,
    private dialogRef: MatDialogRef<MemberFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any // member or null
  ) {}

  ngOnInit(): void {
    this.isEdit = !!(this.data?.id ?? this.data?._id);

    this.form = this.fb.group({
      cin: [this.data?.cin ?? '', [Validators.required]],
      // keep both fields for compatibility with your backend
      prenom: [this.data?.prenom ?? this.data?.firstName ?? '', []],
      nom: [this.data?.nom ?? this.data?.lastName ?? '', []],
      // if backend sends just "name", split it to prenom/nom (best effort)
      name: [this.data?.name ?? this.data?.fullName ?? '', []],

      type: [this.data?.type ?? this.data?.role ?? '', [Validators.required]],
      cv: [this.data?.cv ?? this.data?.cvUrl ?? this.data?.urlCv ?? '', []],

      date: [this.coerceDate(this.data), []] // Date object or null
    });

    // If editing and only "name" exists, try to split it once
    if (this.isEdit) {
      const prenom = this.form.get('prenom')?.value;
      const nom = this.form.get('nom')?.value;
      const name = (this.form.get('name')?.value ?? '').trim();

      if ((!prenom && !nom) && name.includes(' ')) {
        const parts = name.split(' ').filter(Boolean);
        this.form.patchValue({
          prenom: parts.slice(0, -1).join(' '),
          nom: parts.slice(-1).join(' ')
        });
      }
    }
  }

  close(): void {
    this.dialogRef.close(false);
  }

  save(): void {
  if (this.loading || this.form.invalid) return;

  this.loading = true;

  const id = this.data?.id ?? this.data?._id ?? null;
  const payload = this.buildPayload();

  const type = String(this.form.value.type ?? '').toLowerCase();
  const isEnseignant = type.startsWith('ens') || type.includes('enseign');

  const req$ = this.isEdit
    ? (isEnseignant ? this.ms.UPDATEEnseignant(id, payload) : this.ms.UPDATEEtudiant(id, payload))
    : (isEnseignant ? this.ms.ADDEnseignant(payload) : this.ms.ADDEtudiant(payload));

  req$.pipe(finalize(() => (this.loading = false))).subscribe({
    next: () => this.dialogRef.close(true),
    error: (err) => console.error('Save member failed:', err)
  });
}

  private buildPayload(): any {
    const v = this.form.value;

    // Prefer prenom/nom if present, else fallback to "name"
    const prenom = (v.prenom ?? '').trim();
    const nom = (v.nom ?? '').trim();
    const name = (v.name ?? '').trim();

    const payload: any = {
      cin: v.cin,
      type: v.type,
      cv: v.cv || null
    };

    // send both styles for compatibility (backend will ignore unknown fields)
    if (prenom) payload.prenom = prenom;
    if (nom) payload.nom = nom;
    if (!prenom && !nom && name) payload.name = name;

    // date formatting: send yyyy-MM-dd if possible
    if (v.date) {
      const d = new Date(v.date);
      if (!isNaN(d.getTime())) {
        payload.date = d.toISOString().slice(0, 10);
      }
    }

    return payload;
  }

  private coerceDate(member: any): Date | null {
    const raw =
      member?.date ??
      member?.dateInscription ??
      member?.dateNaissance ??
      member?.createdAt ??
      member?.createdDate ??
      null;

    if (!raw) return null;

    const d = new Date(raw);
    return isNaN(d.getTime()) ? null : d;
  }
}
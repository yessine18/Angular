import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-event',
  templateUrl: './modal-event.component.html',
  styleUrls: ['./modal-event.component.css']
})
export class ModalEventComponent implements OnInit {
  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<ModalEventComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    console.log('Modal opened with data:', data); // Debug
  }

  ngOnInit() {
    this.form = this.fb.group({
      titre: [null, Validators.required],
      dateDeb: [null, Validators.required],
      dateFin: [null, Validators.required],
      lieu: [null, Validators.required],
    });

    if (this.data) {
      console.log('Patching form with:', this.data); // Debug
      this.form.patchValue(this.data);
    }
  }

  save() {
    if (this.form.valid) {
      const result = this.data ? { ...this.data, ...this.form.value } : this.form.value;
      this.dialogRef.close(result);
    }
  }

  close() {
    this.dialogRef.close();
  }
}
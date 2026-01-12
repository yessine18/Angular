import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';

import { MemberService } from 'src/services/memeber.service';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { MemberFormComponent } from '../member-form/member-form.component';

@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.css']
})
export class MemberComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['id', 'cin', 'name', 'type', 'cv', 'date', 'actions'];
  dataSource = new MatTableDataSource<any>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private ms: MemberService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadMembers();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  loadMembers(): void {
    this.ms.GETALLMembers().subscribe({
      next: (data: any[]) => {
        this.dataSource.data = Array.isArray(data) ? data : [];
        this.dataSource.paginator = this.paginator;

        // Debug: check the real field names coming from backend
        if (this.dataSource.data.length) {
          console.log('First member object:', this.dataSource.data[0]);
        }
      },
      error: (err) => {
        console.error('Error loading members:', err);
        this.dataSource.data = [];
      }
    });
  }

  applyFilter(event: Event): void {
    const value = (event.target as HTMLInputElement).value ?? '';
    this.dataSource.filter = value.trim().toLowerCase();
    this.dataSource.paginator?.firstPage();
  }

  addMember(): void {
    const ref = this.dialog.open(MemberFormComponent, { width: '650px', data: null });
    ref.afterClosed().subscribe((changed) => {
      if (changed) this.loadMembers();
    });
  }

  editMember(member: any): void {
    const ref = this.dialog.open(MemberFormComponent, { width: '650px', data: member });
    ref.afterClosed().subscribe((changed) => {
      if (changed) this.loadMembers();
    });
  }

  deleteMember(id: any): void {
    const ref = this.dialog.open(ConfirmDialogComponent, {
      width: '420px',
      data: { title: 'Delete member', message: 'Are you sure you want to delete this member?' }
    });

    ref.afterClosed().subscribe((ok: boolean) => {
      if (!ok) return;

      this.ms.DELETEMember(id).subscribe({
        next: () => this.loadMembers(),
        error: (err) => console.error('Delete failed:', err)
      });
    });
  }

  // ---- Display helpers (fix “blank columns”) ----

  getName(m: any): string {
    // try common variants: name, nom, fullName, prenom+nom
    const direct =
      m?.name ?? m?.nom ?? m?.fullName ?? m?.fullname ?? m?.displayName ?? null;

    if (direct) return String(direct);

    const first = m?.prenom ?? m?.firstName ?? m?.firstname ?? '';
    const last = m?.nom ?? m?.lastName ?? m?.lastname ?? '';

    const combined = `${first} ${last}`.trim();
    return combined || '-';
  }

  getCv(m: any): string {
    // could be: cv, cvUrl, urlCv, resume, etc.
    const v = m?.cv ?? m?.cvUrl ?? m?.urlCv ?? m?.resume ?? m?.lienCv ?? null;
    return v ? String(v) : '-';
  }

  getDate(m: any): Date | null {
    // could be: date, createdAt, dateInscription, dateNaissance, etc.
    const raw =
      m?.date ?? m?.createdAt ?? m?.createdDate ?? m?.dateInscription ?? m?.dateNaissance ?? null;

    if (!raw) return null;

    // Accept ISO strings / timestamps
    const d = new Date(raw);
    return isNaN(d.getTime()) ? null : d;
  }

  getType(m: any): string {
    // your screenshot shows "ens" already, keep fallbacks
    return String(m?.type ?? m?.role ?? m?.grade ?? '-');
  }
}
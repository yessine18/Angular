import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Evt } from 'src/models/Evt';
import { EvtService } from 'src/services/evt.service';
import { ModalEventComponent } from '../modal-event/modal-event.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})

//lance ngAfterViewInit une fois que les vues de composant ont été initialisées
export class EventsComponent implements AfterViewInit {
  displayedColumns: string[] = ['id', 'titre', 'dateDeb', 'dateFin', 'lieu', 'actions'];
  //MAT-TABLE DATA SOURCE on les fonctions de tri, de pagination et de filtrage
  dataSource!: MatTableDataSource<Evt>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private ES: EvtService,private dialog:MatDialog) {
    this.ES.GETALLEvts().subscribe((data)=>{
      this.dataSource=new MatTableDataSource(data);
    })
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  addEvent() {
    let dialogREF=this.dialog.open(ModalEventComponent);
    dialogREF.afterClosed().subscribe((x)=>{
      //appeler le sefvie addEvt()=> requete post pour ajouter un evenement
      this.ES.ADDEvt(x).subscribe(()=>{
        //apres l'ajout, on rafraichit la table des evenements
        this.ES.GETALLEvts().subscribe((data)=>{
          this.dataSource.data=data;
        })
      })
    })
  }
  editEvent(element: Evt) {
    // Ouvrir la modale avec une largeur et les données
    const dialogRef = this.dialog.open(ModalEventComponent, {
      width: '500px',
      data: element
    });

    dialogRef.afterClosed().subscribe((modifiedEvt) => {
      if (modifiedEvt) {
        this.ES.UPDATEEvt(element.id, modifiedEvt).subscribe(() => {
          this.ES.GETALLEvts().subscribe((data) => {
            this.dataSource.data = data;
          });
        });
      }
    });
  }
  deleteEvent(id: string) {
    // Pass the ID to the service
    this.ES.DELETEEvt(id).subscribe(()=>{
      // Refresh the table
      this.ES.GETALLEvts().subscribe((data)=>{
        this.dataSource.data=data;
      })
    })
  }
  
}

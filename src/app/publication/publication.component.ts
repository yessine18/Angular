import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PublicationService } from 'src/services/publication.service';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';


@Component({
  selector: 'app-publication',
  templateUrl: './publication.component.html',
  styleUrls: ['./publication.component.css']
})
export class PublicationComponent {
constructor(private PS:PublicationService,private dialog:MatDialog){}
  dataSource: any[] = [];
  
//injecter MemberService GETAllMembers
//a la reception =>remplir le tab dataSource

//lance automatiquement quand on charge le composant
ngOnInit(): void {
  //x:tableu de membre (var locale)
  this.PS.GETALLPublications().subscribe((x)=>{this.dataSource=x})
}

  displayedColumns: string[] = ['id', 'type', 'titre', 'lien', 'date', 'sourcepdf'];

   editPublication(publication: any) {
    console.log('Edit publication:', publication);
    // You can open a dialog or navigate to an edit form here
  }

  deletePublication(id: string) {
    //1. lancer la boite
    let dialogRef = this.dialog.open(ConfirmDialogComponent, {
  height: '200px',
  width: '300px',
});
    //2. attendre le restultat de user
    dialogRef.afterClosed().subscribe(result => {
      if (result)
         this.PS.DELETEPublication(id).subscribe(()=>{
      this.PS.GETALLPublications().subscribe((x)=>{this.dataSource=x})
    })

});
    //3. si click=confirm
   
  }
}

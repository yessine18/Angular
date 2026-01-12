import { Component, OnInit } from '@angular/core';
import { MemeberService } from 'src/services/memeber.service';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.css']
})
export class MemberComponent implements OnInit{
  
  title = "Projet LAB";

  //injection de dep: cree un instance prive du service dans le composant/autre service dans le constructeur a condition le service a decorateur @Injectable
constructor(private MS:MemeberService,private dialog:MatDialog){}
  dataSource: any[] = [];
  
//injecter MemberService GETAllMembers
//a la reception =>remplir le tab dataSource

//lance automatiquement quand on charge le composant
ngOnInit(): void {
  //x:tableu de membre (var locale)
  this.MS.GETALLMembers().subscribe((x)=>{this.dataSource=x})
}

  displayedColumns: string[] = ['id', 'cin', 'name', 'type', 'cv', 'createdDate','actions'];

   editMember(member: any) {
    console.log('Edit member:', member);
    // You can open a dialog or navigate to an edit form here
  }

  deleteMember(id: string) {
    //1. lancer la boite
    let dialogRef = this.dialog.open(ConfirmDialogComponent, {
  height: '200px',
  width: '300px',
});
    //2. attendre le restultat de user
    dialogRef.afterClosed().subscribe(result => {
      if (result)
         this.MS.DELETEMember(id).subscribe(()=>{
      this.MS.GETALLMembers().subscribe((x)=>{this.dataSource=x})
    })

});
    //3. si click=confirm
   
  }
}
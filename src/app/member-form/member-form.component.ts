import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Member } from 'src/models/Member';
import { MemeberService } from 'src/services/memeber.service';

@Component({
  selector: 'app-member-form',
  templateUrl: './member-form.component.html',
  styleUrls: ['./member-form.component.css']
})
export class MemberFormComponent implements OnInit {
  //angular en mode signleton et intialise les instances dans un conteneur d'instance (injector) une seule instance par service=> temps de chargement plus rapide
  //injection de dep
  constructor(private MS:MemeberService,private router:Router,private activatedRoute:ActivatedRoute){}
  //! inistialise selon la variable
  form!:FormGroup
  ngOnInit(): void {
    //1 recuperer la route active(idCourant is indefined is nexiste pas)
    const idCourant=this.activatedRoute.snapshot.params['id']
    //2 si la route contien id 
    if(idCourant){
      this.MS.getMemberById(idCourant).subscribe((m:Member)=>{
        this.form= new FormGroup({
      cin: new FormControl(m.cin),
      name: new FormControl(m.name),
      type: new FormControl(m.type),
      cv: new FormControl(m.cv),
      createdDate: new FormControl(m.createdDate),

    })
      })
    }
    //get member by id =>extraction dans le formulaire
    //3 sinon je suis dans create
    //intialiser le formulaire
    else{
      this.form= new FormGroup({
        cin: new FormControl(null),
        name: new FormControl(null),
        type: new FormControl(null),
        cv: new FormControl(null),
        createdDate: new FormControl(null),

    })
    }
    
  }
  sub(){
    const idCourant=this.activatedRoute.snapshot.params['id']
    if (idCourant){
      this.MS.UPDATEMember(this.form.value,idCourant).subscribe(()=>{
        this.router.navigate(['/member'])
      })
    }
    else{
       this.MS.ADDMember(this.form.value).subscribe(()=>{
      this.router.navigate(['/member'])
    })
    }
   
  }

}

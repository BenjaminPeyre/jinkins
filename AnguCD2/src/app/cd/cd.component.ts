import { Component, Input, OnInit } from '@angular/core';
import { CD } from '../models/cd';
import { CdsService } from '../services/cds.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cd',
  templateUrl: './cd.component.html',
  styleUrls: ['./cd.component.scss']
})
export class CdComponent implements OnInit {
   @Input() leCd!: CD; // reçu par le template listcd
   unCd!: CD; // utilisé par le template cd
   idcd!: string;
  constructor(private myCDservice: CdsService, private route: ActivatedRoute) { }

   ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    if (id !== undefined) {
        this.myCDservice.getCDById(+id).subscribe(cd => this.unCd = cd);
    }
    else {
      this.unCd = this.leCd;      
  }
}

   onAddCD() {
     this.leCd.quantite++;
   }
}

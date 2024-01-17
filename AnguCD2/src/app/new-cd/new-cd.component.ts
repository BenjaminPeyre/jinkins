import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { CD } from '../models/cd'
import { FormGroup, FormBuilder,Validators } from '@angular/forms';
import { map, tap } from 'rxjs/operators';
import { CdsService } from '../services/cds.service';
import { Router, ActivatedRoute, Route } from '@angular/router';
@Component({
  selector: 'app-new-cd',
  templateUrl: './new-cd.component.html',
  styleUrls: ['./new-cd.component.scss']
})
export class NewCDComponent {
  formulaire!: FormGroup;
  currentCD$!: Observable<CD>;
  constructor(private formBuilder: FormBuilder, private cdservices: CdsService, private router: Router) { }
  ngOnInit(): void {

    let thumbRegex = new RegExp('https?:\/\/.*\.(?:png|jpg|jpeg|gif|svg|webp)$'); 

    this.formulaire = this.formBuilder.group({
      title: [null, Validators.required, Validators.minLength(3)],
      author: [null, Validators.required, Validators.minLength(3)],
      price: [null, Validators.required, Validators.minLength(1)],
      thumbnail: [null, Validators.required, Validators.pattern(thumbRegex)],
      dateDeSortie: [null, Validators.required, Validators.minLength(3)],
      quantite: [null, Validators.required, Validators.minLength(3)]

    });

    this.currentCD$ = this.formulaire.valueChanges.pipe(map(formValue => ({

      id: 0,
      title: formValue.title,
      author: formValue.author,
      price: formValue.price,
      thumbnail: formValue.thumbnail,
      dateDeSortie: formValue.dateDeSortie,
      quantite: formValue.quantite

    }))
    );
  }
  EnvoieFormulaireCD() {
    let newCd : CD = {
      id: 0,
      title: this.formulaire.get("title")?.value,
      author: this.formulaire.get("author")?.value,
      price: this.formulaire.get("price")?.value,
      thumbnail: this.formulaire.get("thumbnail")?.value,
      dateDeSortie: this.formulaire.get("dateDeSortie")?.value,
      quantite: this.formulaire.get("quantite")?.value
    }
    this.cdservices.addCd(newCd).pipe(
      tap(() => this.router.navigateByUrl('/catalog'))
    ).subscribe();
    // console.log(this.formulaire.value);
  }

}

import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CD } from '../models/cd';
import { CdsService } from '../services/cds.service';


@Component({
  selector: 'app-listcd',
  templateUrl: './listcd.component.html',
  styleUrls: ['./listcd.component.scss']
})
export class ListcdComponent implements OnInit {
  listcd$!: Observable<CD[]>;

  constructor(private myCDservice: CdsService) { }

  ngOnInit(): void {
    this.listcd$ = this.myCDservice.getAllCDs(); 
  }
}
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule,Route } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ListcdComponent } from './listcd/listcd.component';
import { CdComponent } from './cd/cd.component';
import { NewCDComponent } from './new-cd/new-cd.component';

const routes: Route[] = [
  { path: '', component: HomeComponent },
  { path: 'catalog', component: ListcdComponent},
  { path: 'cd/:id', component: CdComponent},
  { path: 'addCD', component: NewCDComponent}
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

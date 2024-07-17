import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuComponent } from './components/menu/menu.component';
import { GenreContentComponent } from './components/genre-content/genre-content.component';

const routes: Routes = [
  { path: '', component: MenuComponent },
  { path: 'genre/:id', component: GenreContentComponent },
  // Outras rotas...
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

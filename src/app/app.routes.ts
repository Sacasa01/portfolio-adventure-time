import { Routes } from '@angular/router';
import { TreehouseHome } from './components/treehouse-home/treehouse-home';
import { PrismoAbout } from './components/prismo-about/prismo-about';
import { CandyProjects } from './components/candy-projects/candy-projects';
import { MarcelineSkills } from './components/marceline-skills/marceline-skills';
import { IceKingContact } from './components/ice-king-contact/ice-king-contact';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: TreehouseHome },
  { path: 'about', component: PrismoAbout },
  { path: 'projects', component: CandyProjects },
  { path: 'skills', component: MarcelineSkills },
  { path: 'contact', component: IceKingContact },
  { path: '**', redirectTo: 'home' }
];


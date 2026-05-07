import { Routes } from '@angular/router';

import { Login } from './components/login/login';
import { Register } from './components/register/register';
import { Projects } from './components/projects/projects';
import { Tasks } from './components/tasks/tasks';

export const routes: Routes = [
  { path: '', component: Login },
  { path: 'register', component: Register },
  { path: 'projects', component: Projects },
  { path: 'tasks', component: Tasks },
];

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { AuthGuard } from './core/auth.guard';
import { FormListComponent } from './form-list/form-list.component';
import { FormFillComponent } from './form-fill/form-fill.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },

  // Admin routes
  {
    path: 'form-list',
    component: FormListComponent,
    canActivate: [AuthGuard],
    data: { role: 'admin' }
  },
  {
    path: 'form-edit/:id',
    component: FormFillComponent,
    canActivate: [AuthGuard],
    data: { role: 'admin' }
  },
  {
    path: 'form-preview/:id',
    component: FormFillComponent,
    canActivate: [AuthGuard],
    data: { role: 'admin', isPreview: true }
  },

  // User routes
  {
    path: 'form/create',
    component: FormFillComponent,
    canActivate: [AuthGuard],
    data: { role: 'user' }
  },

  // Wildcard route
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

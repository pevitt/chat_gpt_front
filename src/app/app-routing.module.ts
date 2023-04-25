import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./presentation/features/home/home.module').then(
        (m) => m.HomeModule
      ),
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./presentation/features/auth/auth.module').then(
        (m) => m.AuthModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

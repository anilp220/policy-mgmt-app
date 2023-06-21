import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'signup',
    loadChildren: () => import('./pages/signup/signup.module').then(m => m.SignupPageModule)
  },
  {
    path: 'intro',
    loadChildren: () => import('./pages/intro/intro.module').then(m => m.IntroPageModule)
  },
  {
    path: 'login-signup',
    loadChildren: () => import('./pages/login-signup/login-signup.module').then(m => m.LoginSignupPageModule)
  },
  {
    path: 'generic-portfolios/:title/:page/:index',
    loadChildren: () => import('./pages/generic-portfolios/generic-portfolios.module').then(m => m.GenericPortfoliosPageModule)
  },
  {
    path: 'policy-detail/:policy',
    loadChildren: () => import('./pages/policy-detail/policy-detail.module').then(m => m.PolicyDetailPageModule)
  },
  // {
  //   path: 'home',
  //   loadChildren: () => import('./pages/home/home.module').then(m => m.HomePageModule)
  // }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

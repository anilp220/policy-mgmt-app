import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { RouteResolver } from './services/resolver';

const routes: Routes = [
  {
    path: '',
    // redirectTo: 'home',
    // pathMatch: 'full',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule),
    // resolve: {
    //   routeResolver: RouteResolver
    // }
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
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule)
    // loadChildren: () => import('./pages/intro/intro.module').then(m => m.IntroPageModule)
  },
  {
    path: 'login-signup',
    loadChildren: () => import('./pages/login-signup/login-signup.module').then(m => m.LoginSignupPageModule)
  },
  {
    path: 'home',
    // loadChildren: () => import('./pages/home/home.module').then(m => m.HomePageModule)
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule],
  providers: [RouteResolver]
})
export class AppRoutingModule { }

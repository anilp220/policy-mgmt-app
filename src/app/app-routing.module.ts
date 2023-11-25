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
    path: 'intro',
    loadChildren: () => import('./pages/intro/intro.module').then(m => m.IntroPageModule)
  },
  {
    path: 'portfolios',
    loadChildren: () => import('./pages/portfolios/portfolios.module').then(m => m.PortfoliosPageModule)
  },
  {
    path: 'privacy-policy',
    loadChildren: () => import('./pages/privacy-policy/privacy-policy.module').then( m => m.PrivacyPolicyPageModule)
  },
  {
    path: 'about-us',
    loadChildren: () => import('./pages/about-us/about-us.module').then( m => m.AboutUsPageModule)
  },
  {
    path: 'terms-n-condition',
    loadChildren: () => import('./pages/terms-n-condition/terms-n-condition.module').then( m => m.TermsNConditionPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule],
  providers: [RouteResolver]
})
export class AppRoutingModule { }

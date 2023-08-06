import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'home',
        loadChildren: () => import('../pages/home/home.module').then(m => m.HomePageModule)
      },
      {
        path: '',
        redirectTo: '/tabs/home',
        pathMatch: 'full'
      },
      {
        path: 'notification',
        loadChildren: () => import('../pages/notification/notification.module').then(m => m.NotificationPageModule)
      },
      {
        path: 'user-account',
        loadChildren: () => import('../pages/user-account/user-account.module').then(m => m.UserAccountPageModule)
      },
      {
        path: 'edit-profile',
        loadChildren: () => import('../pages/edit-profile/edit-profile.module').then(m => m.EditProfilePageModule)
      },
      {
        path: 'generic-portfolio',
        loadChildren: () => import('../pages/generic-portfolio/generic-portfolio.module').then(m => m.GenericPortfolioPageModule)
      },
      {
        path: 'detail-page',
        loadChildren: () => import('../pages/detail-page/detail-page.module').then(m => m.DetailPagePageModule)
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/home',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule { }

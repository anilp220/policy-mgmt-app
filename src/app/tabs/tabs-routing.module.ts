import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: '',
        redirectTo: '/tabs/dashboard',
        pathMatch: 'full'
      },
      {
        path: 'portfolios',
        loadChildren: () => import('../pages/portfolios/portfolios.module').then(m => m.PortfoliosPageModule)
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
      },
      {
        path: 'dashboard',
        loadChildren: () => import('../pages/dashboard/dashboard.module').then(m => m.DashboardPageModule)
      },
      {
        path: 'sum-assured',
        loadChildren: () => import('../pages/sum-assured/sum-assured.module').then(m => m.SumAssuredPageModule)
      },
      {
        path: 'sum-assured-detail',
        loadChildren: () => import('../pages/sum-assured-detail/sum-assured-detail.module').then(m => m.SumAssuredDetailPageModule)
      },
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/dashboard',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule { }

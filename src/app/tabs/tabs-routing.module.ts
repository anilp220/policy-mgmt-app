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
        path: 'sum-assured',
        loadChildren: () => import('../pages/sum-assured/sum-assured.module').then(m => m.SumAssuredPageModule)
      },
      {
        path: 'transactions',
        loadChildren: () => import('../pages/transactions/transactions.module').then(m => m.TransactionsPageModule)
      },
      {
        path: 'upcoming/:type',
        loadChildren: () => import('../pages/upcoming-payments/upcoming-payments.module').then(m => m.UpcomingPaymentsPageModule)
      },
      {
        path: 'portfolio-investments/:page',
        loadChildren: () => import('../pages/portfolio-investments/portfolio-investments.module')
          .then(m => m.PortfolioInvestmentsPageModule)
      },
      {
        path: 'type-of-policy/:typeOfPolicy',
        loadChildren: () => import('../pages/type-of-policy/type-of-policy.module')
          .then(m => m.TypeOfPolicyPageModule)
      },
      {
        path: 'view-policy',
        loadChildren: () => import('../pages/view-policy/view-policy.module').then(m => m.ViewPolicyPageModule)
      },
      {
        path: 'policy-detail/:policy',
        loadChildren: () => import('../pages/policy-detail/policy-detail.module').then(m => m.PolicyDetailPageModule)
      },
      {
        path: 'notification',
        loadChildren: () => import('../pages/notification/notification.module').then(m => m.NotificationPageModule)
      },
      {
        path: 'user-account',
        loadChildren: () => import('../pages/user-account/user-account.module').then(m => m.UserAccountPageModule)
      },
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

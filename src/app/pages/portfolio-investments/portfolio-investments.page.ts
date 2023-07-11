// import { Component, OnInit } from '@angular/core';
// import { ActivatedRoute } from '@angular/router';
// import { AppService } from 'src/app/services/app.service';
// import { UserService } from 'src/app/services/user.service';

// @Component({
//   selector: 'app-portfolio-investments',
//   templateUrl: './portfolio-investments.page.html',
//   styleUrls: ['./portfolio-investments.page.scss'],
// })
// export class PortfolioInvestmentsPage implements OnInit {
//   page;
//   portfolios = {
//     'life-insurance': [
//       {
//         name: 'Term',
//       },
//       {
//         name: 'Return of Premium - Term',
//       },
//       {
//         name: 'Unit Linked',
//       },
//       {
//         name: 'Traditional Participating',
//       },
//       {
//         name: 'Non Participating',
//       }
//     ],
//     mediclaim: [
//       { name: 'Mediclaim Base Plan' },
//       { name: 'Top-Up Plan' },
//       { name: 'Accidental Plan' },
//       { name: 'Critical Illness Plan' },
//       { name: 'Cancer Plan' },
//     ],
//     'vehicle-insurance': [
//       { name: 'Private' },
//       { name: 'Commercial' }
//     ],
//     'corporate-insurance': [
//       { name: 'Workman Compensation' },
//       { name: 'Group Mediclaim' },
//       { name: 'Contractor All Risk Policy' },
//       { name: 'Merchants Cover Policy' },
//       { name: 'Shop Insurance' },
//       { name: 'Marine Open Inland Declaration Policy' },
//       { name: 'Contractors Plant & Machinery Insurance Policy' },
//       { name: 'Building Insurance' }
//     ],
//     others: [
//       { name: 'Government Bonds' },
//       { name: 'Private Bonds' },
//       { name: 'Gold Bonds' },
//       { name: 'Government Scheme' },
//       { name: 'Post Office' },
//       { name: 'Bank Fixed Deposit' },
//       { name: 'Private Fixed  Deposit' },
//     ]
//   };
//   error: string;
//   items = [];
//   constructor(private activatedRoute: ActivatedRoute, private appService: AppService, private userService: UserService) {
//     this.activatedRoute.params.subscribe(param => {
//       this.page = param.page;
//       this.getData(this.page);
//     });
//   }

//   getData(collection) {
//     console.log(collection);
//     this.items = [];
//     this.userService.getDocument(collection, this.userService.user.userInfo.clientId)
//       .then((res) => {
//         if (res.empty) {
//           this.error = 'No Data Found';
//         }
//         res.docs.forEach(result => {
//           this.items.push(result.data());
//         });
//         console.log(this.items);
//         this.appService.setPolicies(this.items);
//       });
//   }

//   ngOnInit() {
//   }
// }

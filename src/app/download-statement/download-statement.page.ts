import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-download-statement',
  templateUrl: './download-statement.page.html',
  styleUrls: ['./download-statement.page.scss'],
})
export class DownloadStatementPage implements OnInit {

  currentDate = new Date().toISOString().split('T')[0];
  clientID = 123;
  clientName = 'anil';
  constructor(private userService: UserService) { }

  ngOnInit() {
    console.log(this.userService.allCollections);
    setTimeout(() => {
      this.convetToPDF();
    }, 1000);
  }

  convetToPDF() {
    // const data = document.getElementById('contentToConvert').innerHTML;
    // console.log(data);
    // html2canvas(data).then(canvas => {
    //   // Few necessary setting options
    //   const imgWidth = 300;
    //   const pageHeight = 100;
    //   const imgHeight = canvas.height * imgWidth / canvas.width;
    //   const heightLeft = imgHeight;

    //   const contentDataURL = canvas.toDataURL('image/png');
    //   const pdf = new jspdf('p', 'mm', 'a2'); // A4 size page of PDF
    //   const position = 0;
    //   pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);
    //   pdf.save('new-file.pdf'); // Generated PDF
    // });
  }

}

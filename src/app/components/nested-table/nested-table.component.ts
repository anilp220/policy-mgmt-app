import { Component, Input } from '@angular/core';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-nested-table',
  templateUrl: './nested-table.component.html',
  styleUrls: ['./nested-table.component.scss']
})
export class NestedTableComponent {
  @Input() data: any;

  constructor(public appService: AppService) { }

  get dataKeys(): string[] {
    return Object.keys(this.data);
  }

  isObject(value: any): boolean {
    return typeof value === 'object' && !Array.isArray(value) && value !== null;
  }

  isArray(value: any): boolean {
    return Array.isArray(value);
  }

  isPrimitive(value: any): boolean {
    return !this.isObject(value) && !this.isArray(value);
  }

  isURL(str) {
    // const pattern = new RegExp('^(https?:\\/\\/)?' + // Protocol
    //   '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // Domain name
    //   '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR IP (v4) address
    //   '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // Port and path
    //   '(\\?[;&a-z\\d%_.~+=-]*)?' + // Query string
    //   '(\\#[-a-z\\d_]*)?$', 'i'); // Fragment locator
    // return pattern.test(str);
    let url;
    try {
      url = new URL(str);
    } catch (_) {
      return false;
    }
    return url.protocol === 'http:' || url.protocol === 'https:';
  }
}

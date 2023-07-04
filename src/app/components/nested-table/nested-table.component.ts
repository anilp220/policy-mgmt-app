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
}

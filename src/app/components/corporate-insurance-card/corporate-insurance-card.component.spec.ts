import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CorporateInsuranceCardComponent } from './corporate-insurance-card.component';

describe('CorporateInsuranceCardComponent', () => {
  let component: CorporateInsuranceCardComponent;
  let fixture: ComponentFixture<CorporateInsuranceCardComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CorporateInsuranceCardComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CorporateInsuranceCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

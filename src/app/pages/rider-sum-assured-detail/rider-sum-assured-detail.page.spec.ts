import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RiderSumAssuredDetailPage } from './rider-sum-assured-detail.page';

describe('RiderSumAssuredDetailPage', () => {
  let component: RiderSumAssuredDetailPage;
  let fixture: ComponentFixture<RiderSumAssuredDetailPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ RiderSumAssuredDetailPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RiderSumAssuredDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

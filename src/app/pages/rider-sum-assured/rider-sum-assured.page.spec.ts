import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RiderSumAssuredPage } from './RiderSumAssuredPage';

describe('RiderSumAssuredPage', () => {
  let component: RiderSumAssuredPage;
  let fixture: ComponentFixture<RiderSumAssuredPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [RiderSumAssuredPage],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RiderSumAssuredPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

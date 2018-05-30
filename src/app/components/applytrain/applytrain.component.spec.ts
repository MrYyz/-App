import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplytrainComponent } from './applytrain.component';

describe('ApplytrainComponent', () => {
  let component: ApplytrainComponent;
  let fixture: ComponentFixture<ApplytrainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApplytrainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplytrainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

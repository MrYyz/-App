import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainClassComponent } from './train-class.component';

describe('TrainClassComponent', () => {
  let component: TrainClassComponent;
  let fixture: ComponentFixture<TrainClassComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrainClassComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainClassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

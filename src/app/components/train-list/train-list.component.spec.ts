import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainCourseComponent } from './train-course.component';

describe('TrainCourseComponent', () => {
  let component: TrainCourseComponent;
  let fixture: ComponentFixture<TrainCourseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrainCourseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

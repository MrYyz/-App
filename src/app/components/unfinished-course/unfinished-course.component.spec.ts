import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnfinishedCourseComponent } from './unfinished-course.component';

describe('UnfinishedCourseComponent', () => {
  let component: UnfinishedCourseComponent;
  let fixture: ComponentFixture<UnfinishedCourseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnfinishedCourseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnfinishedCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

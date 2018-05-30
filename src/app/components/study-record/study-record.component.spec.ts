import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudyRecordComponent } from './study-record.component';

describe('StudyRecordComponent', () => {
  let component: StudyRecordComponent;
  let fixture: ComponentFixture<StudyRecordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudyRecordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudyRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

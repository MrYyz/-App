import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomUlComponent } from './custom-ul.component';

describe('CustomUlComponent', () => {
  let component: CustomUlComponent;
  let fixture: ComponentFixture<CustomUlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomUlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomUlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

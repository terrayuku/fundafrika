import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddlanguageComponent } from './addlanguage.component';

describe('AddlanguageComponent', () => {
  let component: AddlanguageComponent;
  let fixture: ComponentFixture<AddlanguageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddlanguageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddlanguageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

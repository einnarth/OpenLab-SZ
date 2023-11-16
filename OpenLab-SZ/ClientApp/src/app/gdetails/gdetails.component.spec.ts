import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GDetailsComponent } from './gdetails.component';

describe('GDetailsComponent', () => {
  let component: GDetailsComponent;
  let fixture: ComponentFixture<GDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

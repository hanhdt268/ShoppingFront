import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewOderComponent } from './view-oder.component';

describe('ViewOderComponent', () => {
  let component: ViewOderComponent;
  let fixture: ComponentFixture<ViewOderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewOderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewOderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

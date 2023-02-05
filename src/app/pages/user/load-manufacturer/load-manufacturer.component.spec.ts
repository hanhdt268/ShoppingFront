import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadManufacturerComponent } from './load-manufacturer.component';

describe('LoadManufacturerComponent', () => {
  let component: LoadManufacturerComponent;
  let fixture: ComponentFixture<LoadManufacturerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoadManufacturerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoadManufacturerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

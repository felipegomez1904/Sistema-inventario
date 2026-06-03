import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EquiposVistaComponent } from './equipos-vista.component';

describe('EquiposVistaComponent', () => {
  let component: EquiposVistaComponent;
  let fixture: ComponentFixture<EquiposVistaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EquiposVistaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EquiposVistaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

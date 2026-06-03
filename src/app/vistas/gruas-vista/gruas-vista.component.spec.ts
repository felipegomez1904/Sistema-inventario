import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GruasVistaComponent } from './gruas-vista.component';

describe('GruasVistaComponent', () => {
  let component: GruasVistaComponent;
  let fixture: ComponentFixture<GruasVistaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GruasVistaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GruasVistaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

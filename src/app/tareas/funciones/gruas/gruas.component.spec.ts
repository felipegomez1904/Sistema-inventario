import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GruasComponent } from './gruas.component';

describe('GruasComponent', () => {
  let component: GruasComponent;
  let fixture: ComponentFixture<GruasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GruasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GruasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

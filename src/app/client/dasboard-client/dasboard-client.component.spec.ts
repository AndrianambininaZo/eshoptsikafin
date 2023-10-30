import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DasboardClientComponent } from './dasboard-client.component';

describe('DasboardClientComponent', () => {
  let component: DasboardClientComponent;
  let fixture: ComponentFixture<DasboardClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DasboardClientComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DasboardClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

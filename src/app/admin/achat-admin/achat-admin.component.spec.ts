import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AchatAdminComponent } from './achat-admin.component';

describe('AchatAdminComponent', () => {
  let component: AchatAdminComponent;
  let fixture: ComponentFixture<AchatAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AchatAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AchatAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

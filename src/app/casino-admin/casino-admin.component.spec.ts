import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CasinoAdminComponent } from './casino-admin.component';

describe('CasinoAdminComponent', () => {
  let component: CasinoAdminComponent;
  let fixture: ComponentFixture<CasinoAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CasinoAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CasinoAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

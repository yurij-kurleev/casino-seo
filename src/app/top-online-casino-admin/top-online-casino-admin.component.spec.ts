import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopOnlineCasinoAdminComponent } from './top-online-casino-admin.component';

describe('TopOnlineCasinoAdminComponent', () => {
  let component: TopOnlineCasinoAdminComponent;
  let fixture: ComponentFixture<TopOnlineCasinoAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopOnlineCasinoAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopOnlineCasinoAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

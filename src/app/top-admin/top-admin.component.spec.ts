import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopAdminComponent } from './top-admin.component';

describe('TopAdminComponent', () => {
  let component: TopAdminComponent;
  let fixture: ComponentFixture<TopAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

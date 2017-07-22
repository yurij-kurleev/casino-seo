import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DescriptionsAdminComponent } from './descriptions-admin.component';

describe('DescriptionsAdminComponent', () => {
  let component: DescriptionsAdminComponent;
  let fixture: ComponentFixture<DescriptionsAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DescriptionsAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DescriptionsAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChannelAdminComponent } from './channel-admin.component';

describe('ChannelAdminComponent', () => {
  let component: ChannelAdminComponent;
  let fixture: ComponentFixture<ChannelAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChannelAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChannelAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

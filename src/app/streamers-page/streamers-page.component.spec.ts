import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StreamersPageComponent } from './streamers-page.component';

describe('StreamersPageComponent', () => {
  let component: StreamersPageComponent;
  let fixture: ComponentFixture<StreamersPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StreamersPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StreamersPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopOnlineCasinoComponent } from './top-online-casino.component';

describe('TopOnlineCasinoComponent', () => {
  let component: TopOnlineCasinoComponent;
  let fixture: ComponentFixture<TopOnlineCasinoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopOnlineCasinoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopOnlineCasinoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

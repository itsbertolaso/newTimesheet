import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavstocksComponent } from './navstocks.component';

describe('NavstocksComponent', () => {
  let component: NavstocksComponent;
  let fixture: ComponentFixture<NavstocksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavstocksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavstocksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

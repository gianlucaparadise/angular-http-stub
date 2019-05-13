import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AngularHttpStubLibComponent } from './angular-http-stub-lib.component';

describe('AngularHttpStubLibComponent', () => {
  let component: AngularHttpStubLibComponent;
  let fixture: ComponentFixture<AngularHttpStubLibComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AngularHttpStubLibComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AngularHttpStubLibComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

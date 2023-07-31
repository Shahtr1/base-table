import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AscSharedLibsComponent } from './asc-shared-libs.component';

describe('AscSharedLibsComponent', () => {
  let component: AscSharedLibsComponent;
  let fixture: ComponentFixture<AscSharedLibsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AscSharedLibsComponent]
    });
    fixture = TestBed.createComponent(AscSharedLibsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

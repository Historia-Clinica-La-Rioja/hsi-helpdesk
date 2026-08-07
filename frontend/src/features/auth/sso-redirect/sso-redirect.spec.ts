import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SsoRedirect } from './sso-redirect';

describe('SsoRedirect', () => {
  let component: SsoRedirect;
  let fixture: ComponentFixture<SsoRedirect>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SsoRedirect]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SsoRedirect);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

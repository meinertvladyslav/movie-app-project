import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VisitedPage } from './visited.page';

describe('VisitedPage', () => {
  let component: VisitedPage;
  let fixture: ComponentFixture<VisitedPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(VisitedPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

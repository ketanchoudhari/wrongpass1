import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchwrapComponent } from './searchwrap.component';

describe('SearchwrapComponent', () => {
  let component: SearchwrapComponent;
  let fixture: ComponentFixture<SearchwrapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchwrapComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchwrapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

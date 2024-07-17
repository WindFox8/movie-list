import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenreContentComponent } from './genre-content.component';

describe('GenreContentComponent', () => {
  let component: GenreContentComponent;
  let fixture: ComponentFixture<GenreContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenreContentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GenreContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

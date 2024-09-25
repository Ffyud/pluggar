import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardlistDialogComponent } from './cardlist-dialog.component';

describe('CardlistDialogComponent', () => {
  let component: CardlistDialogComponent;
  let fixture: ComponentFixture<CardlistDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardlistDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardlistDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

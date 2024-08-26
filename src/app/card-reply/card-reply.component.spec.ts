import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardReplyComponent } from './card-reply.component';

describe('CardReplyComponent', () => {
  let component: CardReplyComponent;
  let fixture: ComponentFixture<CardReplyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardReplyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardReplyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

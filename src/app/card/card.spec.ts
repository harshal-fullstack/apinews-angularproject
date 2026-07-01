import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Card } from './card';

describe('Card', () => {
  let component: Card;
  let fixture: ComponentFixture<Card>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Card]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Card);
    component = fixture.componentInstance;
    component.article = {
      urlToImage: 'https://example.com/image.jpg',
      title: 'Sample News Title',
      description: 'Sample News Description',
      url: 'https://example.com/news'
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

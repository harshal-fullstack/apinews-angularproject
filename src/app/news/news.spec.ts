import { TestBed } from '@angular/core/testing';
import { NewsComponent } from './news';
import { Newsservice } from '../newsservice';
import { of } from 'rxjs';
import { ActivatedRoute, provideRouter } from '@angular/router';

describe('NewsComponent', () => {
  let mockNewsService: any;

  beforeEach(async () => {
    mockNewsService = jasmine.createSpyObj('Newsservice', ['Headlines']);
    mockNewsService.Headlines.and.returnValue(of({ articles: [] }));

    await TestBed.configureTestingModule({
      imports: [NewsComponent],
      providers: [
        { provide: Newsservice, useValue: mockNewsService },
        provideRouter([]),
        {
          provide: ActivatedRoute,
          useValue: {
            queryParams: of({ q: '', category: '' })
          }
        }
      ]
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(NewsComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});

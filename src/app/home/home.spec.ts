import { TestBed } from '@angular/core/testing';
import { HomeComponent } from './home';
import { Newsservice } from '../newsservice';
import { of } from 'rxjs';
import { provideRouter } from '@angular/router';

describe('HomeComponent', () => {
  let mockNewsService: any;

  beforeEach(async () => {
    mockNewsService = jasmine.createSpyObj('Newsservice', ['Headlines']);
    mockNewsService.Headlines.and.returnValue(of({ articles: [] }));

    await TestBed.configureTestingModule({
      imports: [HomeComponent],
      providers: [
        { provide: Newsservice, useValue: mockNewsService },
        provideRouter([])
      ]
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(HomeComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});

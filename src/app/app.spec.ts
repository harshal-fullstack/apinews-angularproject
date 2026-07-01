import { TestBed } from '@angular/core/testing';
import { App } from './app';
import { Newsservice } from './newsservice';
import { of } from 'rxjs';

describe('App', () => {
  let mockNewsService: any;

  beforeEach(async () => {
    mockNewsService = jasmine.createSpyObj('Newsservice', ['Headlines']);
    mockNewsService.Headlines.and.returnValue(of({ articles: [] }));

    await TestBed.configureTestingModule({
      imports: [App],
      providers: [
        { provide: Newsservice, useValue: mockNewsService }
      ]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render search and list components', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('app-search')).toBeTruthy();
    expect(compiled.querySelector('app-list')).toBeTruthy();
  });
});

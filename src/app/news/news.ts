import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Newsservice } from '../newsservice';
import { Search } from '../search/search';
import { List } from '../list/list';

@Component({
  selector: 'app-news',
  standalone: true,
  imports: [CommonModule, Search, List],
  templateUrl: './news.html',
  styleUrl: './news.css'
})
export class NewsComponent implements OnInit, OnDestroy {
  articles: any[] = [];
  isLoading: boolean = true;
  currentCategory: string = '';
  searchQuery: string = '';
  hasError: boolean = false;
  errorMessage: string = '';

  categories = [
    { name: 'All', value: '' },
    { name: 'Technology', value: 'technology' },
    { name: 'Business', value: 'business' },
    { name: 'Sports', value: 'sports' },
    { name: 'Entertainment', value: 'entertainment' },
    { name: 'Science', value: 'science' },
    { name: 'Health', value: 'health' }
  ];

  private routeSub!: Subscription;

  constructor(
    private newsService: Newsservice,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.routeSub = this.route.queryParams.subscribe(params => {
      this.searchQuery = params['q'] || '';
      this.currentCategory = params['category'] || '';
      this.loadNews();
    });
  }

  ngOnDestroy() {
    if (this.routeSub) {
      this.routeSub.unsubscribe();
    }
  }

  loadNews() {
    this.isLoading = true;
    this.hasError = false;
    this.newsService.Headlines(this.searchQuery, 'us', this.currentCategory).subscribe({
      next: (data) => {
        if (data && data.articles) {
          // Filter out deleted/removed articles from NewsAPI
          this.articles = data.articles.filter((a: any) => a.title && a.title !== '[Removed]');
        } else {
          this.articles = [];
        }
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error loading headlines', err);
        this.hasError = true;
        this.errorMessage = err.error?.message || 'Failed to fetch news. Please verify your API key or connection.';
        this.isLoading = false;
        this.loadFallbackNews();
      }
    });
  }

  loadFallbackNews() {
    // Generate some fallback mock data depending on category/query to keep UI alive
    const categoryLabel = this.currentCategory ? this.currentCategory.toUpperCase() : 'GENERAL';
    const queryLabel = this.searchQuery ? `"${this.searchQuery}"` : '';
    
    this.articles = [
      {
        title: `Latest Updates in ${categoryLabel} News ${queryLabel}`,
        description: `Stay tuned for real-time coverage, specialized columns, and critical perspectives regarding ${this.currentCategory || 'general news'} events.`,
        url: 'https://newsapi.org',
        urlToImage: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=600&auto=format&fit=crop',
        source: { name: 'GlobalNews' },
        publishedAt: new Date().toISOString()
      },
      {
        title: `Special Report: Global Trends & Insights`,
        description: 'An in-depth review of technological adoption, changing trade patterns, and societal shifts currently impacting major markets.',
        url: 'https://newsapi.org',
        urlToImage: 'https://images.unsplash.com/photo-1495020689067-958852a6565d?q=80&w=600&auto=format&fit=crop',
        source: { name: 'WorldPress' },
        publishedAt: new Date().toISOString()
      },
      {
        title: 'Looking Forward: Innovation and Strategy',
        description: 'Key leaders and strategists share forecasts on renewable development, digital security systems, and workspace evolution.',
        url: 'https://newsapi.org',
        urlToImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=600&auto=format&fit=crop',
        source: { name: 'InsightTech' },
        publishedAt: new Date().toISOString()
      }
    ];
  }

  onSearch(query: string) {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { q: query || null },
      queryParamsHandling: 'merge'
    });
  }

  setCategory(categoryValue: string) {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { category: categoryValue || null },
      queryParamsHandling: 'merge'
    });
  }
}

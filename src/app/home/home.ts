import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Newsservice } from '../newsservice';
import { Card } from '../card/card';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, Card],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class HomeComponent implements OnInit {
  searchQuery: string = '';
  featuredArticles: any[] = [];
  isLoading: boolean = true;
  hasError: boolean = false;

  categories = [
    { name: 'Technology', icon: 'bi-cpu', color: 'blue-gradient', value: 'technology' },
    { name: 'Business', icon: 'bi-graph-up-arrow', color: 'emerald-gradient', value: 'business' },
    { name: 'Sports', icon: 'bi-trophy', color: 'orange-gradient', value: 'sports' },
    { name: 'Entertainment', icon: 'bi-film', color: 'pink-gradient', value: 'entertainment' },
    { name: 'Science', icon: 'bi-flask', color: 'purple-gradient', value: 'science' },
    { name: 'Health', icon: 'bi-heart-pulse', color: 'red-gradient', value: 'health' }
  ];

  constructor(private newsService: Newsservice, private router: Router) {}

  ngOnInit() {
    this.loadFeaturedNews();
  }

  loadFeaturedNews() {
    this.isLoading = true;
    this.newsService.Headlines('', 'us').subscribe({
      next: (data) => {
        if (data && data.articles) {
          // Filter out deleted/empty articles
          this.featuredArticles = data.articles
            .filter((a: any) => a.title && a.title !== '[Removed]')
            .slice(0, 3);
        }
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error loading featured news', err);
        this.hasError = true;
        this.isLoading = false;
        // Load high quality fallback local mock data to prevent empty/broken screen
        this.featuredArticles = [
          {
            title: 'The Future of Artificial Intelligence in 2026 and Beyond',
            description: 'Exploration of how AI agents, neural models, and advanced automation are reshaped across consumer and enterprise industries globally.',
            url: 'https://newsapi.org',
            urlToImage: 'https://images.unsplash.com/photo-1677442136019-21780efad99a?q=80&w=600&auto=format&fit=crop',
            source: { name: 'TechVision' },
            publishedAt: new Date().toISOString()
          },
          {
            title: 'Global Markets Pivot Amid New Economic Indicators',
            description: 'Financial analysts decode interest rates, trade changes, and stock indices moving global investments into the second half of the year.',
            url: 'https://newsapi.org',
            urlToImage: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?q=80&w=600&auto=format&fit=crop',
            source: { name: 'MarketPulse' },
            publishedAt: new Date().toISOString()
          },
          {
            title: 'Breakthrough in Clean Fusion Energy Technologies',
            description: 'Scientists report record net energy gain in magnetic confinement reactors, signaling a green future for global energy generation.',
            url: 'https://newsapi.org',
            urlToImage: 'https://images.unsplash.com/photo-1507668077129-56e32842fceb?q=80&w=600&auto=format&fit=crop',
            source: { name: 'ScienceDaily' },
            publishedAt: new Date().toISOString()
          }
        ];
      }
    });
  }

  onSearchSubmit() {
    if (this.searchQuery.trim()) {
      this.router.navigate(['/news'], { queryParams: { q: this.searchQuery.trim() } });
    }
  }

  selectCategory(categoryValue: string) {
    this.router.navigate(['/news'], { queryParams: { category: categoryValue } });
  }
}

import { Component, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Search } from "./search/search";
import { List } from "./list/list";
import { Newsservice } from './newsservice';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Search, List],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App  implements OnInit {
  articles: any[] = [];

  constructor(private newsService: Newsservice) { }

  ngOnInit() {
    this.loadHeadlines();
  }

  loadHeadlines(query: string = '') {
    this.newsService.Headlines(query).subscribe(data => {
      this.articles = data.articles;
    });
  }
  
}

import { Component, Input } from '@angular/core';
import { Card } from "../card/card";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-list',
  imports: [Card,CommonModule],
  templateUrl: './list.html',
  styleUrl: './list.css'
})
export class List {
   @Input() articles: any[] = [];
}

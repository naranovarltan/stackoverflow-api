import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { PathConfig } from '../../config/path.config';

@Component({
  selector: 'app-search-pages',
  templateUrl: './search-pages.component.html',
  styleUrls: ['./search-pages.component.less']
})
export class SearchPagesComponent {

  public search: string;

  constructor(private router: Router) {}

  public onSubmit(): void {
    this.router.navigate([PathConfig.QUESTIONS], { queryParams: { search: this.search } });
  }
}

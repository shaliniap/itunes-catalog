import { Component, OnInit, ViewChild} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {MatTableDataSource, MatSort} from '@angular/material';
import {SearchComponent} from './../search/search.component';

@Component({
  selector: 'app-itunes-list',
  templateUrl: './itunes-list.component.html',
  styleUrls: ['./itunes-list.component.css']
})
export class ItunesListComponent implements OnInit {
  dataSource: MatTableDataSource<any>;
  searchResult: any;
  count: any;
  camp: any;

  displayedColumns: string[] = ['ARTWORK', 'NAME', 'GENRE', 'LINK_TO_ITUNES'];

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.searchResult = JSON.parse(params.searchRes);
      console.log(this.searchResult.results);
      this.count = this.searchResult.resultCount;
    });
    this.dataSource = new MatTableDataSource(this.searchResult.results);
  }

}

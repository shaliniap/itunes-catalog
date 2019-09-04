import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SearchService } from './../search.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  form: FormGroup;

  searchForm:any;
  campValue:any;
  //searchModel:null;

  term: any;
  country: any;
  media: any;
  entity: any;
  attribute: any;
  callback: any;
  limit: any;
  lang: any;
  version: any;
  explicit: any;
  ent: any;

  searcResult: any;
  entities = [
    {
      title: ['movie', 'movieArtist'],
      parentId: 'movie'
    },
    {
      title: ['podcastAuthor', 'podcast'],
      parentId: 'podcast'
    },
    {
      title: ['musicArtist', 'musicVideo'],
      parentId: 'musicVideo'
    }
  ]

  constructor(private service: SearchService, private router: Router) { }

  ngOnInit() {

    this.searchForm = new FormGroup({
      term : new FormControl(null, {
        validators: [Validators.required]
      }),
      country : new FormControl(null, {
        validators: [Validators.required]
      }),
      media : new FormControl(''),
      entity : new FormControl(''),
      attribute : new FormControl(''),
      callback : new FormControl(''),
      limit : new FormControl('50'),
      lang : new FormControl('en_us'),
      version : new FormControl('2'),
      explicit : new FormControl('Yes')
    });
  }

  onSavePost() {
    if (this.searchForm.invalid) {
      return;
    }
    this.service.getItunes(JSON.stringify(this.searchForm.value)).subscribe(res => {
      this.searcResult = res;
      console.log(res);
      this.router.navigate(['itunes-list'], {
       queryParams: {searchRes: JSON.stringify(this.searcResult)}
      });
    });

    this.searchForm.reset();
  }

  // Entity values retreived based on media value selected
  onMediaSelect(){
    const val = this.searchForm.value.media;
    console.log(val);
    if(val !== ''){
      this.searchForm.get('entity').setValue("");
      this.ent = this.entities.filter(item => item.parentId === val);
      this.ent = (this.ent)['0'].title;
      console.log(this.ent);
      this.searchForm.get('entity').enable();
    } else {
      this.searchForm.get('entity').setValue("");
      this.searchForm.get('entity').disable();
    }
  }

}

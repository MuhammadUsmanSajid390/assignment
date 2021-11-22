import { Component, OnInit, ViewChild} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import {MatSort, Sort} from '@angular/material/sort';
import { Pagination } from '../../models/Pagination';
import { IUserList } from '../../models/UserList';
import { UsersService } from '../../services/users/users.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
@ViewChild(MatSort) sort: MatSort;
@ViewChild(MatPaginator) paginator: MatPaginator;
inputForm: FormGroup;
value = [];
displayedColumns: string[] = ['avatar_url', 'login', 'type'];
data: IUserList[] = [];
isSubmitted: boolean = false;
showProgressBar: boolean = false;
paginationData: Pagination = new Pagination(9,1);


  constructor(private usersServive: UsersService,private toastr: ToastrService) { }

  ngOnInit(): void {
    this.initializeForm()
  }

  initializeForm = () => {
    this.inputForm = new FormGroup({
      inputValue: new FormControl('', [Validators.required])
    })
  }

  initializePaginationData = () => {
    this.paginator.firstPage();
    this.paginationData = new Pagination(9,1);
  }

  getUserList = () => {
    this.data = [];
    this.initializePaginationData();
    this.isSubmitted = true;
    if(!this.inputForm.valid) return;
    this.showProgressBar = true;
    this.getUserData();
  }

  getUserData = () => {
    this.usersServive.getUserListData( this.paginationData.currentPage,this.paginationData.pageSize,this.inputForm.controls['inputValue'].value).subscribe(
      res => {
        this.data = res.items;
        if(res.total_count === 0){
          this.toastr.info('No record found')
        }
        this.paginationData.totalRecords = res.total_count;
        this.sortData({active: 'login', direction: 'asc'});
        this.showProgressBar = false;
      }
    )
  }

  sortData(sort: Sort) {
    const data = this.data.slice();
    if (!sort.active || sort.direction === '') {
      this.data = data;
      return;
    }
    const sortedData = this.data.sort((a:IUserList , b:IUserList) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'avatar_url': return this.compare(a.avatar_url, b.avatar_url, isAsc);
        case 'login': return this.compare(a.login, b.login, isAsc);
        case 'type': return this.compare(a.type, b.type, isAsc);
        default: return 0;
      }
    });
    this.data = JSON.parse(JSON.stringify(sortedData));
    
  }

  compare(a: number | string, b: number | string, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

  pageEvent(event: PageEvent){ 
    console.log('Page', event);
    this.paginationData.currentPage =  event.pageIndex + 1;
    this.paginationData.pageSize = event.pageSize;
    this.showProgressBar = true;
    this.getUserData();

  }

}

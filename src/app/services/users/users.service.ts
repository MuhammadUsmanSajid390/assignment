import { Injectable } from '@angular/core';
import { ApiService } from '../apiService/api-service.service';

@Injectable()
export class UsersService {

  constructor(private apiService: ApiService) { }

  getUserListData(
    pageNumber: number,
    pageSize: number,
    input: string
  ) {
    return this.apiService
      .get<any>(`https://api.github.com/search/users?q=${input}&page=${pageNumber}&per_page=${pageSize}`)
  }

}

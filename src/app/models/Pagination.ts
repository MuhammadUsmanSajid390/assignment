export class Pagination {
    pageSize: number;
    currentPage: number;
    pageSizeOptions: number[];
    totalRecords: number

    constructor(pageSize: number, currentPage: number){
        this.pageSize = pageSize | 9;
        this.currentPage = currentPage | 1;
        this.pageSizeOptions = [9,18,27,36];
        this.totalRecords = 0;
    }
}
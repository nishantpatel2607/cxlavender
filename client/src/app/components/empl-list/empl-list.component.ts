import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Locations, Sizes } from 'src/app/models/company';
import { Employee } from 'src/app/models/employee';
import { CompanyService } from 'src/app/services/company.service';
import { EmpService } from 'src/app/services/empservice.service';

@Component({
  selector: 'app-empl-list',
  templateUrl: './empl-list.component.html',
  styleUrls: ['./empl-list.component.css'],
})
export class EmplListComponent implements OnInit, OnDestroy {
  constructor(
    private empservice: EmpService,
    private companyService: CompanyService
  ) {}

  emplList: Employee[] = [];
  totalPages: number[] = [1];
  currentPage = 1;
  emplSubscription: Subscription;

  private _selectedLocation = '';
  public get selectedLocation() {
    return this._selectedLocation;
  }
  public set selectedLocation(value) {
    this._selectedLocation = value;
    this.getEmployees(this.currentPage);
  }

  private _selectedSize = '';
  public get selectedSize() {
    return this._selectedSize;
  }
  public set selectedSize(value) {
    this._selectedSize = value;
    this.getEmployees(this.currentPage);
  }

  locations: string[];
  sizes: string[];

  ngOnDestroy(): void {
    if (this.emplSubscription) {
      this.emplSubscription.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.getEmployees(1);
    this.companyService
      .getLocations()
      .subscribe((locations: Locations) => (this.locations = locations.result));
    this.companyService
      .getSizes()
      .subscribe((sizes: Sizes) => (this.sizes = sizes.result));
  }

  getEmployees(page) {
    this.emplSubscription = this.empservice
      .getEmployeeList(page, this.selectedLocation, this.selectedSize)
      .subscribe((result) => {
        this.emplList = result.result;
        console.log(result);
        this.currentPage = result.currentPage;
        this.totalPages = Array(result.totalPages)
          .fill(0)
          .map((x, i) => i + 1);
      });
  }

  isPageActive(page) {
    return page == this.currentPage ? true : false;
  }

  onPageClick(page) {
    this.getEmployees(page);
  }

  onPreviousPageClick() {
    if (this.currentPage == 1) return;
    --this.currentPage;
    this.getEmployees(this.currentPage);
  }

  onNextPageClick() {
    if (this.currentPage == this.totalPages.length) return;
    ++this.currentPage;
    this.getEmployees(this.currentPage);
  }

  LocationChange(location) {
    this.currentPage = 1;
    this.selectedLocation = location == 'Location' ? '' : location;
    console.log(this.selectedLocation);
  }
  SizeChange(size) {
    this.currentPage = 1;
    this.selectedSize = size == 'Size' ? '' : size;
  }
}

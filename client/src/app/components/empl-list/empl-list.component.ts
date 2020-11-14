import { Component, OnInit } from '@angular/core';
import { EmpService } from 'src/app/services/empservice.service';

@Component({
  selector: 'app-empl-list',
  templateUrl: './empl-list.component.html',
  styleUrls: ['./empl-list.component.css'],
})
export class EmplListComponent implements OnInit {
  constructor(private empservice: EmpService) {}

  ngOnInit(): void {
    this.empservice
      .getEmployeeList(1, '', '')
      .subscribe((result) => console.log(result));
  }
}

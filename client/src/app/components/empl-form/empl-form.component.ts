import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Companies } from 'src/app/models/company';
import { CompanyService } from 'src/app/services/company.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from 'src/app/models/employee';
import { EmpService } from 'src/app/services/empservice.service';

@Component({
  selector: 'app-empl-form',
  templateUrl: './empl-form.component.html',
  styleUrls: ['./empl-form.component.css'],
})
export class EmplFormComponent implements OnInit {
  form: FormGroup;
  companies;
  employeeId: string;
  employee: Employee = {
    _id: '',
    age: 0,
    company: '',
    email: '',
    firstname: '',
    lastname: '',
  };

  constructor(
    fb: FormBuilder,
    private companyService: CompanyService,
    private empService: EmpService,
    private router: Router,
    private activateRoute: ActivatedRoute
  ) {
    this.form = fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      age: [''],
      company: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.companyService
      .getCompanies()
      .subscribe((companies: Companies) => (this.companies = companies.result));

    this.activateRoute.params.subscribe((params) => {
      this.employeeId = params['id'];
      if (this.employeeId) {
        this.getEmployee(this.employeeId);
      }
    });
  }

  getEmployee(id: string) {
    this.empService.getEmployee(id).subscribe((empresult) => {
      this.employee = empresult.result;
      console.log(this.employee);
      this.form.setValue({
        firstname: this.employee.firstname,
        lastname: this.employee.lastname,
        email: this.employee.email,
        age: this.employee.age,
        company: this.employee.company,
      });
    });
  }
  get firstname() {
    return this.form.get('firstname');
  }

  get lastname() {
    return this.form.get('lastname');
  }

  get email() {
    return this.form.get('email');
  }

  get age() {
    return this.form.get('age');
  }

  get company() {
    return this.form.get('company');
  }

  saveForm() {
    console.log(this.form.value);
    if (this.employee._id == '') {
      this.empService.createEmployee(this.form.value).subscribe((result) => {
        this.router.navigate(['/list']);
      });
    } else {
      this.employee.age = this.form.value.age;
      this.employee.company = this.form.value.company;
      this.employee.email = this.form.value.email;
      this.employee.firstname = this.form.value.firstname;
      this.employee.lastname = this.form.value.lastname;
      this.empService.updateEmployee(this.employee).subscribe((result) => {
        this.router.navigate(['/list']);
      });
    }
  }

  cancelForm() {
    this.router.navigate(['/list']);
  }
}

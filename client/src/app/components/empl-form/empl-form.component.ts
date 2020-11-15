import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Companies } from 'src/app/models/company';
import { CompanyService } from 'src/app/services/company.service';

@Component({
  selector: 'app-empl-form',
  templateUrl: './empl-form.component.html',
  styleUrls: ['./empl-form.component.css'],
})
export class EmplFormComponent implements OnInit {
  form: FormGroup;
  constructor(fb: FormBuilder, private companyService: CompanyService) {
    this.form = fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      age: [''],
      company: ['', Validators.required],
    });
  }

  companies;

  ngOnInit(): void {
    this.companyService
      .getCompanies()
      .subscribe((companies: Companies) =>{ this.companies = companies.result;
      console.log(this.companies)});
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

  saveForm() {}
}

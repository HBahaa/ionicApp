import { OnInit, Component } from '@angular/core';
import {FormGroup, FormBuilder, FormControl, Validators} from '@angular/forms';
import { NavController } from 'ionic-angular';
import { ServicePage } from '../service/service';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {

  registForm: FormGroup;
  stdInfo: {name: string, email: string, phone: string, track: string} = {name: '', email: '', phone: '', track: ''};

  constructor(private nav: NavController,public formBlr: FormBuilder) {

  }

  ngOnInit(): any {
    this.registForm = this.formBlr.group({
      'name': ['', [Validators.required, Validators.minLength(3), this.nameValidator.bind(this)]],
      'phone': ['', this.phoneValidator.bind(this)],
      'email': ['', [Validators.required, this.emailValidator.bind(this)]],
      'track':['', Validators.required]
    });
  }

  onSubmit() {
    console.log('submitting form');
    this.nav.push(ServicePage);
  }

  isValid(field: string) {
    let formField = this.registForm.get(field);
    return formField.valid || formField.pristine;
  }
  nameValidator(control: FormControl): {[s: string]: boolean} {
    if (!control.value.match("^[a-zA-Z ,.'-]+$")) {
      return {invalidName: true};
    }
  }

  phoneValidator(control: FormControl): {[s: string]: boolean} {
    if (control.value !== '') {
      if (!control.value.match('\\(?\\d{3}\\)?-? *\\d{3}-? *-?\\d{4}')) {
        return {invalidPhone: true};
      }
    }
  }

  emailValidator(control: FormControl): {[s: string]: boolean} {
    if (!(control.value.toLowerCase().match('^[a-zA-Z]\\w*@gmail\\.com$') || control.value.toLowerCase().match('^[a-zA-Z]\\w*@yahoo\\.com$'))) {
      return {invalidEmail: true};
    }
  }

}

import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TokenStorageService } from '../services/token-storage.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  constructor(
    private userService: UserService,
    private router: Router,
  ) { }
  myForm: FormGroup = new FormGroup({
    primaryEmail: new FormControl('', [
      Validators.required,
      Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
    token: new FormControl(''),
  });
  
  code:any;
  show = false;
  show_reset = false;
  alert = false;

  get primEmail() {
    return this.myForm.get('primaryEmail')
  }

  get token() {
    return this.myForm.get('token')
  }

  ngOnInit(): void {
  }

  request() {
    if(this.userService.sendEmail(this.primEmail?.value).subscribe()){
      this.show = true;
    } else {
      this.show = false;
    }
  }
  redirect(){
    this.userService.getInfobyEmail(this.primEmail?.value).subscribe(res=>{
      const code = res.passtoken
      if(this.token?.value == code){
        this.code = res.passtoken;
        this.show_reset = true;
        // this.router.navigate(['/reset-password'])
      } else {
        this.alert = true;
      }
    })

  }
}

import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  email: string = '';
  password: string = '';
  token:string = '';

  msg = ""
  disableSubmit = false

  constructor(
    private _api: ApiService,
    private auth: AuthService,
    private _router: Router, 
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.email = this.route.snapshot.paramMap.get('email')!
    this.token = this.route.snapshot.paramMap.get('token')!

  }

  onSubmit(form: NgForm) {
    console.log('Your form data : ', form.value);
    console.log('Your email: %s token: %s', this.email!,this.token!);
    this.msg = "";
    this.disableSubmit = false

    if (this.email && form.value.password && this.token) {

      this._api.postTypeRequest('user/resetPassword', {email:this.email, token:this.token, password:form.value.password}).subscribe((res: any) => {
        console.log("res.status=" + res.status);
        if (res.status) {
          
          this.msg = "Password reset success"
          this._router.navigate(['/login']);

        } else {
          //this._router.navigate(['/adminhome']);
          this.msg = "Something went wrong. Your Reset Password details are invalid. Please try again or start the forgot password process again.."
        }
      });
    } else {
      //this._router.navigate(['/adminhome']);
      this.msg = "Something went wrong. Your Reset Password details are invalid. Please try again or start the forgot password process again.."
    }

  }

  
}

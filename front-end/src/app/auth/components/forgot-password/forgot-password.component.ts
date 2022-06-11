import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  email: string = '';
  msg = ""
  constructor(
    private _api: ApiService,
    private auth: AuthService,
    private _router: Router
  ) { }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm) {
    console.log('Your form data : ', form.value);

    if (form.value.email) {

      this._api.postTypeRequest('user/sendResetToken', form.value).subscribe((res: any) => {
        console.log("res.status=" + res.status);
        if (res.status) {
          
          this.msg = "Go to your mail inbox and check the email with instructions to reset .."
        } else {
          //this._router.navigate(['/adminhome']);
          this.msg = "Could not reset. Check the email you have entered.."
        }
      });
    } else {
      //this._router.navigate(['/adminhome']);
      this.msg = "Enter your email to reset password.."
    }

  }

  
}

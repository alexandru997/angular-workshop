import {Component, inject} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {AuthService} from "../../auth/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss'
})
export class LoginPageComponent {

  authServices = inject(AuthService)
  router = inject(Router)


  form: FormGroup<{
    username: FormControl<string | null>;
    password: FormControl<string | null>;
  }> = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  })

  onSubmit() {
    console.log(this.form.value)
    if (this.form.valid) {
      const formData = {
        username: this.form.value.username ?? '',
        password: this.form.value.password ?? '',
      };
      this.authServices.login(formData).subscribe(res => {
        this.router.navigate(['']);
        console.log(res)
      });
    }
  }
}

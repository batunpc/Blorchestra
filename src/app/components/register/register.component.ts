import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";

import { RegisterUser } from "src/app/RegisterUser";
import { AuthService } from "src/app/services/auth.service";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"],
})
export class RegisterComponent implements OnInit {
  constructor(private auth: AuthService) {}

  registerUser!: RegisterUser;
  /*   registerUser = {
    userName: "",
    password: "",
    password2: "",
  }; */
  warning = "";
  success: boolean = false;
  loading: boolean = false;

  ngOnInit(): void {
    this.registerUser = new RegisterUser();
  }

  onSubmit(form: NgForm): void {
    form.valid
      ? console.log("Data: ", this.registerUser)
      : console.log("INVALID");

    if (form.valid) {
      this.loading = true;
      this.auth.register(this.registerUser).subscribe({
        next: (success) => {
          this.success = true;
          this.warning = "";
          this.loading = false;
        },
        error: (err) => {
          this.success = false;
          this.warning = err.error.message;
          this.loading = false;
        },
      });
    }
  }
}

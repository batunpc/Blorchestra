import { Component, OnInit } from "@angular/core";
import { User } from "../../helper/User";
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";
import { NgForm } from "@angular/forms";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  user!: User;
  warning: string = "";
  loading: boolean = false;
  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.user = new User();
  }

  onSubmit(form: NgForm): void {
    if (form.valid) {
      this.loading = true;
      this.auth.login(this.user).subscribe({
        next: (success) => {
          this.loading = false;
          localStorage.setItem("access_token", success.token);
          //localStorage["access_token"] = success.token;
          this.router.navigate(["new-releases"]);
          console.log(success.token);
        },
        error: (err) => {
          this.loading = false;
          this.warning = err.error.message;
        },
      });
    }
  }
}

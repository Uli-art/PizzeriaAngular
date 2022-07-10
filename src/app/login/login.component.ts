import {Component, OnInit} from '@angular/core';
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {HttpService} from "../services/http.service";
import {PizzaService} from "../services/pizza.service";
import {SignUpComponent} from "../sign-up/sign-up.component";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(public pizzaService: PizzaService,
              private dialogRef: MatDialogRef<LoginComponent>,
              private httpService: HttpService,
              private dialog: MatDialog) {
  }

  ngOnInit(): void {
  }

  public onSubmit(): void {
    this.pizzaService.getUser().subscribe(user => {
      const data: any = user;
      if (data.length != 0) {
        this.pizzaService.user = data[0];
        this.pizzaService.isUserSubmitted = true;
        this.dialogRef.close();
      } else {
        this.pizzaService.openMessagePopup("Неверная комбинация логин/пароль");
      }
    });
  }

  public openSignUpForm(): void {
    this.dialogRef.close();
    this.dialog.open(SignUpComponent, {
        width: '700px',
        height: '500px'
      }
    );
  }
}

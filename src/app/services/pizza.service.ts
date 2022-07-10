import {Injectable} from '@angular/core';
import {Pizza} from "../shared/pizza";
import {delay, map, Observable} from "rxjs";
import {FormGroup} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {baseURL} from "../shared/baseurl";
import {MatDialog} from "@angular/material/dialog";
import {PopupComponent} from "../popup/popup.component";
import {User} from "../shared/user";

@Injectable({
  providedIn: 'root'
})
export class PizzaService {

  public pizzasLink: string = "pizzas";
  public feedbackLink: string = "feedback";
  public usersLink: string = "users";
  public ordersLink: string = "orders";

  public orderedPizzas: Pizza[] = [];
  public user: User = new User();
  public isUserSubmitted: boolean = false;

  constructor(private http: HttpClient,
              private dialog: MatDialog) {
  }

  public getPizzas(): Observable<Pizza[]> {
    return this.http.get<Pizza[]>(baseURL + this.pizzasLink);
  }

  public getPizzasWithDelay(): Observable<Pizza[]> {
    return this.http.get<Pizza[]>(baseURL + this.pizzasLink)
      .pipe(
        delay(2000)
      );
  }

  public getFeaturedPizzas(): Observable<Pizza[]> {
    return this.http.get<Pizza[]>(baseURL + this.pizzasLink + "?featured=true");
  }

  public getPizza(id: string): Observable<Pizza> {
    return this.http.get<Pizza>(baseURL + this.pizzasLink + "/" + id)
      .pipe(
        delay(500)
      );
  }

  public getPizzasIds(): Observable<string[]> {
    return this.getPizzas().pipe(map(pizzas => pizzas.map(pizza => pizza.id)));
  }

  public getUser(): Observable<User> {
    return this.http.get<User>(baseURL + this.usersLink + "?username=" + this.user.username + "&password=" + this.user.password);
  }

  public checkUsername(): Observable<User> {
    return this.http.get<User>(baseURL + this.usersLink + "?username=" + this.user.username);
  }

  public onFormValueChanged(formGroup: FormGroup, formErrors: any, validationMessages: any) {
    if (!formGroup) {
      return;
    }
    for (const field in formErrors) {
      if (formErrors.hasOwnProperty(field)) {
        formErrors[field] = '';
        const control = formGroup.get(field);
        if (control && control.dirty && !control.valid) {
          const messages = validationMessages[field];
          for (const key in control.errors) {
            if (control.errors.hasOwnProperty(key)) {
              formErrors[field] += messages[key] + ' ';
            }
          }
        }
      }
    }
  }

  public openMessagePopup(message: string): void {
    this.dialog.open(PopupComponent, {
        width: '500px',
        height: '110px',
        data: message
      }
    );
  }
}

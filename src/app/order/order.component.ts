import {Component, OnInit} from '@angular/core';
import {PizzaService} from "../services/pizza.service";
import {Pizza} from "../shared/pizza";
import {LoginComponent} from "../login/login.component";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {Router} from "@angular/router";
import {HttpService} from "../services/http.service";
import {Order} from "../shared/order";

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

  public displayedColumns: string[] = ['pizza', 'price', 'count', 'sum', 'delete'];
  public totalSum!: string;
  private order: Order = new Order();

  constructor(public pizzaService: PizzaService,
              private dialog: MatDialog,
              private dialogRef: MatDialogRef<OrderComponent>,
              private router: Router,
              private http: HttpService) {
  }

  ngOnInit(): void {
    this.calculateTotalOrderSum();
  }

  public displayedPizzaList(): Pizza[] {
    return [...new Map(this.pizzaService.orderedPizzas.map(x=>[x.name,x])).values()]//[...new Set(this.pizzaService.orderedPizzas)]
      .sort((a, b) => (
        a.name.localeCompare(b.name))
      );
  }

  public calculatePizzaSum(chosenPizza: Pizza): string {
    return (this.countPizzas(chosenPizza) * Number(chosenPizza.price))
      .toFixed(2);
  }

  public calculateTotalOrderSum(): void {
    this.totalSum = this.pizzaService.orderedPizzas
      .map((pizza => (Number(pizza.price))))
      .reduce((a, b) => a + b, 0)
      .toFixed(2);
  }

  public removeFromOrder(deletedPizza: Pizza): void {
    this.pizzaService.orderedPizzas = this.pizzaService.orderedPizzas.filter(pizza => pizza !== deletedPizza);
    this.calculateTotalOrderSum();
  }

  public countPizzas(chosenPizza: Pizza): number {
    return this.pizzaService.orderedPizzas.filter(pizza => pizza.id == chosenPizza.id).length;
  }

  public addPizza(chosenPizza: Pizza): void {
    this.pizzaService.orderedPizzas.push(chosenPizza);
    this.calculateTotalOrderSum();
  }

  public removePizza(chosenPizza: Pizza): void {
    const numberOfPizzas: number = this.pizzaService.orderedPizzas.filter(pizza => pizza == chosenPizza).length;
    this.pizzaService.orderedPizzas = this.pizzaService.orderedPizzas.filter(pizza => pizza !== chosenPizza);
    for (let i = 0; i < numberOfPizzas - 1; i++) {
      this.pizzaService.orderedPizzas.push(chosenPizza);
    }
    this.calculateTotalOrderSum();
  }

  public openLoginForm(): void {
    this.dialog.open(LoginComponent, {
        width: '500px',
        height: '300px'
      }
    );
  }

  public onSubmit(): void {
    this.dialogRef.close();
    this.order.pizzas = this.pizzaService.orderedPizzas;
    this.order.username = this.pizzaService.user.username;
    this.order.totalSum = this.totalSum;
    this.http.save(this.order, this.pizzaService.ordersLink);
    this.router.navigate(['/order']);
    this.pizzaService.orderedPizzas = [];
  }
}

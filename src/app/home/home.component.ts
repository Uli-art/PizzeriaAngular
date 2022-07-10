import {Component, Inject, OnInit} from '@angular/core';
import {Pizza} from "../shared/pizza";
import {PizzaService} from "../services/pizza.service";
import {flyIn} from "../animations/app.animations";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  host:{
    '[@flyIn]':'true',
    'style':'display:block;'
  },
  animations:[
    flyIn()
  ]
})
export class HomeComponent implements OnInit {

  public firstPromotion!: Pizza;
  public secondPromotion!: Pizza;
  private pizzas!: Pizza[];
  private featuredPizzas!: Pizza[];

  constructor(@Inject('BaseURL') public BaseURL: string,
              private pizzaService: PizzaService) {
  }

  ngOnInit() {
    this.setPromotionPizzas();
  }

  private setPromotionPizzas() {
    this.pizzaService.getPizzas()
      .subscribe(pizzas => {
        this.pizzas = pizzas;
        this.setFeaturedPizzas();
      });
  }

  private setFeaturedPizzas() {
    this.pizzaService.getFeaturedPizzas()
      .subscribe(featuredPizzas => {
        this.featuredPizzas = featuredPizzas;
        this.displayFeaturedPizzas();
      });
  }

  private displayFeaturedPizzas() {
    if (this.featuredPizzas.length >= 2) {
      this.firstPromotion = this.featuredPizzas[0];
      this.secondPromotion = this.featuredPizzas[1];
    } else if (this.featuredPizzas.length == 1) {
      this.firstPromotion = this.featuredPizzas[0];
      this.secondPromotion = this.pizzas[0];
    } else {
      this.firstPromotion = this.pizzas[0];
      this.secondPromotion = this.pizzas[1];
    }
  }
}

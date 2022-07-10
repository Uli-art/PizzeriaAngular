import {ComponentFixture, TestBed} from '@angular/core/testing';

import {OrderComponent} from './order.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {FlexLayoutModule} from "@angular/flex-layout";
import {HttpService} from "../services/http.service";
import {HttpClientModule} from "@angular/common/http";
import {MatDialog, MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import {PizzaService} from "../services/pizza.service";
import {Pizza} from "../shared/pizza";
import {PIZZAS} from "../shared/pizzas";
import {MatToolbar, MatToolbarModule} from "@angular/material/toolbar";
import {MatTable, MatTableModule} from "@angular/material/table";
import {RouterTestingModule} from "@angular/router/testing";

describe('OrderComponent', () => {
  let component: OrderComponent;
  let fixture: ComponentFixture<OrderComponent>;
  const pizza1:Pizza = PIZZAS[0];
  const pizza2:Pizza = PIZZAS[1];

  beforeEach(async () => {
    const pizzaServiceStub = {
      orderedPizzas: [pizza1,pizza1,pizza2]
    };
    await TestBed.configureTestingModule({
      imports:[
        BrowserAnimationsModule,
        FlexLayoutModule,
        HttpClientModule,
        MatDialogModule,
        MatCardModule,
        MatButtonModule,
        MatToolbarModule,
        MatTableModule,
        RouterTestingModule
      ],

      declarations: [OrderComponent],
      providers:[
        {provide: PizzaService, useValue: pizzaServiceStub},
        {provide: MatDialog, useValue:{}},
        {provide: MatDialogRef, useValue: {}}
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('Total price', () => {
    let totalSum = Number(pizza1.price) + Number(pizza1.price) + Number(pizza2.price);

    expect(Number(component.totalSum)).toBe(Number(totalSum));
  });
  it('Display', () => {
    expect(component.displayedPizzaList()).toEqual([pizza2,pizza1]);
  });

});

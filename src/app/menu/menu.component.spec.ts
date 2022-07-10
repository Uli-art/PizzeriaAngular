import {ComponentFixture, TestBed} from '@angular/core/testing';

import {MenuComponent} from './menu.component';
import {Observable, of} from "rxjs";
import {PIZZAS} from "../shared/pizzas";
import {FlexLayoutModule} from "@angular/flex-layout";
import {Pizza} from "../shared/pizza";
import {PizzaService} from "../services/pizza.service";
import {baseURL} from "../shared/baseurl";
import {MatGridListModule} from "@angular/material/grid-list";
import {RouterTestingModule} from "@angular/router/testing";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {DebugElement} from "@angular/core";
import {By} from "@angular/platform-browser";

describe('MenuComponent', () => {
  let component: MenuComponent;
  let fixture: ComponentFixture<MenuComponent>;

  beforeEach(async () => {
    const pizzaServiceStub={
      getPizzasWithDelay: function (): Observable <Pizza[]>{
        return of(PIZZAS);
      }
    }
    await TestBed.configureTestingModule({
      imports:[
        FlexLayoutModule,
      RouterTestingModule.withRoutes([{
        path: 'menu',
        component: MenuComponent
      }]),
      MatGridListModule,
      MatProgressSpinnerModule
      ],
      declarations: [MenuComponent],
      providers:[
        {provide: PizzaService, useValue:pizzaServiceStub},
        {provide: 'BaseURL', useValue: baseURL}
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('pizzas should be 6', () => {
    expect(component.pizzas.length).toBe(6);
  });

  it('should display pizza name in html', () => {
    let debug: DebugElement;
    let element:HTMLElement;
    debug = fixture.debugElement.query(By.css('h1'));
    element = debug.nativeElement;
    expect(element.textContent).toContain(PIZZAS[0].name.toUpperCase());
  });

  it('price of pizza', () => {
    expect(Number(component.pizzas[2].price)).toBeGreaterThan(20);
  });

  it('name of pizza', () => {
    expect(component.pizzas[0].name).toBe("Пепперони");
  });

  it('fealured of pizza', () => {
    expect(component.pizzas[0].featured).toBeTrue();
  });

  it('Download', () => {
    let debug: DebugElement;
    let element:HTMLElement;
    debug = fixture.debugElement.query(By.css('.spinner-center'));
    element = debug.nativeElement;
    expect(element.textContent).withContext("Загружается");
  });

  it('selected of pizza', () => {
    expect(component.selectedPizza).toBeUndefined();
    component.onSelect(component.pizzas[0]);
    expect(component.selectedPizza).toBe(component.pizzas[0]);
  });
});

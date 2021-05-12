import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderNavarComponent } from './order-navar.component';

describe('OrderNavarComponent', () => {
  let component: OrderNavarComponent;
  let fixture: ComponentFixture<OrderNavarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderNavarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderNavarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

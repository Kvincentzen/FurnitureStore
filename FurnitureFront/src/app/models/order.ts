import { Product } from 'src/app/models/product';
import { OrderLine } from 'src/app/models/order-line';
import { Customer } from 'src/app/models/customer';
export interface Orders {
    id: number;
    customerId: number;
    date: Date;
    statusId: number;
    orderLines: OrderLine[];
    customer: Customer;
}
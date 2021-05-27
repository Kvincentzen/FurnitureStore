import { Login } from './login';
export interface Customer {
    id: number;
    name: string;
    telephoneNumber: number;
    address: string;
    loginId: number;
    login: Login;
}
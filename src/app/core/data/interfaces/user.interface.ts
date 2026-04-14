import { AddressInterface } from './address.interface';
import { CompanyInterface } from './company.interface';

export interface UserInterface {
  id: number;
  name: string;
  username: string;
  email: string;
  address: AddressInterface;
  phone: string;
  website: string;
  company: CompanyInterface;
}

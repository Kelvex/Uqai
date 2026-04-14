import { GeoInterface } from './geo.interface';

export interface AddressInterface {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: GeoInterface;
}

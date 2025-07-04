import { Enterprise } from './enterprise.model';
import { User } from './user.model';

export interface EnterpriseDTO{
  id?: number;
  name: String;
  email: String;
  phonenumber: String;
  address: String;
}
export interface EnterpriseUserDTO {
  enterprise: EnterpriseDTO;
  login: string;
  password?: string;
}

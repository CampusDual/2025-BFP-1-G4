import { Enterprise } from './enterprise.model';
import { User } from './user.model';

export interface EnterpriseDTO{
  id?: number;
  name: string;
  email: string;
  phonenumber: string;
  address: string;
}
export interface EnterpriseUserDTO {
  enterprise: EnterpriseDTO;
  login: string;
  password: string;
}

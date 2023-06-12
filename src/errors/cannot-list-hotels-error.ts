import { ApplicationError } from '@/protocols';

export function cannotListProductsError(): ApplicationError {
  return {
    name: 'CannotListProductsError',
    message: 'Cannot list Products!',
  };
}

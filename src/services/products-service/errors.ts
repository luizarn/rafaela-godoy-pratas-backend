import { ApplicationError } from '@/protocols';

export function duplicatedTitleError(): ApplicationError {
  return {
    name: 'DuplicatedTitleError',
    message: 'There is already an produc with given title',
  };
}

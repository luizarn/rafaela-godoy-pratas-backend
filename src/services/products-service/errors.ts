import { ApplicationError } from '@/protocols';

export function duplicatedTitleError(): ApplicationError {
  return {
    name: 'DuplicatedTitleError',
    message: 'There is already an produc with given title',
  };
}

export function maximumLimitEmphasisError(): ApplicationError {
  return {
    name: 'MaximumLimitEmphasisError',
    message: 'The maximum limit of featured products has been lifted',
  };
}

export function maximumLimitLaunchError(): ApplicationError {
  return {
    name: 'MaximumLimitLaunchError',
    message: 'The maximum limit of products in the releases category has been lifted',
  };
}

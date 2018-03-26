import {PROJECT_SET, PROJECT_UNSET} from './constants'

export const setProject = (record) => ({
  type: PROJECT_SET,
  record
});

export const unsetProject = () => ({
  type: PROJECT_UNSET,
});


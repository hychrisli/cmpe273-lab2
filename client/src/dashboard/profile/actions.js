import {PROFILE_UPDATING} from "./constants";

export const profileUpdate = (values) => ({
  type: PROFILE_UPDATING,
  values
});
import {SKILLS_CHOICES_SET, SKILLS_CHOICES_UNSET} from './constants'

export const setSkillChoices = (choices) => ({
  type: SKILLS_CHOICES_SET,
  choices
});

export const unsetSkillChoices = () => ({
  type: SKILLS_CHOICES_UNSET,
});


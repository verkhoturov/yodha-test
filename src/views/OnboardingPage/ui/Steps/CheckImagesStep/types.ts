export enum CheckImageNames {
  GENDER_FEMALE = 'gender-female',
  GENDER_MALE = 'gender-male',
  GENDER_NONE = 'gender-none',
  GENDER_LGBT = 'gender-lgbti',
}

export type CheckImagesPageItem = {
  imageName: CheckImageNames;
  label: string;
};

export type CheckImagesPageConfig = {
  name: string;
  valuesCount: number;
  requiredCount: number;
  titleBefore?: string;
  title?: string;
  items: CheckImagesPageItem[];
};

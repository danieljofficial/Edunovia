export interface Language {
  code: string;
  nameKey: string;
  nativeNameKey: string;
}

export interface Role {
  id: string;
  nameKey: string;
  icon: string;
}

export interface OnboardingData {
  id: number;
  title: string;
  description: string;
  image: any | null;
  backgroundColor: string;
}

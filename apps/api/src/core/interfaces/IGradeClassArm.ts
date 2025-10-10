export interface IGradeCreate {
  level: number;
  section: "JUNIOR" | "SENIOR";
  name?: string;
}

export interface IGrade extends IGradeCreate {
  id: string;
  arms?: IClassArm[];
}

export interface IClassArmCreate {
  name: string;
  gradeId: string;
  fullName?: string;
}

export interface IClassArm extends IClassArmCreate {
  id: string;
  grade?: IGrade;
}

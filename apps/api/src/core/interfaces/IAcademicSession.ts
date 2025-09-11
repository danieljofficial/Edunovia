export interface IAcademicSessionCreate {
  name: string;
  startDate: Date;
  endDate: Date;
  isCurrent?: boolean;
  description?: string;
}

export interface IAcademicSession extends IAcademicSessionCreate {
  id: string;
  createdAt: Date;
  updatedAtAt: Date;
}

export interface IAcademicTermCreate {
  name: string;
  termNumber: number;
  startDate: Date;
  endDate: Date;
  sessionId: string;
  isCurrent?: boolean;
  description?: string;
}

export interface IAcademicTerm extends IAcademicTermCreate {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

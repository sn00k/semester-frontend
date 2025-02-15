export type Invitation = {
  active: boolean;
  code: string;
  company_id: string;
  email: string;
  id: string;
  sender_id: string;
  team_id: string;
};

export type Absence = {
  id: string;
  company_id: string;
  start_at: string;
  end_at: string;
  approved: boolean | null;
  approved_by: string;
  employee: string;
  absence_type: string;
  created_at: string;
  updated_at: string;
};

export type Absences = {
  data: Absence[];
};

export type AbsenceType = {
  id: string;
  name: string;
  company_id: string;
  auto_approvable: boolean;
  created_at: string;
  updated_at: string;
};

export type AbsenceTypes = {
  data: AbsenceType[];
};

export type AbsenceApplication = Omit<Absence, 'approved_by'>;
export type AbsenceResponse = {
  teamId: string,
  absences: Absence[]
}
export type AbsencesByWeek = {
  teamId: string;
  absences: {
    [key:string]: Absence[]
  }
}
export type Company = {
  id: string;
  name: string;
  organization_number: string;
  owner_id: string;
  created_at: string;
  updated_at: string;
};
export type User = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  email_verified_at?: string;
  updated_at: string;
  created_at: string;
  employments?: Company[];
};

export type Team = {
  id: string,
  name: string,
  members?: Array<User>,
  created_at: string,
  updated_at: string
};

export type TeamsResponse = {
  data: Team[]
}

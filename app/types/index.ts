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
  start_at: string;
  end_at: string;
  approved: boolean | null;
  approved_by: string;
  employee: string;
  absence_type: string;
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
  email_verified_at: string;
  updated_at: string;
  created_at: string;
  employments?: Company[];
};

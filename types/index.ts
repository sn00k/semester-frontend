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
}
export type Absences = {
  data: Absence[];
}
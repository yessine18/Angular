export interface Publication {
  id?: number;              // backend returns numeric id
  type: string;
  titre: string;
  lien?: string;
  dateApparition?: string;  // backend field name (NOT "date")
  sourcePdf?: string;       // backend field name (NOT "sourcepdf")
}
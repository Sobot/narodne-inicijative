export interface CommitteeMember {
  fullName: string;
  address: string;
}

export interface InitiativeData {
  name: string;
  description: string;
  municipality: string;
  committeeMembers: CommitteeMember[];
}

export interface Municipality {
  name: string;
  code: string;
}

export type Step = 1 | 2 | 3 | 4; 
// types/family.ts
export interface FamilyMember {
    id: string;
    name: string;
    avatar: string;
    role: string;
    relation: 'blood' | 'married' | 'adopted' | 'partner';
    age: number;
    location?: string;
    emergencyContact: boolean;
    healthStatus?: 'excellent' | 'good' | 'concern';
    lastConnected?: Date;
    isUser?: boolean;
  }
  
  export interface Relationship {
    from: string;
    to: string;
    type: 'parent' | 'child' | 'sibling' | 'spouse';
  }
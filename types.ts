
export enum RiskLevel {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
  CRITICAL = 'CRITICAL'
}

export enum TransactionStatus {
  APPROVED = 'APPROVED',
  PENDING = 'PENDING',
  BLOCKED = 'BLOCKED',
  ESCALATED = 'ESCALATED'
}

export interface Transaction {
  id: string;
  timestamp: string;
  amount: number;
  currency: string;
  type: string;
  gateway: string;
  sender: {
    id: string;
    country: string;
    riskRating: RiskLevel;
  };
  receiver: {
    id: string;
    country: string;
    riskRating: RiskLevel;
  };
  riskScore: number;
  triggeredRules: string[];
  status: TransactionStatus;
  caseId?: string;
}

export interface Case {
  id: string;
  customerId: string;
  alertType: string;
  riskLevel: RiskLevel;
  timeInQueue: string;
  assignedAnalyst: string;
  status: 'NEW' | 'IN_REVIEW' | 'PENDING_INFO' | 'READY_TO_CLOSE';
  description?: string;
  customerAge?: string;
}

export interface SanctionsMatch {
  id: string;
  searchedName: string;
  matchedEntity: string;
  matchScore: number;
  listSource: 'OFAC' | 'EU' | 'UN' | 'UK';
  matchType: 'EXACT' | 'PHONETIC' | 'PARTIAL';
  program: string;
  reason: string;
}

export interface ComplianceRule {
  id: string;
  name: string;
  description: string;
  status: 'ACTIVE' | 'INACTIVE';
  hitRate: number;
  falsePositiveRate: number;
  jurisdictions: string[];
  lastAlertCount: number;
}

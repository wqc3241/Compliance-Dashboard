
import { RiskLevel, TransactionStatus, Transaction, Case, SanctionsMatch, ComplianceRule } from './types';

const GATEWAYS = ['Core-API', 'Braintree-Connect', 'Express-Checkout', 'FastLane-Vault', 'Venmo-Direct'];

export const MOCK_TRANSACTIONS: Transaction[] = Array.from({ length: 20 }).map((_, i) => ({
  id: `TXN-2024-${1000 + i}`,
  timestamp: new Date(Date.now() - Math.random() * 100000000).toISOString(),
  amount: Math.floor(Math.random() * 10000) + 100,
  currency: 'USD',
  type: i % 3 === 0 ? 'P2P_TRANSFER' : 'MERCHANT_PAYMENT',
  gateway: GATEWAYS[Math.floor(Math.random() * GATEWAYS.length)],
  sender: {
    id: `USR-***${Math.floor(Math.random() * 9000) + 1000}`,
    country: i % 5 === 0 ? 'MX' : 'US',
    riskRating: i % 7 === 0 ? RiskLevel.MEDIUM : RiskLevel.LOW,
  },
  receiver: {
    id: `USR-***${Math.floor(Math.random() * 9000) + 1000}`,
    country: i % 4 === 0 ? 'CO' : 'GB',
    riskRating: i % 10 === 0 ? RiskLevel.HIGH : RiskLevel.LOW,
  },
  riskScore: Math.floor(Math.random() * 100),
  triggeredRules: i % 4 === 0 ? ['RULE-001', 'VELOCITY-X'] : [],
  status: i % 6 === 0 ? TransactionStatus.PENDING : (i % 15 === 0 ? TransactionStatus.BLOCKED : TransactionStatus.APPROVED),
}));

export const MOCK_CASES: Case[] = [
  { 
    id: 'CASE-4421', 
    customerId: 'CUST-009', 
    alertType: 'AML Velocity', 
    riskLevel: RiskLevel.HIGH, 
    timeInQueue: '4h 12m', 
    assignedAnalyst: 'Sarah J.', 
    status: 'IN_REVIEW',
    description: 'High frequency of transfers from multiple unique cards in a 2-hour window.',
    customerAge: '2.4 years'
  },
  { id: 'CASE-4422', customerId: 'CUST-112', alertType: 'Sanctions Match', riskLevel: RiskLevel.CRITICAL, timeInQueue: '12m', assignedAnalyst: 'Michael K.', status: 'NEW' },
  { id: 'CASE-4423', customerId: 'CUST-551', alertType: 'Structuring', riskLevel: RiskLevel.MEDIUM, timeInQueue: '2d 4h', assignedAnalyst: 'Sarah J.', status: 'PENDING_INFO' },
  { id: 'CASE-4424', customerId: 'CUST-883', alertType: 'High Value Int.', riskLevel: RiskLevel.HIGH, timeInQueue: '1h 30m', assignedAnalyst: 'Unassigned', status: 'NEW' },
  { id: 'CASE-4425', customerId: 'CUST-202', alertType: 'Account Takeover', riskLevel: RiskLevel.CRITICAL, timeInQueue: '5m', assignedAnalyst: 'Michael K.', status: 'NEW' },
  { id: 'CASE-4426', customerId: 'CUST-394', alertType: 'SAR Filing Request', riskLevel: RiskLevel.MEDIUM, timeInQueue: '3d 1h', assignedAnalyst: 'Elena R.', status: 'READY_TO_CLOSE' },
];

export const MOCK_SANCTIONS: SanctionsMatch[] = [
  {
    id: 'SANC-001',
    searchedName: 'Ali Hassan',
    matchedEntity: 'HASSAN, Ali Mohammed',
    matchScore: 0.92,
    listSource: 'OFAC',
    matchType: 'PHONETIC',
    program: 'SDGT',
    reason: 'Association with designated global terrorist entities.'
  },
  {
    id: 'SANC-002',
    searchedName: 'Crescent Trading Ltd',
    matchedEntity: 'CRESCENT SHIPPING TRADING',
    matchScore: 0.88,
    listSource: 'EU',
    matchType: 'PARTIAL',
    program: 'RUSSIA-SECTORAL',
    reason: 'Strategic sector sanctions related to logistics.'
  }
];

export const MOCK_RULES: ComplianceRule[] = [
  { id: 'RULE-001', name: 'High Value Cross-Border', description: 'Flag transfers > $3,000 to high-risk corridors.', status: 'ACTIVE', hitRate: 0.024, falsePositiveRate: 0.42, jurisdictions: ['US', 'EU', 'UK'], lastAlertCount: 124 },
  { id: 'RULE-002', name: 'Rapid Velocity Alert', description: 'Detect > 5 transactions within a 60-minute window.', status: 'ACTIVE', hitRate: 0.015, falsePositiveRate: 0.35, jurisdictions: ['GLOBAL'], lastAlertCount: 562 },
  { id: 'RULE-003', name: 'Structuring Threshold', description: 'Identify patterns just below $10,000 reporting limits.', status: 'ACTIVE', hitRate: 0.008, falsePositiveRate: 0.28, jurisdictions: ['US'], lastAlertCount: 89 },
  { id: 'RULE-004', name: 'Dormant Account Reactivation', description: 'Flag high-value activity on accounts inactive for > 180 days.', status: 'INACTIVE', hitRate: 0.031, falsePositiveRate: 0.55, jurisdictions: ['GLOBAL'], lastAlertCount: 0 },
];

export const COLORS = {
  primary: '#1a365d',
  accent: '#003087',
  risk: {
    low: '#2f855a',
    medium: '#d69e2e',
    high: '#c53030',
    critical: '#7b2cbf'
  }
};

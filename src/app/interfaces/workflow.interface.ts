// Interfaces principales
export interface BciWorkflow {
  id: string;
  name: string;
  type: WorkflowType;
  description: string;
  status: WorkflowStatus;
  priority: WorkflowPriority;
  version: string;
  trigger_amount: number;
  max_delay: number;
  created_date: string;
  last_modified: string;
  steps: WorkflowStep[];
  conditions: WorkflowCondition[];
  notifications: WorkflowNotifications;
  statistics: WorkflowStatistics;
}

export interface WorkflowStep {
  id: string;
  name: string;
  type: StepType;
  role: string;
  required: boolean;
  delay_hours: number;
  auto_approve: boolean;
  trigger_amount?: number;
}

export interface WorkflowCondition {
  id: string;
  type: ConditionType;
  operator: ConditionOperator;
  value: any;
  action: ConditionAction;
  target: string;
}

export interface WorkflowNotifications {
  start: boolean;
  step: boolean;
  complete: boolean;
  delay: boolean;
  escalation: boolean;
}

export interface WorkflowStatistics {
  total_processed: number;
  avg_processing_time: number;
  completion_rate: number;
  escalation_rate: number;
}


// Types et énumérations
export type WorkflowType = 'virements' | 'bulk_payments' | 'change';
export type StepType = 'start' | 'approval' | 'technical_check' | 'compliance' | 'final_approval' | 'end' | 'rate_validation';
export type WorkflowStatus = 'actif' | 'inactif' | 'suspendu';
export type WorkflowPriority = 'normale' | 'elevee' | 'critique';

export type ConditionType = 'amount' | 'enterprise_risk' | 'file_size';
export type ConditionOperator = 'greater_than' | 'equals' | 'less_than' | 'greater_than_equal' | 'less_than_equal';
export type ConditionAction = 'require_step' | 'require_additional_validation' | 'skip_step' | 'escalate';


export interface BciWorkflowsResponse {
  bci_workflows: BciWorkflow[];
}

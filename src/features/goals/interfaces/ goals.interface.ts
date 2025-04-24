export interface GoalBase {
  shared_user_id?: number | null;
  name: string;
  target_amount: number;
  current_amount: number;
}

export interface Goal extends GoalBase {
  id: number;
  user_id: number;
  end_date: Date;
}

export interface GoalCreate extends GoalBase {
  user_id: number;
  end_date: string;
}

export type GoalUpdate = Partial<GoalCreate>;

export type Todo = {
  id: string;
  isDone: boolean;
  content: string;
};

export const filters = ['all', 'active', 'completed'] as const;
export type Filter = typeof filters[number];

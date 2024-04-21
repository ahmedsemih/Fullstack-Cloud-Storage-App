type FileType = {
  name: string;
  path: string;
  size: number;
  type: string;
  lastModification?: string;
  downloadUrl?: string;
};

type PlanType = {
  userId: string;
  plan: string;
  limit: number;
  subscription: string | null;
  customer: string | null;
}

type GroupByDateType = {
  'today': FileType[];
  'this week': FileType[];
  'this month': FileType[];
  'this year': FileType[];
  'older': FileType[];
  'never': FileType[];
}
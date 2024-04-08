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
}

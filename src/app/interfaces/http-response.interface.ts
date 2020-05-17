export interface HttpResponseInterface<T> {
  has_more: boolean;
  quota_max: number;
  quota_remaining: number;
  items: T[];
}

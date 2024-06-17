type strArr = string[];

type SearchParams = {
  page?: number;
  limit?: number;
};

interface iList<T> {
  per_page: number;
  total_registers: number;
  current_page: number;
  data: T[];
}

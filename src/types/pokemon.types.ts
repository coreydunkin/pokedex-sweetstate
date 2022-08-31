export interface Pokemon {
  id: number;
  name: string;
  image: string;
}

export interface Result {
  data: {
    count: number;
    results: any[];
  }
}
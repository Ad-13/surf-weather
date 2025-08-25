export interface ICity {
  id: number;
  name: string;
  country: string;
  admin1?: string;
  latitude: number;
  longitude: number;
}

export interface ICityState {
  selectedCity: ICity | null;
  searchResults: ICity[];
  loading: boolean;
  error: string | null;
}

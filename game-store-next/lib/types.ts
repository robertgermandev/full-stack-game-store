export type GameSummary = {
  id: number;
  name: string;
  genre: string;
  price: number;
  releaseDate: string;
};

export type GameDetails = {
  id: number;
  name: string;
  genreId: number;
  price: number;
  releaseDate: string;
};

export type GameInput = {
  name: string;
  genreId: number;
  price: number;
  releaseDate: string;
};

export type Genre = {
  id: number;
  name: string;
};

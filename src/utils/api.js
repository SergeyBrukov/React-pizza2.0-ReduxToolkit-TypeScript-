const MAIN_API = 'https://623f7abb2aeb48a9af69c2ba.mockapi.io/sneacers/pizzas';

const hendlerFetchApi = (sort = 'rating', filter) => {
  return `${MAIN_API}?sortBy=${sort}&order=desc${filter ? `?filter= ${filter}` : ''}`;
};

export { MAIN_API, hendlerFetchApi };

export const getError = (error) => {
  return error.response && error.response.data.message
    ? error.response.data.message
    : error.message;
};

 
export const beautifulTitel = (title) => {
  if (title.length < 15) {
    return title;
  }
  title = title.slice(0, 15);
  return title + '...';
};
 
export const getFilterUrl = (searchFromURI, filter, skipPathname) => {

  const searchParams = new URLSearchParams(searchFromURI);
  const category = searchParams.get('category') || 'all';
  const query = searchParams.get('query') || 'all';
  const price = searchParams.get('price') || 'all';
  const rating = searchParams.get('rating') || 'all';
  const order = searchParams.get('order') || 'newest';
  const page = searchParams.get('page') || 1;

  const filterPage = filter.page || page;
  const filterCategory = filter.category || category;
  const filterQuery = filter.query || query;
  const filterRating = filter.rating || rating;
  const filterPrice = filter.price || price;
  const sortOrder = filter.order || order;
  const link = `${skipPathname ? '' : '/search?'}category=${filterCategory}&query=${filterQuery}&price=${filterPrice}&rating=${filterRating}&order=${sortOrder}&page=${filterPage}`;
  return link;
};
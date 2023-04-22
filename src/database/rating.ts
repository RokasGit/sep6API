// handling rating database table

const getMovieRating = (id: number) => {
  if (id != undefined) {
    return 0;
  } else {
    return 10;
  }
};

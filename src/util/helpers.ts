const genres = JSON.stringify([
  {
    id: 28,
    name: 'Action',
  },
  {
    id: 12,
    name: 'Adventure',
  },
  {
    id: 16,
    name: 'Animation',
  },
  {
    id: 35,
    name: 'Comedy',
  },
  {
    id: 80,
    name: 'Crime',
  },
  {
    id: 99,
    name: 'Documentary',
  },
  {
    id: 18,
    name: 'Drama',
  },
  {
    id: 10751,
    name: 'Family',
  },
  {
    id: 14,
    name: 'Fantasy',
  },
  {
    id: 36,
    name: 'History',
  },
  {
    id: 27,
    name: 'Horror',
  },
  {
    id: 10402,
    name: 'Music',
  },
  {
    id: 9648,
    name: 'Mystery',
  },
  {
    id: 10749,
    name: 'Romance',
  },
  {
    id: 878,
    name: 'Science Fiction',
  },
  {
    id: 10770,
    name: 'TV Movie',
  },
  {
    id: 53,
    name: 'Thriller',
  },
  {
    id: 10752,
    name: 'War',
  },
  {
    id: 37,
    name: 'Western',
  },
]);

const genresData = JSON.parse(genres);
export const genreMap = new Map(
  genresData.map((genre: { id: number; name: string }) => [
    genre.id,
    genre.name,
  ])
);

(() => {
  document.cookie = `bearerToken=eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjYmVlZmIyNWRhZTRmOWY5OWJjMzFjZDBlNzEzMzNmOSIsInN1YiI6IjYzZWE4NTFlMWYzZTYwMDA4NTkyMWUwOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.M2rW4zk5ShZ7EfK6ZVVlQnynIPoOb87NjFt_9RByNEc;max-age=31536000; path=/; secure; `;
  sessionStorage.setItem(
    'bearer',
    'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjYmVlZmIyNWRhZTRmOWY5OWJjMzFjZDBlNzEzMzNmOSIsInN1YiI6IjYzZWE4NTFlMWYzZTYwMDA4NTkyMWUwOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.M2rW4zk5ShZ7EfK6ZVVlQnynIPoOb87NjFt_9RByNEc'
  );
})();

export function getCookie(name: string) {
  const match = document.cookie.match(new RegExp(`(^| )${name}=([^;]+)`));
  if (match) return match[2];
}

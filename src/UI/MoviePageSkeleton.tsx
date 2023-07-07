import ContentLoader from 'react-content-loader';
import './Skeleton.css';

const w = window.innerWidth;
const h = window.innerHeight;

const MoviePageSkeleton = (props: { [key: string]: unknown }) => (
  <ContentLoader
    className='skeleton'
    speed={2}
    width={w}
    height={h / 2}
    viewBox='0 100 1000 700'
    backgroundColor='#000000'
    foregroundColor='#4b4949'
    {...props}
  >
    <rect x='25' y='600' rx='0' ry='0' width='1000' height='50' />
    <rect x='25' y='51' rx='0' ry='0' width='1000' height='500' />
  </ContentLoader>
);

export default MoviePageSkeleton;

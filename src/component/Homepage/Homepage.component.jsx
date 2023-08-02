
import './Homepage.styles.scss';

const HomePage = ({ home }) => {
  const { imageUrl, title } = home;
  return (
    <div className='home-container'>
      <div
        className='background-image'
        style={{
          backgroundImage: `url(${imageUrl})`,
        }}
      />
      <div className='home-body-container'>
        <h2>{title}</h2>
        <p>Start Scheduling</p>
      </div>
    </div>
  );
};

export default HomePage;
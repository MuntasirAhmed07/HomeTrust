import './HomeStats.css'; // You'll need to create this CSS file

const HomeStats = () => {
  return (
    <div
      className="home_stats_area"
      id="comp-6e6fae58-e26c-48f7-92bf-aaebc84bc64c">
      <div className="body_wrapper">
        <AnimatedHeading />
        <StatsDetails />
      </div>
    </div>
  );
};

const StatsDetails = () => {
  return (
    <div className="details_stats">
      <div className="building_image">
        <div
          className="building-image-area"
          style={{
            translate: 'none',
            rotate: 'none',
            scale: 'none',
            filter: 'grayscale(0.0032%) brightness(1)',
            transform: 'translate(0%, 25.0021%) translate3d(0px, 0px, 0px)',
            transformOrigin: '0% 100%',
          }}>
          <picture data-not-lazy="">
            <source
              media="(max-width:480px)"
              srcSet="https://cms.shantaholdings.com/images/9fq0td57CxqB1yz7CeatkFvlcf0=/149/width-512%7Cformat-avif/image.png"
              type="image/webp"
            />
            <source
              media="(max-width:480px)"
              srcSet="https://cms.shantaholdings.com/images/hTlDjspBPJ-0CCdRXmyKcIQb7i8=/149/width-512/image.png"
            />
            <source srcSet="https://cms.shantaholdings.com/images/aRf5hIWXZ3EL3oxjlaz1o24B2r4=/149/width-800%7Cformat-avif/image.png" />
            <img
              className="wg-img"
              src="https://cms.shantaholdings.com/images/P-GUTCB5QHb6LtMvO83dnx5h_bE=/149/width-800/image.png?t=1743280893867"
              alt="image"
              width="650"
              loading="eager"
            />
          </picture>
        </div>
      </div>

      <div className="wrapper">
        <StatsContainer
          stats={[
            {
              value: '10',
              suffix: 'M+',
              text: 'Total Area Built (Million sft.)',
            },
            { value: '100', suffix: '+', text: 'Number of Projects' },
          ]}
        />

        <StatsContainer
          stats={[
            { value: '20', suffix: '', text: 'Years Since Inception' },
            { value: '1400', suffix: '+', text: 'Happy Clients' },
          ]}
        />

        <StatsContainer
          stats={[
            { value: '52', suffix: '', text: 'Number of Completed Projects' },
            {
              value: '18',
              suffix: 'M+',
              text: 'Total Area in Pipeline (Million sft.)',
            },
          ]}
        />

        <div className="building-image-area-mobile">
          <picture data-not-lazy="">
            <source
              media="(max-width:480px)"
              srcSet="https://cms.shantaholdings.com/images/9fq0td57CxqB1yz7CeatkFvlcf0=/149/width-512%7Cformat-avif/image.png"
              type="image/webp"
            />
            <source
              media="(max-width:480px)"
              srcSet="https://cms.shantaholdings.com/images/hTlDjspBPJ-0CCdRXmyKcIQb7i8=/149/width-512/image.png"
            />
            <source srcSet="https://cms.shantaholdings.com/images/aRf5hIWXZ3EL3oxjlaz1o24B2r4=/149/width-800%7Cformat-avif/image.png" />
            <img
              className="wg-img"
              src="https://cms.shantaholdings.com/images/P-GUTCB5QHb6LtMvO83dnx5h_bE=/149/width-800/image.png?t=1743280893867"
              alt="image"
              width="650"
              loading="eager"
            />
          </picture>
        </div>
      </div>
    </div>
  );
};

const StatsContainer = ({ stats }) => {
  return (
    <div
      className="stats-container is-inview"
      data-scroll=""
      data-scroll-call="revealElement"
      style={{
        translate: 'none',
        rotate: 'none',
        scale: 'none',
        filter: 'blur(0px)',
        transform: 'translate(0px, 0px)',
        opacity: 1,
        visibility: 'inherit',
      }}>
      {stats.map((stat, index) => (
        <div
          key={index}
          className={`single_stat ${index === 0 ? 'stat_left' : ''}`}>
          <div className="counter-wrapper">
            <div className={`single-stat-${stat.value}`}>{stat.value}</div>
            <div>{stat.suffix}</div>
          </div>
          <p>{stat.text}</p>
        </div>
      ))}
    </div>
  );
};

export default HomeStats;

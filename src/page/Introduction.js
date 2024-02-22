import Count from "../components/Introduce-components/Count";
import LineChart from "../components/Introduce-components/LineChart";
import PieChart from "../components/Introduce-components/PieChart";
import styles from './Introduce.module.css';
import Intro from "../assets/서비스 소개(배너).png";
import Pyramid from "../components/Introduce-components/Pyramid";
import img from "../assets/소개.svg";
import img2 from "../assets/소개2.svg";
import bloon from "../assets/말풍선3.svg";
import bloon2 from "../assets/말풍선2.svg";


function Introduction() {

  return (
    <>
      <div className={styles.Introduction}>
        <div className={styles.Service}>
          <div className={styles.banner}>
            <div className={styles.bannerImg}>
              <img className={styles.serviceImg} alt='service' src={Intro} />
            </div>
            <div className={styles.bannerText}>
              <h1 className={styles.header}>서비스 소개</h1>
              <p className={styles.headerHead}>버디즈의 서비스 소개를 확인하세요!</p>
            </div>
          </div>
        </div>
        <div className={styles.Content}>
          <p>저희 서비스는 서비스를 이용하여 주변에서 <strong>함께 운동 할 친구</strong>를 찾고,<br />
            <strong>필터로 원하는 종목만 검색</strong> 할 수 있으며, 축구나 풋살 등 다인원이 필요한 운동 종목들도<br />
            <strong>채팅 서비스를 이용하여 커뮤니티를 형성을</strong> 할 수 있습니다. 또한 <strong>중고거래를 통해 비용을 절약</strong> 할 수도 있습니다.</p>
        </div>
        <div className={styles.Container}>
          <div>
            <h3 className={styles.author}>사용자 증가 추이</h3>
          </div>
          <div className={styles.LineChart}>
            <LineChart />
            <img className={styles.img} src={img} />
            <img className={styles.bloon} src={bloon} />
          </div>
          <p>
            버디즈의 사용자는 바디프로필과 코로나19의 영향으로 비만율이<br /> 증가함에 따라 점진적으로 운동을 하는 사람들이 늘어나고 있던 차에 <br />저희 사이트는 사용자 증가 추이가 상승세를 이어가고 있습니다.<br />월별로 보여지는 차트에는 버디즈의 사용자가 보여집니다.
          </p>
        </div>
        <div className={styles.PieChart}>
          <div className={styles.CountText}>
            <div className={styles.name}>
              <h3 className={styles.Other}>성별</h3>
            </div>
            <PieChart />
          </div>
          <div className={styles.CountText}>
            <div className={styles.name}>
              <h3 className={styles.Other}>채팅방 생성 수</h3>
            </div>
            <Count />
          </div>
        </div>
        <div className={styles.pyramidName}>
          <div className={styles.PyramidChart}>
            <h3 className={styles.Other}>연령대 별 분포도</h3>
          </div>
          <div className={styles.contentImg}>
            <img className={styles.bloon2} src={bloon2} />
            <img className={styles.imgTwo} src={img2} />
            <Pyramid />
          </div>
          <p>
            버디즈의 연령대 별 분포도를 나타내는 인구피라미드 차트는<br /> 최다 연령층으로는 20-30대가 제일 많이 분포되어 있으며,< br /> 그 외에도 다양한 연령층의 확보로 원하는 연령대에서<br /> 찾을 수 있는 최적의 사이트 입니다.
          </p>
        </div>

      </div>

    </>

  )
}

export default Introduction;
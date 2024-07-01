import Lottie from 'lottie-react';
import loadingLottie from '../public/lottie/animation_loading2.json';

const styles = {
  container: {
    position: 'absolute',
    width: '100%',
    height: '100vh',
    // backgroundColor: 'rgba(200, 200, 200, 0.3)',
    left: 0,
    top: 0,
    zIndex: 999999
  },
  loadingStyle: {
    position: 'absolute',
    left: '50%',
    top: '50%',
    marginTop: '-150px',
    marginLeft: '-150px',
    width: '300px',
    height: '200px'
  },
  loadingContainer: {
    position: 'absolute',
    left: '50%',
    top: '50%',
    marginTop: '-150px',
    marginLeft: '-150px',
    width: '300px',
    height: '300px'
    // transform: 'translate(-20%, -10%)'
  }
};

export default function LoadingSplash() {
  return (
    <div style={styles.container}>
      <div style={styles.loadingStyle}>
        <div style={styles.loadingContainer}>
          <Lottie animationData={loadingLottie} />
        </div>
      </div>
    </div>
  );
}

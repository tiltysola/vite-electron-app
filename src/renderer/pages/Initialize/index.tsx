import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Progress } from '@/shadcn/components/animate-ui/components/radix/progress';

import styles from './style.module.less';

const Index = () => {
  const [progress, setProgress] = useState(10);
  const navigate = useNavigate();

  useEffect(() => {
    const timer1 = setTimeout(() => {
      setProgress(50);
    }, 1000);
    const timer2 = setTimeout(() => {
      setProgress(80);
    }, 2500);
    const timer3 = setTimeout(() => {
      setProgress(95);
    }, 3500);
    const timer4 = setTimeout(() => {
      setProgress(100);
      setTimeout(() => {
        navigate('/welcome');
      }, 500);
    }, 6000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  }, [navigate]);

  return (
    <div className={styles.initialize}>
      <div className={styles.progressContainer}>
        <div className={styles.progress}>
          <Progress value={progress} />
          <div className={styles.progressText}>{progress}%</div>
        </div>
        <div className={styles.initializeText}>Initializing...</div>
      </div>
    </div>
  );
};

export default Index;

'use client';
import { useState } from 'react';
import styles from './page.module.css';

export default function Home() {
  const [lottoNumbers, setLottoNumbers] = useState<number[][]>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  const generateLottoNumbers = () => {
    setIsGenerating(true);
    
    const generateSet = () => {
      const numbers = new Set<number>();
      while (numbers.size < 6) {
        numbers.add(Math.floor(Math.random() * 45) + 1);
      }
      return Array.from(numbers).sort((a, b) => a - b);
    };

    const newSets = Array(5).fill(null).map(() => generateSet());
    setLottoNumbers(newSets);
    
    setTimeout(() => {
      setIsGenerating(false);
    }, 500);
  };

  const getNumberColor = (num: number) => {
    if (num <= 10) return styles.yellow;
    if (num <= 20) return styles.blue;
    if (num <= 30) return styles.red;
    if (num <= 40) return styles.gray;
    return styles.green;
  };

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <h1 className={styles.title}>
          <span className={styles.titleGradient}>LOTTO</span>
          <span className={styles.titleText}>번호 생성기</span>
        </h1>
        
        <button 
          onClick={generateLottoNumbers} 
          className={`${styles.button} ${isGenerating ? styles.generating : ''}`}
          disabled={isGenerating}
        >
          {isGenerating ? '생성중...' : '번호 생성하기'}
          <div className={styles.buttonGlow}></div>
        </button>

        <div className={styles.numberSets}>
          {lottoNumbers.map((set, setIndex) => (
            <div key={setIndex} className={`${styles.numberSet} ${styles.fadeIn}`}>
              <span className={styles.setLabel}>SET {setIndex + 1}</span>
              <div className={styles.numbers}>
                {set.map((number, numIndex) => (
                  <span
                    key={numIndex}
                    className={`${styles.number} ${getNumberColor(number)} ${styles.popIn}`}
                    style={{ animationDelay: `${numIndex * 0.1}s` }}
                  >
                    {number}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

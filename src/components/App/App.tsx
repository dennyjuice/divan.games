import React, { useEffect, useMemo } from 'react';
import { ThemeProvider, createTheme, Arwes, Heading } from 'arwes';

import TextScramble from 'helpers/TextScramble';
import styles from './App.module.css';

const App: React.FC = () => {
  const phrases = useMemo(
    () => ['This site', 'is under construction...', 'Coming soon', 'The Mortal Tai', 'by Divan Games'],
    [],
  );

  useEffect(() => {
    const el = document.querySelector('.scramble');
    const fx = new TextScramble(el);

    let counter = 0;
    const next = () => {
      fx.setText(phrases[counter]).then(() => {
        setTimeout(next, 1000);
      });
      counter = (counter + 1) % phrases.length;
    };

    next();
  }, [phrases]);

  return (
    <ThemeProvider theme={createTheme()}>
      <Arwes>
        <div className={styles.container} style={{ padding: 20 }}>
          <Heading node="h1" className="scramble">
            Futuristic Sci-Fi Interfaces
          </Heading>
        </div>
      </Arwes>
    </ThemeProvider>
  );
};

export default App;

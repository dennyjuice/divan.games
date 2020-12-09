import React from 'react';
// @ts-ignore
import { ThemeProvider, createTheme, Arwes, Button } from 'arwes';

function App() {
  return (
    <ThemeProvider theme={createTheme()}>
      <Arwes>
        <div style={{ padding: 20 }}>
          <Button>My Button</Button>
        </div>
      </Arwes>
    </ThemeProvider>
  );
}

export default App;

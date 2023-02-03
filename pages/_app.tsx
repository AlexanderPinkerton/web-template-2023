import '../styles/globals.css'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import type { AppProps } from 'next/app'

import React, { useState, useEffect } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { ThemeContext, ThemeNames } from '../themes';
import { darkTheme, lightTheme, getPreferredTheme, setPreferredTheme} from '../themes';
import SidebarLayout from '../layouts/SidebarLayout';
import CssBaseline from '@mui/material/CssBaseline';

import { RootStore } from "../modules/Stores/RootStore"

const rootStore = new RootStore()
export const RootStoreContext = React.createContext(rootStore);


function App({ Component, pageProps }: AppProps) {
  const [themeName, setThemeName] = useState(ThemeNames.LIGHT);

  const currentTheme = themeName === ThemeNames.DARK ? darkTheme : lightTheme

  const themeContextObj = {
    theme: currentTheme,
    toggleTheme: () => {
      if (themeName === ThemeNames.LIGHT){
        setPreferredTheme(ThemeNames.DARK)
        setThemeName(ThemeNames.DARK)
      }else{
        setPreferredTheme(ThemeNames.LIGHT)
        setThemeName(ThemeNames.LIGHT)
      }
    },
  }

  useEffect(() => {

    async function setInitialTheme() {
      let existingTheme = await getPreferredTheme()
      if (existingTheme && existingTheme.name === ThemeNames.DARK) {
        setThemeName(ThemeNames.DARK)
      } else {
        setThemeName(ThemeNames.LIGHT)
      }
    }

    setInitialTheme()

  }, []);


  return (
    <ThemeContext.Provider value={themeContextObj}>
      <ThemeProvider theme={currentTheme}>
      <CssBaseline />
        <SidebarLayout>
          <Component {...pageProps} />
        </SidebarLayout>
      </ThemeProvider>
    </ThemeContext.Provider>
  )

}

export default App
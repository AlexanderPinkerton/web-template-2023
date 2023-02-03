import * as React from 'react';
import { createTheme, Theme } from '@mui/material/styles';
import { green } from '@mui/material/colors';
import { alpha } from "@mui/material";
import { APP_NAME } from './constants';

// Since we are using typescript, we need to augment the theme class if we want to add more variables
// The default theme is actually pretty comprehensive
declare module '@mui/material/styles' {
    interface Theme {
        status: {
            danger: string; // Add a custom danger var to our theme
        },
        name: ThemeNames
    }
    // allow configuration using `createTheme`
    interface ThemeOptions {
        status?: {
            danger?: string;
        },
        name: ThemeNames
    }
    interface Palette {
        brandColors: BrandColorPaletteColors;
    }
    interface PaletteOptions {
        brandColors: BrandColorPaletteColors;
    }
    interface BrandColorPaletteColors {
        grassGreen: string;
        errorRed: string;
        acidGreen: string;
        warningOrange: string;
        lightBluePrimary: string;
        mainGradient: string;
    }
}

const brandColors = {
    grassGreen: '#7BC36E',
    errorRed: '#CF4E4E',
    acidGreen: '#C9DA2B',
    warningOrange: '#FFB84D',
    lightBluePrimary: '#90CAF9',
    gradientBlueLeft: "#0069D3",
    gradientBlueRight: "#0038A8",
    mainGradient: 'linear-gradient(45deg, #0069D3, #0038A8)',
    darkGradient: 'linear-gradient(45deg, #000000, #0038A8)',
}

export const enum ThemeNames {
    DARK = 'dark',
    LIGHT = 'light',
}

export const lightTheme = createTheme({
    name: ThemeNames.LIGHT,
    palette: {
        primary: {
            main: brandColors.gradientBlueLeft
        },
        secondary: {
            main: "#FF00FF"
        },
        background: {
            default: "#FAFAFA"
        },
        text: {
            primary: "#121212"
        },
        brandColors: brandColors
    },
    status: {
        danger: 'red',
    },
});

export const darkTheme = createTheme({
    name: ThemeNames.DARK,
    palette: {
        mode: 'dark',
        primary: {
            main: brandColors.acidGreen
        },
        secondary: {
            main: green[500],
        },
        background: {
            default: alpha("#121212",0.87)
        },
        text: {
            primary: alpha("#ffffff",0.7)
        },
        brandColors: brandColors
    },
    status: {
        danger: 'red',
    },
});

export const themeMap = new Map<ThemeNames, Theme>([
    [ThemeNames.DARK, darkTheme],
    [ThemeNames.LIGHT, lightTheme]
])


let defaultThemeObj = {
    theme: darkTheme,
    toggleTheme: () => { console.error("Theme context was not initialized properly.") },
}

export const ThemeContext = React.createContext(defaultThemeObj);

//----

import { IDBStorage } from "./modules/IDBStorage"

export async function getPreferredTheme() {
    try {
        const newConn = await IDBStorage.new(APP_NAME, 'default', ['default'], 1)
        let existingTheme = await newConn.get("theme")
        if (!existingTheme) {
            console.log("Defaulting last theme to: ", ThemeNames.LIGHT)
            return themeMap.get(ThemeNames.LIGHT)
        }
        console.log("Using last theme: ", existingTheme)
        return themeMap.get(existingTheme)
    } catch (error) {
        return lightTheme
    }
}

export async function setPreferredTheme(themeName: ThemeNames) {
    try {
        const newConn = await IDBStorage.new(APP_NAME, 'default', ['default'], 1)
        newConn.set("theme", themeName)
        console.log("Updating preferred theme to", themeName)
    } catch (error) {
        console.error("Unable to save the preferred theme.")
    }
}
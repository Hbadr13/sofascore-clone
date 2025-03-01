import type { Config } from "tailwindcss";
import { nextui } from "@nextui-org/react";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",

  ],
  theme: {
    extend: {
      keyframes: {
        expand: {
          '0%': { height: '100px', width: '300px' },
          '20%': { height: '200px', width: '300px' },
          '100%': { height: '600px', width: '300px' },
        },
        disappear: {
          '0%': { height: '600px', width: '300px' },
          '20%': { height: '500px', width: '300px' },
          '100%': { height: '300px', width: '300px' },
        },
        moveIn: {
          '0%': { height: '600px', width: '300px' },
          '20%': { height: '500px', width: '300px' },
          '100%': { height: '100px', width: '300px' },
        },
      },
      animation: {
        expand: 'expand 0.3s ease-in-out forwards',
        disappear: 'disappear 0.2s ease-in-out forwards',
        moveIn: 'moveIn 0.5s ease-in-out forwards',
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontFamily: {
        sofascore: ["Sofascore", "sans-serif"],
      },
      screens: {
        'desktop': '1344px',
        'tablet': '992px',

      },
      backgroundColor: {
        'custom-default-hover': '#f5f6f9',
        'surface-s2': 'rgba(229, 233, 239, 0.4)',
        'on-surface-nLv1': '#222226',
        'primary-default': '#374df5',
        'primary-variant': '#2c3ec4'
      },
      textColor: {
        'on-surface-nLv1': '#222226'
      },
      colors: {
        'primary-default': '#374df5',
        'primary-variant': '#2c3ec4',
        'primary-highlight': 'rgba(55, 77, 245, 0.25)',
        'primary-hover': 'hsl(233, 90.5%, 63.8%)',
        'primary-selected': 'hsl(233, 90.5%, 53.8%)',
        'secondary-default': '#0bb32a',
        'secondary-variant': '#08861f',
        'secondary-highlight': 'rgba(11, 179, 42, 0.25)',
        'secondary-hover': 'hsl(131, 88.4%, 42.3%)',
        'secondary-selected': 'hsl(131, 88.4%, 32.3%)',
        'neutral-default': '#a4a9b3',
        'neutral-variant': '#51565f',
        'neutral-highlight': '#e8ecf3',
        'on-color-primary': '#ffffff',
        'on-color-secondary': 'rgba(255, 255, 255, 0.6)',
        'on-color-highlight-nLv1': 'rgba(255, 255, 255, 0.2)',
        'on-color-highlight-nLv2': 'rgba(255, 255, 255, 0.1)',
        'on-color-default': '#ffffff',
        'on-color-hover': '#e6e6e6',
        'on-color-selected': '#cccccc',
        'surface-s0': '#edf1f6',
        'surface-s1': '#ffffff',
        'surface-s2': 'rgba(229, 233, 239, 0.4)',
        'surface-sp': '#ffffff',
        'on-surface-nLv1': '#222226',
        'on-surface-nLv2': 'rgba(34, 34, 38, 0.7)',
        'on-surface-nLv3': 'rgba(34, 34, 38, 0.45)',
        'on-surface-nLv4': 'rgba(34, 34, 38, 0.15)',
        'on-surface-nLv5': 'rgba(34, 34, 38, 0.06)',
        'error-default': '#c7361f',
        'error-hover': '#dd3c23',
        'error-selected': '#b1301c',
        'alert-default': '#c7921f',
        'alert-hover': '#dda223',
        'alert-selected': '#b1821c',
        'success-default': '#15b168',
        'success-hover': '#18c876',
        'success-selected': '#129a5b',
        'effect-elevation': 'rgba(34, 34, 38, 0.08)',
        'overlay-darken1': 'rgba(0, 0, 0, 0.25)',
        'overlay-darken2': 'rgba(0, 0, 0, 0.5)',
        'overlay-darken3': 'rgba(0, 0, 0, 0.65)',
        'sofa-singles-live': '#cb1818',
        'sofa-singles-value': '#e59c03',
        'sofa-singles-liveHighlight': 'rgba(203, 24, 24, 0.1)',
        'sofa-singles-crowdsourcingLive': '#ff109f',
        'sofa-singles-crowdsourcingLiveHighlight': 'rgba(255, 16, 159, 0.1)',
        'score-rating-s00': '#a4a9b3',
        'score-rating-s10': '#dc0c00',
        'score-rating-s60': '#ed7e07',
        'score-rating-s65': '#d9af00',
        'score-rating-s70': '#00c424',
        'score-rating-s80': '#00adc4',
        'score-rating-s90': '#374df5',
        'playoffs-promotion-to-x': '#26943b',
        'playoffs-promotion-to-x-playoff': '#49cb40',
        'playoffs-promotion-to-y': '#0056a3',
        'playoffs-promotion-to-y-playoff': '#0a8dff',
        'playoffs-promotion-to-z': '#016565',
        'playoffs-promotion-to-z-playoff': '#018e8d',
        'playoffs-promotion-to-z-playoff-secondary': '#01b7b6',
        'playoffs-promotion-to-relegation': '#c1262d',
        'playoffs-promotion-to-relegation-playoff': '#fea500',
        'player-position-forward': '#cb1818',
        'player-position-midfield': '#0bb32a',
        'player-position-defender': '#374df5',
        'player-position-goalkeeper': '#e59c03',
        'heatmap-hm1': '#cbedbf',
        'heatmap-hm2': '#d5eb86',
        'heatmap-hm3': '#fffc20',
        'heatmap-hm4': '#ff8111',
        'heatmap-hm5': '#ff1f1f',
        'stage-sports-dtm': '#011c47',
        'stage-sports-formula1': '#dc351e',
        'stage-sports-formulaE': '#04afe7',
        'stage-sports-indycar': '#c61e36',
        'stage-sports-moto2': '#84273a',
        'stage-sports-moto3': '#832639',
        'stage-sports-motoGP': '#3b3536',
        'stage-sports-nascar': '#007ac2',
        'stage-sports-superbike': '#bd1f23',
        'stage-sports-wrc': '#7bad26',
        'stage-sports-cycling': '#0162af',
        'stage-sports-generic': '#03af37',
        'graphics-terrain-football': '#cbedbf',
        'graphics-terrain-basketball': '#f8d496',
        'graphics-terrain-dark': '#19191c',
        'graphics-terrain-footballPale': '#f5fbf2',
        'graphics-terrain-basketballPale': '#fef6ea',
        'terrain-harcourtIndoor': '#30b8ab',
        'terrain-hardcourtOutdoor': '#5143cc',
        'terrain-grass': '#62bd40',
        'terrain-clay': '#eb9a44',
        'terrain-default': '#808080',
        'tournaments-wta': '#a42090',
        'social-twitter': '#00acee',
        'cricket-neutral': '#a4a9b3',
        'cricket-singleRuns': '#6aac44',
        'cricket-firstCircleRuns': '#4d82a1',
        'cricket-secondCircleRuns': '#98458c',
        'cricket-wicketsDown': '#b8483c',
        'cricket-errorsAndMistakes': '#be9b3c',
        'cricket-cricketTerrain': '#cbedbf',
        'cricket-cricketTerrainSecondary': '#166534',
        'cricket-dsr': '#5a539c',
        'sentiment-positive': '#0bb32a',
        'sentiment-negative': '#cb1818',
        'header-default': '#2c3ec4',
        'mma-red-default': '#ce153a',
        'mma-red-highlight': 'rgba(206, 21, 58, 0.15)',
        'mma-blue-default': '#1258df',
        'mma-blue-highlight': 'rgba(18, 88, 223, 0.15)',
        'football-shotmap-home-idle': '#05660f',
        'football-shotmap-home-selectedHover': '#0bb32a',
        'football-shotmap-away-idle': '#064683',
        'football-shotmap-away-selectedHover': '#374df5',
        'hockey-shotmap-shot-background': '#ffffff80',
      },
    },
  },
  darkMode: "class",
  plugins: [nextui()]
};
export default config;

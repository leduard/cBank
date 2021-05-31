import 'styled-components/native';

declare module 'styled-components/native' {
  export interface DefaultTheme {
    name: string;

    background: string;
    primaryColor: string;
    secondaryColor: string;
    textColor: string;

    red: string;
    green: string;
    yellow: string;
    white: string;
  }
}

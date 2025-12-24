
export type CardTheme = 'Classic' | 'Futuristic' | 'Minimalist' | 'Party' | 'Elegant';

export interface BirthdayInfo {
  name: string;
  age: number;
  theme: CardTheme;
  hobbies: string;
  relationship: string;
}

export interface CardContent {
  title: string;
  wish: string;
  poem: string;
  message: string;
}

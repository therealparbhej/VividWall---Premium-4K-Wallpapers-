export interface Wallpaper {
  id: string;
  url: string;
  thumbnail: string;
  title: string;
  author: string;
  authorUrl: string;
  categories: string[];
  description?: string;
  dimensions: {
    width: number;
    height: number;
  };
}

export type Category = 
  | 'All' 
  | 'Nature' 
  | 'Architecture' 
  | 'Abstract' 
  | 'Minimalist' 
  | 'Cyberpunk' 
  | 'Aerial' 
  | 'Space';

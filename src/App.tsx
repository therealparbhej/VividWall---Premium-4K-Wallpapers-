/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, 
  Menu, 
  Download, 
  Heart, 
  Share2, 
  Info, 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Maximize2, 
  SlidersHorizontal,
  Sparkles,
  Palette,
  Eye,
  Github
} from 'lucide-react';
import { cn } from './lib/utils';
import { Wallpaper, Category } from './types';

// Initial curated wallpapers
const INITIAL_WALLPAPERS: Wallpaper[] = [
  // Nature (10)
  { id: 'n1', url: 'https://images.unsplash.com/photo-1477346611705-65d1883cee1e?auto=format&fit=crop&q=80&w=2000', thumbnail: 'https://images.unsplash.com/photo-1477346611705-65d1883cee1e?auto=format&fit=crop&q=80&w=600', title: 'Alpine Dusk', author: 'Eberhard Grossgasteiger', authorUrl: 'https://unsplash.com/@eberhardgross', categories: ['Nature', 'All'], dimensions: { width: 4000, height: 6000 } },
  { id: 'n2', url: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=2000', thumbnail: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=600', title: 'Emerald Peak', author: 'Kal Visu', authorUrl: 'https://unsplash.com/@kalvisuals', categories: ['Nature', 'All'], dimensions: { width: 5472, height: 3648 } },
  { id: 'n3', url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=80&w=2000', thumbnail: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=80&w=600', title: 'Valley of Mist', author: 'Aeronautics', authorUrl: 'https://unsplash.com/@aeronautics', categories: ['Nature', 'All'], dimensions: { width: 5000, height: 3333 } },
  { id: 'n4', url: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&q=80&w=2000', thumbnail: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&q=80&w=600', title: 'Deep Forest', author: 'Bobby Noel', authorUrl: 'https://unsplash.com/@bobby', categories: ['Nature', 'All'], dimensions: { width: 4000, height: 6000 } },
  { id: 'n5', url: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&q=80&w=2000', thumbnail: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&q=80&w=600', title: 'Morning Fog', author: 'V2osk', authorUrl: 'https://unsplash.com/@v2osk', categories: ['Nature', 'All'], dimensions: { width: 5000, height: 3000 } },
  { id: 'n6', url: 'https://images.unsplash.com/photo-1426604966848-d7adac402bdb?auto=format&fit=crop&q=80&w=2000', thumbnail: 'https://images.unsplash.com/photo-1426604966848-d7adac402bdb?auto=format&fit=crop&q=80&w=600', title: 'Mountain Lake', author: 'Luca Bravo', authorUrl: 'https://unsplash.com/@lucabravo', categories: ['Nature', 'All'], dimensions: { width: 4000, height: 2667 } },
  { id: 'n7', url: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&q=80&w=2000', thumbnail: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&q=80&w=600', title: 'Green Hills', author: 'Qingbao Meng', authorUrl: 'https://unsplash.com/@qingbao', categories: ['Nature', 'All'], dimensions: { width: 5000, height: 3000 } },
  { id: 'n8', url: 'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?auto=format&fit=crop&q=80&w=2000', thumbnail: 'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?auto=format&fit=crop&q=80&w=600', title: 'Autumn Trail', author: 'Luke Woods', authorUrl: 'https://unsplash.com/@lukewoods', categories: ['Nature', 'All'], dimensions: { width: 4000, height: 6000 } },
  { id: 'n9', url: 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?auto=format&fit=crop&q=80&w=2000', thumbnail: 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?auto=format&fit=crop&q=80&w=600', title: 'Rolling Plains', author: 'Filip Zrnzević', authorUrl: 'https://unsplash.com/@filipz', categories: ['Nature', 'All'], dimensions: { width: 5000, height: 3333 } },
  { id: 'n10', url: 'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?auto=format&fit=crop&q=80&w=2000', thumbnail: 'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?auto=format&fit=crop&q=80&w=600', title: 'Galactic Horizon', author: 'Vincentiu Solomon', authorUrl: 'https://unsplash.com/@vincentiu', categories: ['Nature', 'All'], dimensions: { width: 4000, height: 2667 } },

  // Architecture (10)
  { id: 'ar1', url: 'https://images.unsplash.com/photo-1449156059279-7fda06daff81?auto=format&fit=crop&q=80&w=2000', thumbnail: 'https://images.unsplash.com/photo-1449156059279-7fda06daff81?auto=format&fit=crop&q=80&w=600', title: 'Midnight City', author: 'Lerone Pieters', authorUrl: 'https://unsplash.com/@eyeofre', categories: ['Architecture', 'All'], dimensions: { width: 5000, height: 3000 } },
  { id: 'ar2', url: 'https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&q=80&w=2000', thumbnail: 'https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&q=80&w=600', title: 'Brutalist Void', author: 'Riccardo Chiarini', authorUrl: 'https://unsplash.com/@riccardochiarini', categories: ['Architecture', 'All'], dimensions: { width: 4000, height: 2500 } },
  { id: 'ar3', url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=2000', thumbnail: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=600', title: 'Glass Tower', author: 'Joel Filipe', authorUrl: 'https://unsplash.com/@joelfilipe', categories: ['Architecture', 'All'], dimensions: { width: 5000, height: 3333 } },
  { id: 'ar4', url: 'https://images.unsplash.com/photo-1448317889437-01819e56535b?auto=format&fit=crop&q=80&w=2000', thumbnail: 'https://images.unsplash.com/photo-1448317889437-01819e56535b?auto=format&fit=crop&q=80&w=600', title: 'Modern Lines', author: 'Faustino', authorUrl: 'https://unsplash.com/@faustino', categories: ['Architecture', 'All'], dimensions: { width: 4000, height: 2667 } },
  { id: 'ar5', url: 'https://images.unsplash.com/photo-1515263487990-61b07816b324?auto=format&fit=crop&q=80&w=2000', thumbnail: 'https://images.unsplash.com/photo-1515263487990-61b07816b324?auto=format&fit=crop&q=80&w=600', title: 'Blue Facade', author: 'Sander Weeteling', authorUrl: 'https://unsplash.com/@sanderweeteling', categories: ['Architecture', 'All'], dimensions: { width: 5000, height: 3333 } },
  { id: 'ar6', url: 'https://images.unsplash.com/photo-1503387762-592be5a52680?auto=format&fit=crop&q=80&w=2000', thumbnail: 'https://images.unsplash.com/photo-1503387762-592be5a52680?auto=format&fit=crop&q=80&w=600', title: 'Concrete Curve', author: 'Simone Hutsch', authorUrl: 'https://unsplash.com/@simone', categories: ['Architecture', 'All'], dimensions: { width: 4000, height: 5000 } },
  { id: 'ar7', url: 'https://images.unsplash.com/photo-1492321936769-b49830bc1d1e?auto=format&fit=crop&q=80&w=2000', thumbnail: 'https://images.unsplash.com/photo-1492321936769-b49830bc1d1e?auto=format&fit=crop&q=80&w=600', title: 'Urban Symmetry', author: 'Alex Wong', authorUrl: 'https://unsplash.com/@alexwong', categories: ['Architecture', 'All'], dimensions: { width: 5000, height: 3333 } },
  { id: 'ar8', url: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&q=80&w=2000', thumbnail: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&q=80&w=600', title: 'Golden Hour Sky', author: 'Lance Asper', authorUrl: 'https://unsplash.com/@lanceasper', categories: ['Architecture', 'All'], dimensions: { width: 4000, height: 2667 } },
  { id: 'ar9', url: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=2000', thumbnail: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=600', title: 'High Rise', author: 'Jacek Dylag', authorUrl: 'https://unsplash.com/@jacekdylag', categories: ['Architecture', 'All'], dimensions: { width: 5000, height: 3333 } },
  { id: 'ar10', url: 'https://images.unsplash.com/photo-1479839672679-a46483c0e7c8?auto=format&fit=crop&q=80&w=2000', thumbnail: 'https://images.unsplash.com/photo-1479839672679-a46483c0e7c8?auto=format&fit=crop&q=80&w=600', title: 'Stone Arch', author: 'Ilya Pavlov', authorUrl: 'https://unsplash.com/@ilyapavlov', categories: ['Architecture', 'All'], dimensions: { width: 4000, height: 2667 } },

  // Abstract (10)
  { id: 'ab1', url: 'https://images.unsplash.com/photo-1534067783941-51c9c23ecefd?auto=format&fit=crop&q=80&w=2000', thumbnail: 'https://images.unsplash.com/photo-1534067783941-51c9c23ecefd?auto=format&fit=crop&q=80&w=600', title: 'Nebula Drift', author: 'Casey Horner', authorUrl: 'https://unsplash.com/@m_x_g', categories: ['Abstract', 'All'], dimensions: { width: 2000, height: 3000 } },
  { id: 'ab2', url: 'https://images.unsplash.com/photo-1511300636408-a63a89df3482?auto=format&fit=crop&q=80&w=2000', thumbnail: 'https://images.unsplash.com/photo-1511300636408-a63a89df3482?auto=format&fit=crop&q=80&w=600', title: 'Warm Abstract', author: 'Johannes Plenio', authorUrl: 'https://unsplash.com/@jplenio', categories: ['Abstract', 'All'], dimensions: { width: 4500, height: 3000 } },
  { id: 'ab3', url: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&q=80&w=2000', thumbnail: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&q=80&w=600', title: 'Vibrant Flow', author: 'Paweł Czerwiński', authorUrl: 'https://unsplash.com/@pawel_czerwinski', categories: ['Abstract', 'All'], dimensions: { width: 5000, height: 3333 } },
  { id: 'ab4', url: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&q=80&w=2000', thumbnail: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&q=80&w=600', title: 'Dark Waves', author: 'P. Czerwiński', authorUrl: 'https://unsplash.com/@pawel', categories: ['Abstract', 'All'], dimensions: { width: 4000, height: 2667 } },
  { id: 'ab5', url: 'https://images.unsplash.com/photo-1549490349-8643362247b5?auto=format&fit=crop&q=80&w=2000', thumbnail: 'https://images.unsplash.com/photo-1549490349-8643362247b5?auto=format&fit=crop&q=80&w=600', title: 'Fluid Marble', author: 'Joel Filipe', authorUrl: 'https://unsplash.com/@joel', categories: ['Abstract', 'All'], dimensions: { width: 5000, height: 3333 } },
  { id: 'ab6', url: 'https://images.unsplash.com/photo-1557683316-973673baf926?auto=format&fit=crop&q=80&w=2000', thumbnail: 'https://images.unsplash.com/photo-1557683316-973673baf926?auto=format&fit=crop&q=80&w=600', title: 'Spectrum Gradient', author: 'Katia De Juan', authorUrl: 'https://unsplash.com/@katia', categories: ['Abstract', 'All'], dimensions: { width: 4000, height: 2667 } },
  { id: 'ab7', url: 'https://images.unsplash.com/photo-1490730141103-6cac27aaab94?auto=format&fit=crop&q=80&w=2000', thumbnail: 'https://images.unsplash.com/photo-1490730141103-6cac27aaab94?auto=format&fit=crop&q=80&w=600', title: 'Color Burst', author: 'Alex Perez', authorUrl: 'https://unsplash.com/@alexperez', categories: ['Abstract', 'All'], dimensions: { width: 5000, height: 3333 } },
  { id: 'ab8', url: 'https://images.unsplash.com/photo-1502691876148-a84978e59af8?auto=format&fit=crop&q=80&w=2000', thumbnail: 'https://images.unsplash.com/photo-1502691876148-a84978e59af8?auto=format&fit=crop&q=80&w=600', title: 'Light Trails', author: 'Markus Spiske', authorUrl: 'https://unsplash.com/@markus', categories: ['Abstract', 'All'], dimensions: { width: 4000, height: 2667 } },
  { id: 'ab9', url: 'https://images.unsplash.com/photo-1567095761054-7a02e69e5c43?auto=format&fit=crop&q=80&w=2000', thumbnail: 'https://images.unsplash.com/photo-1567095761054-7a02e69e5c43?auto=format&fit=crop&q=80&w=600', title: 'Oil Texture', author: 'Lucas Benjamin', authorUrl: 'https://unsplash.com/@lucas', categories: ['Abstract', 'All'], dimensions: { width: 5000, height: 3333 } },
  { id: 'ab10', url: 'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?auto=format&fit=crop&q=80&w=2000', thumbnail: 'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?auto=format&fit=crop&q=80&w=600', title: 'Abstract Lines', author: 'Efe Kurnaz', authorUrl: 'https://unsplash.com/@efekurnaz', categories: ['Abstract', 'All'], dimensions: { width: 4000, height: 2667 } },

  // Minimalist (10)
  { id: 'm1', url: 'https://images.unsplash.com/photo-1502657877623-f66bf489d236?auto=format&fit=crop&q=80&w=2000', thumbnail: 'https://images.unsplash.com/photo-1502657877623-f66bf489d236?auto=format&fit=crop&q=80&w=600', title: 'Zen Symmetry', author: 'Simon Matzinger', authorUrl: 'https://unsplash.com/@8moments', categories: ['Minimalist', 'All'], dimensions: { width: 3000, height: 2000 } },
  { id: 'm2', url: 'https://images.unsplash.com/photo-1493246507139-91e8bef99c02?auto=format&fit=crop&q=80&w=2000', thumbnail: 'https://images.unsplash.com/photo-1493246507139-91e8bef99c02?auto=format&fit=crop&q=80&w=600', title: 'Glacier Lake', author: 'Nathan Anderson', authorUrl: 'https://unsplash.com/@nathananderson', categories: ['Minimalist', 'All'], dimensions: { width: 4000, height: 6000 } },
  { id: 'm3', url: 'https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?auto=format&fit=crop&q=80&w=2000', thumbnail: 'https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?auto=format&fit=crop&q=80&w=600', title: 'Silent Peaks', author: 'Felipe Valduga', authorUrl: 'https://unsplash.com/@felipevalduga', categories: ['Minimalist', 'All'], dimensions: { width: 5000, height: 3333 } },
  { id: 'm4', url: 'https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?auto=format&fit=crop&q=80&w=2000', thumbnail: 'https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?auto=format&fit=crop&q=80&w=600', title: 'White Sphere', author: 'Kim Baile', authorUrl: 'https://unsplash.com/@kim', categories: ['Minimalist', 'All'], dimensions: { width: 4000, height: 2667 } },
  { id: 'm5', url: 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&q=80&w=2000', thumbnail: 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&q=80&w=600', title: 'Bloom', author: 'S. Plenio', authorUrl: 'https://unsplash.com/@jplenio', categories: ['Minimalist', 'All'], dimensions: { width: 5000, height: 3333 } },
  { id: 'm6', url: 'https://images.unsplash.com/photo-1476820865390-c59aeeb9e104?auto=format&fit=crop&q=80&w=2000', thumbnail: 'https://images.unsplash.com/photo-1476820865390-c59aeeb9e104?auto=format&fit=crop&q=80&w=600', title: 'Lone Tree', author: 'Aaron Burden', authorUrl: 'https://unsplash.com/@aaron', categories: ['Minimalist', 'All'], dimensions: { width: 4000, height: 2667 } },
  { id: 'm7', url: 'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&q=80&w=2000', thumbnail: 'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&q=80&w=600', title: 'Quiet Lake', author: 'Jerry Zhang', authorUrl: 'https://unsplash.com/@jerry', categories: ['Minimalist', 'All'], dimensions: { width: 5000, height: 3333 } },
  { id: 'm8', url: 'https://images.unsplash.com/photo-1500628550463-c8881a54d4d4?auto=format&fit=crop&q=80&w=2000', thumbnail: 'https://images.unsplash.com/photo-1500628550463-c8881a54d4d4?auto=format&fit=crop&q=80&w=600', title: 'Soft Horizon', author: 'Dan Gold', authorUrl: 'https://unsplash.com/@dangold', categories: ['Minimalist', 'All'], dimensions: { width: 4000, height: 2667 } },
  { id: 'm9', url: 'https://images.unsplash.com/photo-1433086566005-c7f354a440df?auto=format&fit=crop&q=80&w=2000', thumbnail: 'https://images.unsplash.com/photo-1433086566005-c7f354a440df?auto=format&fit=crop&q=80&w=600', title: 'Glass Pure', author: 'K. Juan', authorUrl: 'https://unsplash.com/@katia', categories: ['Minimalist', 'All'], dimensions: { width: 5000, height: 3333 } },
  { id: 'm10', url: 'https://images.unsplash.com/photo-1464802686167-b939a67e0524?auto=format&fit=crop&q=80&w=2000', thumbnail: 'https://images.unsplash.com/photo-1464802686167-b939a67e0524?auto=format&fit=crop&q=80&w=600', title: 'Sand Ripple', author: 'Jeremy Bishop', authorUrl: 'https://unsplash.com/@jeremy', categories: ['Minimalist', 'All'], dimensions: { width: 4000, height: 2667 } },

  // Cyberpunk (10)
  { id: 'c1', url: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=2000', thumbnail: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=600', title: 'Synthetic Future', author: 'Gabriel Heinzer', authorUrl: 'https://unsplash.com/@6heinz3r', categories: ['Cyberpunk', 'All'], dimensions: { width: 4000, height: 2667 } },
  { id: 'c2', url: 'https://images.unsplash.com/photo-1605142859862-978be7eba909?auto=format&fit=crop&q=80&w=2000', thumbnail: 'https://images.unsplash.com/photo-1605142859862-978be7eba909?auto=format&fit=crop&q=80&w=600', title: 'Neon Alley', author: 'Toni Hukkanen', authorUrl: 'https://unsplash.com/@toni', categories: ['Cyberpunk', 'All'], dimensions: { width: 5000, height: 3333 } },
  { id: 'c3', url: 'https://images.unsplash.com/photo-1614728263952-84ea256f9679?auto=format&fit=crop&q=80&w=2000', thumbnail: 'https://images.unsplash.com/photo-1614728263952-84ea256f9679?auto=format&fit=crop&q=80&w=600', title: 'Cyber City', author: 'Liam Read', authorUrl: 'https://unsplash.com/@liamread', categories: ['Cyberpunk', 'All'], dimensions: { width: 4000, height: 2667 } },
  { id: 'c4', url: 'https://images.unsplash.com/photo-1542641728-6ca359b085f4?auto=format&fit=crop&q=80&w=2000', thumbnail: 'https://images.unsplash.com/photo-1542641728-6ca359b085f4?auto=format&fit=crop&q=80&w=600', title: 'Pink Glow', author: 'Zhane', authorUrl: 'https://unsplash.com/@zhane', categories: ['Cyberpunk', 'All'], dimensions: { width: 5000, height: 3333 } },
  { id: 'c5', url: 'https://images.unsplash.com/photo-1545641203-7d072a14e3b2?auto=format&fit=crop&q=80&w=2000', thumbnail: 'https://images.unsplash.com/photo-1545641203-7d072a14e3b2?auto=format&fit=crop&q=80&w=600', title: 'Retro Pulse', author: 'M. Horner', authorUrl: 'https://unsplash.com/@horner', categories: ['Cyberpunk', 'All'], dimensions: { width: 4000, height: 2667 } },
  { id: 'c6', url: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&q=80&w=2000', thumbnail: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&q=80&w=600', title: 'Digital Rain', author: 'K. Spiske', authorUrl: 'https://unsplash.com/@markus', categories: ['Cyberpunk', 'All'], dimensions: { width: 5000, height: 3333 } },
  { id: 'c7', url: 'https://images.unsplash.com/photo-1614728263952-84ea256f9679?auto=format&fit=crop&q=80&w=2000', thumbnail: 'https://images.unsplash.com/photo-1614728263952-84ea256f9679?auto=format&fit=crop&q=80&w=600', title: 'Tokyo Night', author: 'Jezael', authorUrl: 'https://unsplash.com/@jezael', categories: ['Cyberpunk', 'All'], dimensions: { width: 4000, height: 2667 } },
  { id: 'c8', url: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&q=80&w=2000', thumbnail: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&q=80&w=600', title: 'Electric Vibe', author: 'Fabio', authorUrl: 'https://unsplash.com/@fabio', categories: ['Cyberpunk', 'All'], dimensions: { width: 5000, height: 3333 } },
  { id: 'c9', url: 'https://images.unsplash.com/photo-1576400883215-7083980b8a93?auto=format&fit=crop&q=80&w=2000', thumbnail: 'https://images.unsplash.com/photo-1576400883215-7083980b8a93?auto=format&fit=crop&q=80&w=600', title: 'Data Stream', author: 'A. Chiarini', authorUrl: 'https://unsplash.com/@riccardo', categories: ['Cyberpunk', 'All'], dimensions: { width: 4000, height: 2667 } },
  { id: 'c10', url: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&q=80&w=2000', thumbnail: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&q=80&w=600', title: 'Glitch Sky', author: 'Toni H.', authorUrl: 'https://unsplash.com/@toni', categories: ['Cyberpunk', 'All'], dimensions: { width: 5000, height: 3333 } },

  // Space (10)
  { id: 's1', url: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&q=80&w=2000', thumbnail: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&q=80&w=600', title: 'Stellar Night', author: 'Benjamin Voros', authorUrl: 'https://unsplash.com/@vorosbenjamin', categories: ['Space', 'All'], dimensions: { width: 5000, height: 3000 } },
  { id: 's2', url: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&q=80&w=2000', thumbnail: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&q=80&w=600', title: 'Orbit View', author: 'NASA', authorUrl: 'https://unsplash.com/@nasa', categories: ['Space', 'All'], dimensions: { width: 4000, height: 2667 } },
  { id: 's3', url: 'https://images.unsplash.com/photo-1464802686167-b939a67e0524?auto=format&fit=crop&q=80&w=2000', thumbnail: 'https://images.unsplash.com/photo-1464802686167-b939a67e0524?auto=format&fit=crop&q=80&w=600', title: 'Deep Space', author: 'Jeremy Bishop', authorUrl: 'https://unsplash.com/@jeremy', categories: ['Space', 'All'], dimensions: { width: 5000, height: 3333 } },
  { id: 's4', url: 'https://images.unsplash.com/photo-1506318137071-a8e063b4b57d?auto=format&fit=crop&q=80&w=2000', thumbnail: 'https://images.unsplash.com/photo-1506318137071-a8e063b4b57d?auto=format&fit=crop&q=80&w=600', title: 'Supernova', author: 'S. Solomon', authorUrl: 'https://unsplash.com/@solomon', categories: ['Space', 'All'], dimensions: { width: 4000, height: 2667 } },
  { id: 's5', url: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=2000', thumbnail: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=600', title: 'Earth Glow', author: 'NASA', authorUrl: 'https://unsplash.com/@nasa', categories: ['Space', 'All'], dimensions: { width: 5000, height: 3333 } },
  { id: 's6', url: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&q=80&w=2000', thumbnail: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&q=80&w=600', title: 'Cosmic Dust', author: 'Cas Horner', authorUrl: 'https://unsplash.com/@m_x_g', categories: ['Space', 'All'], dimensions: { width: 4000, height: 2667 } },
  { id: 's7', url: 'https://images.unsplash.com/photo-1516339901601-2e1b62dc0c45?auto=format&fit=crop&q=80&w=2000', thumbnail: 'https://images.unsplash.com/photo-1516339901601-2e1b62dc0c45?auto=format&fit=crop&q=80&w=600', title: 'Andromeda', author: 'F. Zrnzević', authorUrl: 'https://unsplash.com/@filipz', categories: ['Space', 'All'], dimensions: { width: 5000, height: 3333 } },
  { id: 's8', url: 'https://images.unsplash.com/photo-1531259683007-016a7b628fc3?auto=format&fit=crop&q=80&w=2000', thumbnail: 'https://images.unsplash.com/photo-1531259683007-016a7b628fc3?auto=format&fit=crop&q=80&w=600', title: 'Stellar Wind', author: 'E. Gross', authorUrl: 'https://unsplash.com/@eberhard', categories: ['Space', 'All'], dimensions: { width: 4000, height: 2667 } },
  { id: 's9', url: 'https://images.unsplash.com/photo-1446776856084-929f27ed28c2?auto=format&fit=crop&q=80&w=2000', thumbnail: 'https://images.unsplash.com/photo-1446776856084-929f27ed28c2?auto=format&fit=crop&q=80&w=600', title: 'Space Station', author: 'NASA', authorUrl: 'https://unsplash.com/@nasa', categories: ['Space', 'All'], dimensions: { width: 5000, height: 3333 } },
  { id: 's10', url: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&q=80&w=2000', thumbnail: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&q=80&w=600', title: 'Solar Flare', author: 'NASA', authorUrl: 'https://unsplash.com/@nasa', categories: ['Space', 'All'], dimensions: { width: 4000, height: 2667 } },

  // Aerial (10)
  { id: 'ae1', url: 'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?auto=format&fit=crop&q=80&w=2000', thumbnail: 'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?auto=format&fit=crop&q=80&w=600', title: 'Aerial Peaks', author: 'V. Solomon', authorUrl: 'https://unsplash.com/@vincentiu', categories: ['Aerial', 'All'], dimensions: { width: 4000, height: 2667 } },
  { id: 'ae2', url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=80&w=2000', thumbnail: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=80&w=600', title: 'Mist Valley', author: 'Aeron', authorUrl: 'https://unsplash.com/@aeronautics', categories: ['Aerial', 'All'], dimensions: { width: 5000, height: 3333 } },
  { id: 'ae3', url: 'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&q=80&w=2000', thumbnail: 'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&q=80&w=600', title: 'River Bend', author: 'Jerry Z.', authorUrl: 'https://unsplash.com/@jerry', categories: ['Aerial', 'All'], dimensions: { width: 4000, height: 2667 } },
  { id: 'ae4', url: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=2000', thumbnail: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=600', title: 'High Greens', author: 'Kal Visu', authorUrl: 'https://unsplash.com/@kalvisuals', categories: ['Aerial', 'All'], dimensions: { width: 5000, height: 3333 } },
  { id: 'ae5', url: 'https://images.unsplash.com/photo-1419615804702-29000a7d92cc?auto=format&fit=crop&q=80&w=2000', thumbnail: 'https://images.unsplash.com/photo-1419615804702-29000a7d92cc?auto=format&fit=crop&q=80&w=600', title: 'Cloud Surfing', author: 'Lila Read', authorUrl: 'https://unsplash.com/@liamread', categories: ['Aerial', 'All'], dimensions: { width: 4000, height: 2667 } },
  { id: 'ae6', url: 'https://images.unsplash.com/photo-1502657877623-f66bf489d236?auto=format&fit=crop&q=80&w=2000', thumbnail: 'https://images.unsplash.com/photo-1502657877623-f66bf489d236?auto=format&fit=crop&q=80&w=600', title: 'Shoreline', author: 'Simon M.', authorUrl: 'https://unsplash.com/@8moments', categories: ['Aerial', 'All'], dimensions: { width: 5000, height: 3333 } },
  { id: 'ae7', url: 'https://images.unsplash.com/photo-1503387762-592be5a52680?auto=format&fit=crop&q=80&w=2000', thumbnail: 'https://images.unsplash.com/photo-1503387762-592be5a52680?auto=format&fit=crop&q=80&w=600', title: 'Urban Top', author: 'Simone H.', authorUrl: 'https://unsplash.com/@simone', categories: ['Aerial', 'All'], dimensions: { width: 4000, height: 2667 } },
  { id: 'ae8', url: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&q=80&w=2000', thumbnail: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&q=80&w=600', title: 'Forest Roof', author: 'Bobby N.', authorUrl: 'https://unsplash.com/@bobby', categories: ['Aerial', 'All'], dimensions: { width: 5000, height: 3333 } },
  { id: 'ae9', url: 'https://images.unsplash.com/photo-1473580044384-7ba9967e16a0?auto=format&fit=crop&q=80&w=2000', thumbnail: 'https://images.unsplash.com/photo-1473580044384-7ba9967e16a0?auto=format&fit=crop&q=80&w=600', title: 'Dune View', author: 'K. Spiske', authorUrl: 'https://unsplash.com/@markus', categories: ['Aerial', 'All'], dimensions: { width: 4000, height: 2667 } },
  { id: 'ae10', url: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&q=80&w=2000', thumbnail: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&q=80&w=600', title: 'Island Drone', author: 'A. Wong', authorUrl: 'https://unsplash.com/@alexwong', categories: ['Aerial', 'All'], dimensions: { width: 5000, height: 3333 } }
];

const CATEGORIES: Category[] = ['All', 'Nature', 'Architecture', 'Abstract', 'Minimalist', 'Cyberpunk', 'Aerial', 'Space'];

export default function App() {
  const [wallpapers, setWallpapers] = useState<Wallpaper[]>(INITIAL_WALLPAPERS);
  const [selectedCategory, setSelectedCategory] = useState<Category>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedWallpaper, setSelectedWallpaper] = useState<Wallpaper | null>(null);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [notification, setNotification] = useState<{message: string, type: 'success' | 'info'} | null>(null);
  
  // Clear notification after 3s
  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => setNotification(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  // Customization state
  const [blur, setBlur] = useState(0);
  const [brightness, setBrightness] = useState(100);
  const [sepia, setSepia] = useState(0);

  const filteredWallpapers = useMemo(() => {
    return wallpapers.filter(w => {
      const matchesCategory = selectedCategory === 'All' || w.categories.includes(selectedCategory);
      const matchesSearch = w.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           w.author.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [wallpapers, selectedCategory, searchQuery]);

  const toggleFavorite = (id: string) => {
    setFavorites(prev => prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]);
  };

  const handleDownload = async (wp: Wallpaper) => {
    try {
      const response = await fetch(wp.url);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${wp.title.replace(/\s+/g, '-').toLowerCase()}-vividwall.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      
      // Flash success state (using confetti)
      const confetti = (await import('canvas-confetti')).default;
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#FFFFFF', '#3B82F6', '#8B5CF6']
      });
    } catch (error) {
      console.error('Download failed:', error);
      setNotification({ message: 'Failed to download image', type: 'info' });
    }
  };

  const handleShare = (wp: Wallpaper) => {
    navigator.clipboard.writeText(wp.url);
    setNotification({ message: 'Link copied to clipboard!', type: 'success' });
  };

  const handleAiSearch = async () => {
    // AI Search removed
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-white/20 p-8 flex flex-col gap-12">
      {/* Background Atmosphere */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-[-10%] w-[40%] h-[50%] bg-blue-500/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[50%] bg-purple-500/5 blur-[120px] rounded-full" />
      </div>

      {/* Header Section */}
      <header className="relative z-10 flex flex-col md:flex-row justify-between items-end gap-6">
        <div className="flex flex-col">
          <span className="text-[10px] uppercase tracking-[0.4em] text-white/40 font-semibold mb-1">Visual Experience</span>
          <h1 className="text-5xl font-light tracking-tighter italic family-serif">VividWall</h1>
        </div>
        
        <nav className="flex flex-col md:flex-row gap-8 items-end md:items-center">
          <div className="flex gap-8 text-[11px] uppercase tracking-[0.2em] text-white/60 font-medium">
            {CATEGORIES.slice(0, 4).map(cat => (
              <button 
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={cn(
                  "hover:text-white transition-colors border-b pb-1",
                  selectedCategory === cat ? "text-white border-white/40" : "border-transparent"
                )}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative flex items-center group">
            <div className="relative flex items-center bg-white/5 border border-white/10 rounded-full px-4 py-2 w-64 md:w-80 transition-all focus-within:bg-white/10 focus-within:border-white/20">
              <Search className="w-4 h-4 text-white/30 mr-2 group-focus-within:text-white/60 transition-colors" />
              <input 
                type="text" 
                placeholder="Find inspiration..."
                className="bg-transparent border-none outline-none text-xs text-white placeholder:text-white/30 w-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-white/5 rounded-full transition-colors relative">
              <Heart className={cn("w-5 h-5", favorites.length > 0 ? "fill-red-500 text-red-500" : "text-white/60")} />
              {favorites.length > 0 && <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full" />}
            </button>
          </div>
        </nav>
      </header>

      {/* Main Content Layout */}
      <main className="relative z-10 grid grid-cols-12 gap-8">
        {/* Hero Featured Wallpaper (col-span-7) */}
        {!searchQuery && selectedCategory === 'All' && (
          <div className="col-span-12 lg:col-span-7 h-[500px]">
             <motion.div 
               initial={{ opacity: 0, scale: 0.98 }}
               animate={{ opacity: 1, scale: 1 }}
               className="relative h-full group rounded-[2.5rem] overflow-hidden border border-white/5 bg-[#111] cursor-pointer"
               onClick={() => setSelectedWallpaper(INITIAL_WALLPAPERS[0])}
             >
               <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent z-10" />
               <img 
                 src={INITIAL_WALLPAPERS[0].url} 
                 alt={INITIAL_WALLPAPERS[0].title}
                 className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                 referrerPolicy="no-referrer"
               />
               
               <div className="absolute bottom-0 left-0 w-full p-10 z-20 flex flex-col md:flex-row justify-between items-end gap-6">
                 <div>
                   <div className="flex items-center gap-3 mb-4">
                     <span className="px-3 py-1 bg-white/10 backdrop-blur-md rounded-md text-[10px] uppercase tracking-wider border border-white/10">Editor's Choice</span>
                     <span className="text-white/40 text-[10px] uppercase tracking-widest font-semibold">4K Ultra HD</span>
                   </div>
                   <h2 className="text-5xl font-light mb-2 tracking-tighter">{INITIAL_WALLPAPERS[0].title}</h2>
                   <p className="text-white/50 text-base italic family-serif">by {INITIAL_WALLPAPERS[0].author} • Nordics Series</p>
                 </div>
                 <button className="px-10 py-4 bg-white text-black text-[11px] font-bold uppercase tracking-widest rounded-full hover:bg-white/90 active:scale-95 transition-all shadow-2xl shadow-white/5">
                   Apply Experience
                 </button>
               </div>
             </motion.div>
          </div>
        )}

        {/* Secondary Info Area (col-span-5) */}
        {!searchQuery && selectedCategory === 'All' && (
          <div className="col-span-12 lg:col-span-5 grid grid-rows-2 gap-8">
            {/* Trending Quick View */}
            <div className="bg-white/5 border border-white/10 rounded-[2.5rem] p-8 flex flex-col justify-between">
              <div className="flex justify-between items-start">
                <h3 className="text-[11px] uppercase tracking-[0.3em] text-white/40 font-bold">Trending Aesthetics</h3>
                <button className="text-[10px] text-white/60 hover:text-white underline underline-offset-8 decoration-white/20">Expand Discovery</button>
              </div>
              
              <div className="flex gap-4 mt-6">
                {[INITIAL_WALLPAPERS[1], INITIAL_WALLPAPERS[2], INITIAL_WALLPAPERS[3]].map((wp, i) => (
                  <div 
                    key={wp.id}
                    onClick={() => setSelectedWallpaper(wp)}
                    className="flex-1 aspect-[3/4] rounded-2xl overflow-hidden cursor-pointer border border-white/5 hover:border-white/20 transition-all grayscale hover:grayscale-0 duration-500"
                  >
                    <img src={wp.thumbnail} alt={wp.title} className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            </div>

            {/* Atmosphere Palette */}
            <div className="bg-white/5 border border-white/10 rounded-[2.5rem] p-8 flex flex-col justify-between">
              <h3 className="text-[11px] uppercase tracking-[0.3em] text-white/40 font-bold mb-6">Atmospheric Tonality</h3>
              <div className="flex flex-col gap-8">
                <div className="flex justify-between items-center">
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-[#1e293b] border border-white/10 cursor-pointer hover:scale-110 transition-transform" />
                    <div className="w-10 h-10 rounded-full bg-[#4c1d95] border border-white/10 cursor-pointer hover:scale-110 transition-transform" />
                    <div className="w-10 h-10 rounded-full bg-[#831843] border border-white/10 cursor-pointer hover:scale-110 transition-transform" />
                    <div className="w-10 h-10 rounded-full bg-[#064e3b] border border-white/10 cursor-pointer hover:scale-110 transition-transform" />
                  </div>
                  <span className="text-[10px] text-white/40 tracking-widest font-medium uppercase">Filter by Palette</span>
                </div>
                
                <div className="h-px bg-white/10 w-full" />

                <div className="flex justify-between px-2">
                  <div className="flex flex-col">
                    <span className="text-[10px] uppercase tracking-widest text-white/30 mb-2">Global Curation</span>
                    <span className="text-3xl font-light tabular-nums tracking-tighter">1,280,42</span>
                  </div>
                  <div className="flex flex-col text-right">
                    <span className="text-[10px] uppercase tracking-widest text-white/30 mb-2">New Insights</span>
                    <span className="text-3xl font-light tabular-nums tracking-tighter">+42</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Categories Bar (Sticky top) */}
        <div className="col-span-12 sticky top-4 z-30 flex items-center justify-between gap-4 glass px-8 py-3 rounded-full mx-auto w-full max-w-4xl">
           <div className="flex items-center gap-6 overflow-x-auto no-scrollbar scroll-smooth">
              {CATEGORIES.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={cn(
                    "text-[10px] uppercase tracking-[0.2em] font-bold whitespace-nowrap transition-all",
                    selectedCategory === cat ? "text-white" : "text-white/40 hover:text-white/70"
                  )}
                >
                  {cat}
                </button>
              ))}
           </div>
           <div className="flex items-center gap-2 pl-4 border-l border-white/10">
              <SlidersHorizontal className="w-4 h-4 text-white/40" />
           </div>
        </div>

        {/* Wallpaper Grid */}
        <div className="col-span-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-20">
          <AnimatePresence mode="popLayout">
            {filteredWallpapers.map((wp, i) => (
              <motion.div
                key={wp.id}
                layout
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="group relative"
                onClick={() => setSelectedWallpaper(wp)}
              >
                <div className="relative aspect-[3/4.5] rounded-[2rem] overflow-hidden cursor-pointer border border-white/5 bg-[#111] grid-light group-hover:border-white/20 transition-all duration-500">
                  <img 
                    src={wp.thumbnail} 
                    alt={wp.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent scale-y-110 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-8">
                     <div className="flex justify-between items-end">
                       <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-75">
                         <h4 className="text-xl font-light tracking-tight mb-1">{wp.title}</h4>
                         <p className="text-[11px] italic family-serif text-white/50">{wp.author}</p>
                       </div>
                       <div className="flex gap-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-150">
                          <button 
                            onClick={(e) => { e.stopPropagation(); toggleFavorite(wp.id); }}
                            className="p-3 glass rounded-full hover:bg-white/20 transition-all"
                          >
                            <Heart className={cn("w-4 h-4", favorites.includes(wp.id) ? "fill-red-500 text-red-500" : "text-white")} />
                          </button>
                       </div>
                     </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filteredWallpapers.length === 0 && (
          <div className="col-span-12 flex flex-col items-center justify-center py-20 opacity-20">
            <Search className="w-16 h-16 mb-4 font-light" />
            <p className="text-2xl font-light italic family-serif">No matches in current sequence.</p>
          </div>
        )}
      </main>

      {/* Footer Interface */}
      <footer className="relative z-10 border-t border-white/5 pt-12 pb-8 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] uppercase tracking-[0.3em] text-white/30 font-semibold">
        <div className="flex flex-wrap justify-center gap-8 md:gap-12">
          <span className="hover:text-white/60 transition-colors cursor-default">Resolution: 3840 x 2160</span>
          <span className="hover:text-white/60 transition-colors cursor-default">Format: RAW / HEIC</span>
          <span className="hover:text-white/60 transition-colors cursor-default">Engine: Vivid v4.2</span>
        </div>
        <div className="flex items-center gap-6">
          <div className="flex gap-4">
            <a href="#" className="hover:text-white transition-colors"><Github className="w-4 h-4" /></a>
          </div>
          <div className="flex gap-3 items-center">
            <span className="text-white/60 tracking-[0.4em]">System Status: Optimal</span>
            <div className="w-2.5 h-2.5 rounded-full bg-green-500/40 animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.4)]"></div>
          </div>
        </div>
      </footer>

      {/* Notifications */}
      <AnimatePresence>
        {notification && (
          <motion.div
            initial={{ opacity: 0, y: 50, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: 20, x: '-50%' }}
            className="fixed bottom-12 left-1/2 z-[100] px-8 py-4 glass rounded-full text-[11px] uppercase tracking-[0.2em] font-bold shadow-2xl flex items-center gap-3 border border-white/20"
          >
            {notification.type === 'success' ? <Sparkles className="w-4 h-4 text-blue-400" /> : <Info className="w-4 h-4 text-white/60" />}
            {notification.message}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Wallpaper Detail Overlay */}
      <AnimatePresence>
        {selectedWallpaper && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 glass flex items-center justify-center p-4 md:p-12"
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full h-full flex flex-col lg:flex-row bg-[#080808] rounded-[3rem] overflow-hidden border border-white/10 shadow-2xl"
            >
              {/* Close Button */}
              <button 
                onClick={() => setSelectedWallpaper(null)}
                className="absolute top-10 right-10 z-10 glass p-3 rounded-full hover:bg-white/10 transition-all active:scale-90"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Preview Area */}
              <div className="flex-1 relative overflow-hidden bg-black flex items-center justify-center group/preview">
                <img 
                  src={selectedWallpaper.url} 
                  alt={selectedWallpaper.title}
                  className="w-full h-full object-cover transition-all duration-700"
                  style={{
                    filter: `blur(${blur}px) brightness(${brightness}%) sepia(${sepia}%)`
                  }}
                  referrerPolicy="no-referrer"
                />
                
                {/* Floating Preview Controls */}
                <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex gap-6 opacity-0 group-hover/preview:opacity-100 transition-all duration-300 translate-y-4 group-hover/preview:translate-y-0">
                   <button className="glass py-4 px-10 rounded-full flex items-center gap-3 hover:bg-white/20 text-[11px] uppercase tracking-widest font-bold">
                      <ChevronLeft className="w-5 h-5" />
                      Sequence
                   </button>
                   <button className="glass py-4 px-10 rounded-full flex items-center gap-3 hover:bg-white/20 text-[11px] uppercase tracking-widest font-bold">
                      Sequence
                      <ChevronRight className="w-5 h-5" />
                   </button>
                </div>
              </div>

              {/* Control Sidebar */}
              <div className="w-full lg:w-[450px] flex flex-col p-12 overflow-y-auto no-scrollbar border-l border-white/5 bg-[#080808]">
                <div className="mb-12">
                  <div className="text-[10px] tracking-[0.4em] uppercase text-white/30 font-bold mb-4">Aesthetic Sequence</div>
                  <h2 className="text-5xl font-light mb-2 tracking-tighter">{selectedWallpaper.title}</h2>
                  <div className="flex items-center gap-3 text-white/50 text-base mb-10 italic family-serif">
                    <span>by</span>
                    <a href={selectedWallpaper.authorUrl} target="_blank" rel="noopener noreferrer" className="text-white hover:underline underline-offset-[12px] decoration-white/20">
                      {selectedWallpaper.author}
                    </a>
                  </div>

                  <div className="flex gap-4 mb-10">
                    <button 
                      onClick={() => toggleFavorite(selectedWallpaper.id)}
                      className={cn(
                        "flex-1 py-5 flex items-center justify-center gap-3 rounded-2xl transition-all border",
                        favorites.includes(selectedWallpaper.id) 
                          ? "bg-red-500/10 border-red-500/20 text-red-500" 
                          : "bg-white/5 border-white/10 text-white hover:bg-white/10 hover:border-white/20"
                      )}
                    >
                      <Heart className={cn("w-5 h-5", favorites.includes(selectedWallpaper.id) && "fill-current")} />
                      <span className="text-[11px] uppercase tracking-widest font-bold">{favorites.includes(selectedWallpaper.id) ? 'Captured' : 'Capture'}</span>
                    </button>
                    <button 
                      onClick={() => handleShare(selectedWallpaper)}
                      className="w-16 flex items-center justify-center bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 hover:border-white/20 transition-all"
                    >
                      <Share2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                <div className="space-y-12 flex-1">
                  <div>
                    <div className="flex items-center justify-between mb-8">
                      <h3 className="text-[11px] font-bold uppercase tracking-[0.3em] flex items-center gap-3 text-white/40">
                        <SlidersHorizontal className="w-4 h-4" />
                        Atmosphere Tuning
                      </h3>
                      <button 
                        onClick={() => { setBlur(0); setBrightness(100); setSepia(0); }}
                        className="text-xs text-blue-400/80 hover:text-blue-300 transition-colors uppercase tracking-widest font-bold"
                      >
                        Reset
                      </button>
                    </div>
                    
                    <div className="space-y-10">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between text-[11px] uppercase tracking-widest font-bold">
                          <span className="text-white/40">Diffusion (Blur)</span>
                          <span className="tabular-nums">{blur}px</span>
                        </div>
                        <input 
                          type="range" min="0" max="20" step="1" 
                          value={blur} onChange={(e) => setBlur(parseInt(e.target.value))}
                          className="w-full accent-white opacity-40 hover:opacity-100 transition-opacity cursor-pointer h-1.5 rounded-full"
                        />
                      </div>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between text-[11px] uppercase tracking-widest font-bold">
                          <span className="text-white/40">Luminance</span>
                          <span className="tabular-nums">{brightness}%</span>
                        </div>
                        <input 
                          type="range" min="50" max="150" step="1" 
                          value={brightness} onChange={(e) => setBrightness(parseInt(e.target.value))}
                          className="w-full accent-white opacity-40 hover:opacity-100 transition-opacity cursor-pointer h-1.5 rounded-full"
                        />
                      </div>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between text-[11px] uppercase tracking-widest font-bold">
                          <span className="text-white/40">Temporal Rift (Sepia)</span>
                          <span className="tabular-nums">{sepia}%</span>
                        </div>
                        <input 
                          type="range" min="0" max="100" step="1" 
                          value={sepia} onChange={(e) => setSepia(parseInt(e.target.value))}
                          className="w-full accent-white opacity-40 hover:opacity-100 transition-opacity cursor-pointer h-1.5 rounded-full"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="pt-10 border-t border-white/5">
                    <h3 className="text-[11px] font-bold uppercase tracking-[0.3em] flex items-center gap-3 mb-6 text-white/40">
                      <Info className="w-4 h-4" />
                      Technical Specifications
                    </h3>
                    <div className="grid grid-cols-2 gap-6">
                      <div className="bg-white/5 border border-white/10 p-5 rounded-2xl">
                        <p className="text-[9px] text-white/30 uppercase tracking-widest mb-2 font-bold">Resolution</p>
                        <p className="text-sm font-light tracking-tight">{selectedWallpaper.dimensions.width} × {selectedWallpaper.dimensions.height}</p>
                      </div>
                      <div className="bg-white/5 border border-white/10 p-5 rounded-2xl">
                        <p className="text-[9px] text-white/30 uppercase tracking-widest mb-2 font-bold">Encoding</p>
                        <p className="text-sm font-light tracking-tight uppercase">High-Fidelity RAW</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-12">
                  <button 
                    onClick={() => handleDownload(selectedWallpaper)}
                    className="w-full py-6 bg-white text-black font-bold text-[13px] uppercase tracking-[0.3em] rounded-full flex items-center justify-center gap-4 hover:bg-white/90 active:scale-[0.98] transition-all shadow-[0_20px_50px_rgba(255,255,255,0.05)]"
                  >
                    <Download className="w-5 h-5" />
                    Archive Asset
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

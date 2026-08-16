export type AmbientTone = 'birds' | 'crickets' | 'cooler' | 'rain' | 'tubewell' | 'children';

export type Memory = {
  id: string;
  year: string;
  time: string;
  title: string;
  quote: string;
  image: string;
  imageAlt: string;
  ambient: { label: string; tone: AmbientTone };
  music: { title: string; artist: string; youtubeVideoId: string };
  profile: 'evening' | 'night' | 'summer' | 'rain' | 'field' | 'street';
};

export const memories: Memory[] = [
  {
    id: 'pind-di-shaam', year: '2004', time: '6:47 PM', title: 'PIND DI SHAAM',
    quote: 'ਓਹ ਵੀ ਕੀ ਦਿਨ ਸੀ।',
    image: '/assets/images/memories/ChatGPT_Image_Aug_16,_2026,_08_14_23_PM.png',
    imageAlt: 'Warm golden sunset over a rural Punjabi landscape',
    ambient: { label: 'birds · wind · distant tractor', tone: 'birds' },
    music: { title: 'Kach Diyaan Chooriyan', artist: 'Pind Radio / memory 01', youtubeVideoId: '' }, profile: 'evening'
  },
  {
    id: 'raat-da-pind', year: '2001', time: '9:38 PM', title: 'RAAT DA PIND',
    quote: 'ਰਾਤਾਂ ਲੰਮੀਆਂ ਹੁੰਦੀਆਂ ਸੀ।',
    image: '/assets/images/memories/ChatGPT_Image_Aug_16,_2026,_08_23_58_PM.png',
    imageAlt: 'A quiet village at dusk with distant lights',
    ambient: { label: 'crickets · dogs · distant radio', tone: 'crickets' },
    music: { title: 'Raat Di Gali', artist: 'Pind Radio / memory 02', youtubeVideoId: '' }, profile: 'night'
  },
  {
    id: 'garmiyan', year: '2003', time: '2:16 PM', title: 'GARMIYAN',
    quote: 'ਗਰਮੀਆਂ ਦੀਆਂ ਦੁਪਹਿਰਾਂ ਵੀ ਕਿੰਨੀਆਂ ਸੋਹਣੀਆਂ ਸੀ।',
    image: '/assets/images/memories/Punjabi_Village_Summer_Afternoon.png',
    imageAlt: 'A traditional charpai resting outdoors in a rural garden',
    ambient: { label: 'cooler · fan · insects', tone: 'cooler' },
    music: { title: 'Dupahirein', artist: 'Pind Radio / memory 03', youtubeVideoId: '' }, profile: 'summer'
  },
  {
    id: 'barsaat', year: '2005', time: '4:22 PM', title: 'BARSAAT',
    quote: 'ਮਿੱਟੀ ਦੀ ਸੌਂਧੀ ਖੁਸ਼ਬੂ...',
    image: '/assets/images/memories/ChatGPT_Image_Aug_16,_2026,_08_25_57_PM.png',
    imageAlt: 'A rustic village street after rain',
    ambient: { label: 'rain · dripping water · wind', tone: 'rain' },
    music: { title: 'Pehli Barsaat', artist: 'Pind Radio / memory 04', youtubeVideoId: '' }, profile: 'rain'
  },
  {
    id: 'khetan-wich', year: '2002', time: '8:05 AM', title: 'KHETAN WICH',
    quote: 'ਖੁੱਲੀ ਹਵਾ, ਖੇਤ ਤੇ ਬਚਪਨ।',
    image: '/assets/images/memories/ChatGPT_Image_Aug_16,_2026,_08_26_54_PM.png',
    imageAlt: 'A tractor working in a wide green field in morning light',
    ambient: { label: 'tubewell · birds · wind', tone: 'tubewell' },
    music: { title: 'Khetan De Raah', artist: 'Pind Radio / memory 05', youtubeVideoId: '' }, profile: 'field'
  },
  {
    id: 'saddi-gali', year: '2006', time: '5:31 PM', title: 'SADDI GALI',
    quote: "ਗਲੀਆਂ 'ਚ ਰੌਣਕ ਹੁੰਦੀ ਸੀ।",
    image: 'https://images.pexels.com/photos/12923128/pexels-photo-12923128.jpeg?auto=compress&cs=tinysrgb&w=2000',
    imageAlt: 'A bicycle on a rural road with fields and trees behind it',
    ambient: { label: 'children · bicycle bell · neighbours', tone: 'children' },
    music: { title: 'Gali De Khed', artist: 'Pind Radio / memory 06', youtubeVideoId: '' }, profile: 'street'
  }
];

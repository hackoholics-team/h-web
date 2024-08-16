import { SupportedLanguage } from '@/providers/i18n';

export type ParkPref = Record<SupportedLanguage, string>;

export const PARK_DEFAULT_DATA: {
  types: ParkPref[];
  activities: ParkPref[];
} = {
  types: [
    { en: 'National Park', fr: 'Parc national' },
    { en: 'Urban Park', fr: 'Parc urbain' },
    { en: 'Amusement Park', fr: "Parc d'attractions" },
    { en: 'Botanical Garden', fr: 'Jardin botanique' },
    { en: 'Wildlife Park', fr: 'Parc animalier' },
    { en: 'Water Park', fr: 'Parc aquatique' },
    { en: 'Adventure Park', fr: "Parc d'aventure" },
    { en: 'Theme Park', fr: 'Parc à thème' },
    { en: 'Historical Park', fr: 'Parc historique' },
    { en: 'Nature Reserve', fr: 'Réserve naturelle' },
    { en: 'Skate Park', fr: 'Skatepark' },
    { en: 'Dog Park', fr: 'Parc pour chiens' },
    { en: 'Beach Park', fr: 'Parc de plage' },
  ],
  activities: [
    { en: 'Hiking', fr: 'Randonnée' },
    { en: 'Picnicking', fr: 'Pique-niquer' },
    { en: 'Bird Watching', fr: 'Observation des oiseaux' },
    { en: 'Cycling', fr: 'Cyclisme' },
    { en: 'Jogging', fr: 'Jogging' },
    { en: 'Swimming', fr: 'Natation' },
    { en: 'Fishing', fr: 'Pêche' },
    { en: 'Rock Climbing', fr: 'Escalade' },
    { en: 'Wildlife Photography', fr: 'Photographie de la faune' },
    { en: 'Camping', fr: 'Camping' },
    { en: 'Boating', fr: 'Bateau' },
    { en: 'Playground Activities', fr: 'Terrain de jeux' },
    { en: 'Yoga', fr: 'Yoga' },
    { en: 'Rollerblading', fr: 'Roller' },
    { en: 'Frisbee/Frisbee Golf', fr: 'Frisbee/Disc golf' },
    { en: 'Playing Sports', fr: 'Pratique de sports' },
    { en: 'Nature Walks', fr: 'Balades en nature' },
  ],
};

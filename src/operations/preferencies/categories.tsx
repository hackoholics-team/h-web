import { FlexBox } from '@/common/components';
import { Box, Typography, Chip } from '@mui/material';
// import { useState } from 'react';

export const CATEGORIES_MOCK = [
  'Foot',
  'Basket Ball',
  'Rugby',
  'Toamasina',
  'Paris',
  'Europe',
  'Rugby2',
  'Toamasina5',
  'Paris7',
  'Europe5',
];

export const Categories = () => {
  // const [categories, setCategories] = useState(
  //   CATEGORIES_MOCK.map((category) => ({
  //     label: category,
  //     selected: false,
  //   }))
  // );

  // const toggleSelectedCategory = (selectedLabel: string) => {
  //   const newCategories = [...categories].map((category) => {
  //     return category.label === selectedLabel
  //       ? { ...category, selected: !category.selected }
  //       : category;
  //   });
  //   setCategories(newCategories);
  // };

  return (
    <Box sx={{ mx: 'auto', width: '80%' }}>
      <Typography sx={{ mb: 2, fontWeight: 'bold', fontSize: '1.2rem' }}>
        Choose all of your favourite activies
      </Typography>
      <FlexBox sx={{ flexWrap: 'wrap', justifyContent: 'start', gap: 2 }}>
        {CATEGORIES_MOCK.map((region) => (
          <Chip clickable key={region} variant="outlined" label={region} />
        ))}
      </FlexBox>
    </Box>
  );
};

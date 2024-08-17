import { FlexBox } from '@/common/components';
import { Typography, Divider, Checkbox } from '@mui/material';
import { CheckCircle } from '@mui/icons-material';
import { usePalette } from '@/common/hooks';
import { Button } from 'react-admin';
import { FC } from 'react';

export type CardProps = {
  features: string[];
  title: string;
  price: string;
  disabled: boolean;
  description: string;
  onClick?: () => void
  isLoading: boolean;
};

export const Card: FC<CardProps> = ({
  description,
  isLoading,
  features,
  title,
  price,
  onClick,
  disabled,
}) => {
  const { bgcolorPaper, primaryColor, secondaryColor } = usePalette();

  return (
    <FlexBox
      sx={{
        width: '300px',
        flexDirection: 'column',
        alignItems: 'start',
        p: 2,
        borderRadius: '15px',
        bgcolor: bgcolorPaper,
      }}
    >
      <Typography sx={{ color: primaryColor, opacity: '.9' }}>
        {title}
      </Typography>
      <Typography
        sx={{ color: primaryColor, fontSize: '2rem', fontWeight: 'bold' }}
      >
        {price}
      </Typography>
      <Divider sx={{ my: 0.5, color: secondaryColor, width: '100%' }} />
      <Typography sx={{ color: secondaryColor, fontSize: '13px' }}>
        {description}
      </Typography>
      {features.map((feature) => (
        <FlexBox key={feature} sx={{ gap: 1 }}>
          <Checkbox
            checked
            icon={<CheckCircle />}
            checkedIcon={<CheckCircle />}
          />
          <Typography sx={{ color: primaryColor, fontSize: '14px' }}>
            {feature}
          </Typography>
        </FlexBox>
      ))}
      <Button
        label="Choose this plan"
        sx={{ mt: 'auto', ml: 'auto' }}
        variant="contained"
        disabled={disabled || isLoading}
        onClick={onClick}
      />
    </FlexBox>
  );
};

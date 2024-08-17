import { Typography, Box, Divider, MenuItem, Select } from '@mui/material';
import { FlexBox, TitledPage } from '@/common/components';
import { useIsDarkTheme, usePalette } from '@/common/hooks';
import { useLocale, useSetLocale, useTheme, useTranslate } from 'react-admin';
import { SUPPORTED_LOCALES } from '@/providers/i18n';

export const Settings = () => {
  const { primaryColor, bgcolorPaper, bgcolor } = usePalette();
  const currentLocale = useLocale();
  const setLocale = useSetLocale();
  const isDarkTheme = useIsDarkTheme();
  const translate = useTranslate();
  const [theme, setTheme] = useTheme();

  const languages = SUPPORTED_LOCALES.map((locale) => {
    return {
      locale,
      name: translate(`ha.locales.${locale}.name`),
    };
  });

  const handleLocaleChange = (event: any) => {
    setLocale(event.target.value);
  };

  const handleThemeChange = (event: any) => {
    setTheme(event.target.value);
  };

  return (
    <TitledPage
      title={
        translate('ha.words.settings')[0].toUpperCase() +
        translate('ha.words.settings').slice(1)
      }
      description={translate('ha.text.settings')}
      paths={[
        {
          label: 'settings',
          href: '/settings',
        },
      ]}
    >
      <Box
        sx={{
          width: '100%',
          bgcolor: isDarkTheme ? bgcolorPaper : bgcolor,
          p: 2,
        }}
      >
        <Divider sx={{ mb: 2 }} />
        <FlexBox sx={{ justifyContent: 'space-between', width: '600px' }}>
          <Typography sx={{ color: primaryColor, fontSize: '1.3rem' }}>
            {translate('ha.words.lang')}
          </Typography>
          <Select
            value={currentLocale}
            label=""
            size="small"
            sx={{ width: '200px' }}
            variant="standard"
            onChange={handleLocaleChange}
          >
            {languages.map((el) => (
              <MenuItem key={el.locale} value={el.locale}>
                {el.name}
              </MenuItem>
            ))}
          </Select>
        </FlexBox>
        <Divider sx={{ my: 2 }} />
        <FlexBox sx={{ justifyContent: 'space-between', width: '600px' }}>
          <Typography sx={{ color: primaryColor, fontSize: '1.3rem' }}>
            Themes
          </Typography>
          <Select
            value={theme}
            label=""
            size="small"
            sx={{ width: '200px' }}
            variant="standard"
            onChange={handleThemeChange}
          >
            <MenuItem key={'light'} value={'light'}>
              {translate(`ha.words.light`)}
            </MenuItem>
            <MenuItem key={'dark'} value={'dark'}>
              {translate(`ha.words.dark`)}
            </MenuItem>
          </Select>
        </FlexBox>
      </Box>
    </TitledPage>
  );
};

import { Menu as RaMenu } from 'react-admin';
import { AccountCircle } from "@mui/icons-material";

export const Menu = () => {
  return (
    <RaMenu>
      {/* <RaMenu.Item to="/" leftIcon={<ProfileIcon />} primaryText="Profile" /> */}
      <RaMenu.Item leftIcon={<AccountCircle />} to="/profiles" primaryText="Profile" />
      <RaMenu.ResourceItem name="dummies" />
    </RaMenu>
  );
};

import { SxProps, AppBar as MuiAppBar } from "@mui/material";

const APPBAR_SX: SxProps = {
  p: 2,
  bgcolor: "blue !important",
  width: {
    xs: "100%",
    md: "calc(100% - 250px)"
  },
  ml: {
    xs: 0,
    md: "250px"
  }
}

export const AppBar = () => {
  return (
    <MuiAppBar id="appbar" position="sticky" sx={APPBAR_SX}>
    </MuiAppBar>
  )
}

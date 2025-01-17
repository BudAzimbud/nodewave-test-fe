import * as React from "react";
import { extendTheme, useColorScheme } from "@mui/material/styles";
import Home from "@mui/icons-material/Home";
import { AppProvider, Navigation } from "@toolpad/core/AppProvider";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { PageContainer } from "@toolpad/core/PageContainer";
import {
  Avatar,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Popover,
  Tooltip,
  Typography,
} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import CreateNewFolderIcon from "@mui/icons-material/CreateNewFolder";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
const NAVIGATION: Navigation = [
  {
    segment: "todo",
    title: "To Do",
    icon: <Home />,
  },
];
const themeLayoutApp = extendTheme({
  colorSchemes: { light: true, dark: true },
  colorSchemeSelector: "class",
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536,
    },
  },
});

function CustomThemeSwitcher() {
  const { setMode } = useColorScheme();

  const handleThemeChange = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setMode(event.target.value as "light" | "dark" | "system");
    },
    [setMode]
  );

  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [menuAnchorEl, setMenuAnchorEl] = React.useState<HTMLElement | null>(
    null
  );

  const router = useRouter();

  const toggleMenu = React.useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      setMenuAnchorEl(isMenuOpen ? null : event.currentTarget);
      setIsMenuOpen((previousIsMenuOpen) => !previousIsMenuOpen);
    },
    [isMenuOpen]
  );

  const { data: session }: any = useSession();
  return (
    <React.Fragment>
      <Tooltip title="Settings" enterDelay={1000}>
        <div>
          <IconButton onClick={toggleMenu}>
            <Typography sx={{ mr: 2 }}>{session?.user?.email}</Typography>
            <Avatar />
          </IconButton>
        </div>
      </Tooltip>
      <Popover
        open={isMenuOpen}
        anchorEl={menuAnchorEl}
        onClose={toggleMenu}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        disableAutoFocus
      >
        <List
          sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
        >
          <ListItemButton
            onClick={() => {
              signOut();
            }}
          >
            <ListItemIcon>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItemButton>
          <ListItemButton
            onClick={() => {
              router.push("/todo/add");
            }}
          >
            <ListItemIcon>
              <CreateNewFolderIcon />
            </ListItemIcon>
            <ListItemText primary="Add Todo" />
          </ListItemButton>
        </List>
      </Popover>
    </React.Fragment>
  );
}

type Props = {
  children: React.ReactNode;
  window?: any;
  hiddenSidebar?: boolean;
};

export default function DashboardLayoutBasic(props: Props) {
  const { window, children, hiddenSidebar } = props;

  // Remove this const when copying and pasting into your project.
  const windowLayout = window ? window() : undefined;

  return (
    <AppProvider
      navigation={NAVIGATION}
      theme={themeLayoutApp}
      window={windowLayout}
      branding={{
        logo: "",
        title: "Nodewave",
        homeUrl: "/todo",
      }}
    >
      <DashboardLayout
        slots={{
          toolbarActions: CustomThemeSwitcher,
        }}
        defaultSidebarCollapsed={hiddenSidebar}
        sx={{
          "& .css-23htwk": {
            background: "#f7f7f9",
          },
        }}
      >
        {hiddenSidebar ? children : <PageContainer>{children}</PageContainer>}
      </DashboardLayout>
    </AppProvider>
  );
}

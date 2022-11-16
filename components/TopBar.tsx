import { ArrowBack, Mail, MoveToInbox } from "@mui/icons-material";
import {
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { Box } from "@mui/system";
import Image from "next/image";
import { useState } from "react";
import styles from "../styles/TopBar.module.css";

const TopBar: React.FC = () => {
  const [open, setOpen] = useState(false);

  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }
      setOpen(open);
    };

  return (
    <>
      <div className={styles.container}>
        <Image
          className={styles.menuContainer}
          alt=""
          src={"/menu.jpeg"}
          style={{
            cursor: "pointer",
          }}
          width={70}
          height={70}
          onClick={toggleDrawer(true)}
        />
        <Image
          className={styles.carritoContainer}
          alt=""
          src={"/carrito.jpeg"}
          width={70}
          height={70}
        />

        <div className={styles.titleContainer}>
          <span>CAPYBARA</span>
        </div>
      </div>
      <Drawer
        anchor={"left"}
        open={open}
        onClose={toggleDrawer(false)}
        className={styles.listContainer}
        sx={{
          "& .MuiPaper-root": {
            backgroundColor: "#B5C99A",
          },
        }}
      >
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
          <List>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <ArrowBack />
                </ListItemIcon>
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemText primary={"Iniciar sesión"} />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemText primary={"Ser miembro"} />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </>
  );
};

export default TopBar;

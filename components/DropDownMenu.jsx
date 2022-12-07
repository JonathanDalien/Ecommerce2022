import * as React from "react";
import MenuUnstyled from "@mui/base/MenuUnstyled";
import MenuItemUnstyled, {
  menuItemUnstyledClasses,
} from "@mui/base/MenuItemUnstyled";
import PopperUnstyled from "@mui/base/PopperUnstyled";
import { styled } from "@mui/system";
import Link from "next/link";
import { Divider } from "@mui/material";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";

const blue = {
  100: "#DAECFF",
  200: "#99CCF3",
  400: "#3399FF",
  500: "#007FFF",
  600: "#0072E5",
  900: "#003A75",
};

const grey = {
  50: "#f6f8fa",
  100: "#eaeef2",
  200: "#d0d7de",
  300: "#afb8c1",
  400: "#8c959f",
  500: "#6e7781",
  600: "#57606a",
  700: "#424a53",
  800: "#32383f",
  900: "#24292f",
};

const StyledListbox = styled("ul")(
  ({ theme }) => `
  font-family: IBM Plex Sans, sans-serif;
  font-size: 0.875rem;
  box-sizing: border-box;
  padding: 6px;
  margin: 12px 0;
  min-width: 200px;
  border-radius: 12px;
  overflow: auto;
  outline: 0px;
  background: ${theme.palette.mode === "dark" ? grey[900] : "#fff"};
  border: 1px solid ${theme.palette.mode === "dark" ? grey[700] : grey[200]};
  color: ${theme.palette.mode === "dark" ? grey[300] : grey[900]};
  box-shadow: 0px 4px 30px ${
    theme.palette.mode === "dark" ? grey[900] : grey[200]
  };
  `
);

const StyledMenuItem = styled(MenuItemUnstyled)(
  ({ theme }) => `
  list-style: none;
  padding: 8px;
  border-radius: 8px;
  cursor: default;
  user-select: none;

  &:last-of-type {
    border-bottom: none;
  }

  &.${menuItemUnstyledClasses.focusVisible} {
    outline: 0px solid ${theme.palette.mode === "dark" ? blue[600] : blue[200]};
    color: ${theme.palette.mode === "dark" ? grey[300] : grey[900]};
  }

  &.${menuItemUnstyledClasses.disabled} {
    color: ${theme.palette.mode === "dark" ? grey[700] : grey[400]};
  }

  &:hover:not(.${menuItemUnstyledClasses.disabled}) {
    background-color: ${theme.palette.mode === "dark" ? grey[800] : grey[100]};
    color: ${theme.palette.mode === "dark" ? grey[300] : grey[900]};
  }
  `
);

const Popper = styled(PopperUnstyled)`
  z-index: 1;
`;

export default function UnstyledMenuSimple() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const isOpen = Boolean(anchorEl);
  const preventReopen = React.useRef(false);

  const handleButtonClick = (event) => {
    if (preventReopen.current) {
      event.preventDefault();
      preventReopen.current = false;
      return;
    }

    if (isOpen) {
      setAnchorEl(null);
    } else {
      setOpen(true);
      setAnchorEl(event.currentTarget);
    }
  };

  const close = () => {
    setAnchorEl(null);
    setOpen(false);
  };

  const createHandleMenuClick = (menuItem) => {
    return () => {
      close();
    };
  };

  return (
    <div onMouseEnter={handleButtonClick} onMouseLeave={close}>
      <div
        type="button"
        aria-expanded={isOpen || undefined}
        aria-haspopup="menu"
        className="flex items-center gap-2 p-2 text-xl"
      >
        Produkte
      </div>
      <MenuUnstyled
        open={isOpen}
        onMouseLeave={close}
        onClose={close}
        anchorEl={anchorEl}
        slots={{ root: Popper, listbox: StyledListbox }}
        slotProps={{ listbox: { id: "simple-menu" } }}
      >
        <Link href="/products">
          <StyledMenuItem
            className="cursor-pointer"
            onClick={createHandleMenuClick("Profile")}
          >
            Alle Produkte
          </StyledMenuItem>
        </Link>
        <Divider sx={{ my: 0.5 }} />
        <Link href="/products?category=Kopfhörer">
          <StyledMenuItem
            className="cursor-pointer"
            onClick={createHandleMenuClick("Profile")}
          >
            Kopfhörer
          </StyledMenuItem>
        </Link>
        <Link href="/products?category=Lautsprecher">
          <StyledMenuItem
            className="cursor-pointer"
            onClick={createHandleMenuClick("Profile")}
          >
            Lautsprecher
          </StyledMenuItem>
        </Link>
        <Link href="/products?category=Kabellose In‑Ear">
          <StyledMenuItem
            className="cursor-pointer"
            onClick={createHandleMenuClick("Profile")}
          >
            Kabellose In‑Ear
          </StyledMenuItem>
        </Link>
      </MenuUnstyled>
    </div>
  );
}

import { Box, Skeleton } from "@mui/material";
import ButtonGroup from "@mui/material/ButtonGroup";
import Button from "@mui/material/Button";

import { messageService } from "../../services/messageService";
import { useObservable } from "../../hooks/useObservable";
import {
  containerSx,
  navItemSx,
  activeNavItemSx,
  itemsGroupSx,
} from "./styles";
import { combineStyles } from "../../utils/styles";

const NavBar = () => {
  const messageCategories = useObservable(
    messageService.messageCategories$,
    []
  );

  const currentCategoryName = useObservable(
    messageService.currentCategoryName$,
    ""
  );

  const isLoading = useObservable(messageService.loading$, true);

  return (
    <Box sx={containerSx}>
      {isLoading ? (
        <Skeleton width="10rem" height="3rem" />
      ) : (
        <ButtonGroup variant="text" sx={itemsGroupSx} color="inherit">
          {messageCategories.map((category: string) => (
            <Button
              key={category}
              onClick={() => messageService.changeMessageCategory(category)}
              sx={combineStyles(
                currentCategoryName === category,
                navItemSx,
                activeNavItemSx
              )}
            >
              {category}
            </Button>
          ))}
        </ButtonGroup>
      )}
    </Box>
  );
};

export default NavBar;

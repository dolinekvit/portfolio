import { Box } from '@chakra-ui/react';
import NavLink from "./nav-link";

export default function Menu() {
  return (
    <Box borderBottom={'xs'} borderBottomColor={'border.subtle'} bg={'bg.subtle'} p={'3'} display={'flex'} justifyContent={'center'} gap={'3'} flexDir={'row'}>
      <NavLink href={"/"} label={"Home"} />
      <NavLink href={"/experience"} label={"Experience"} />
      <NavLink href={"#"} label={"Source"} />
    </Box>
  );
}

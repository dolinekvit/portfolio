import { Box } from '@chakra-ui/react';
import NavLink from './nav-link';
import { GitHubLogoIcon } from "@radix-ui/react-icons";

export default function Menu() {
  return (
    <Box
      borderBottom={'xs'}
      borderBottomColor={'border.subtle'}
      bg={'bg.subtle'}
      _light={{ bg: 'rgba(255, 255, 255, 0.5)', backdropFilter: 'blur(5px)' }}
      _dark={{ bg: 'rgba(32, 32, 35, 0.5)', backdropFilter: 'blur(5px)' }}
      p={'3'}
      position={'sticky'}
      top={'0'}
      display={'flex'}
      justifyContent={'center'}
      gap={'3'}
      flexDir={'row'}
      zIndex={'2'}
    >
      <NavLink href={'/'} label={'Home'} />
      <NavLink href={'/experience'} label={'Experience'} />
      <NavLink href={'https://github.com/dolinekvit/portfolio'} label={'Source'} icon={<GitHubLogoIcon />} linkProps={{ target: '_blank' }}/>
    </Box>
  );
}

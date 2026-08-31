'use client';
import { Box } from '@chakra-ui/react';
import NavLink from './nav-link';
import { GitHubLogoIcon, HamburgerMenuIcon } from '@radix-ui/react-icons';
import { useState } from 'react';

const lightBackground = {  bg: 'rgba(255, 255, 255, 0.5)', backdropFilter: 'blur(5px)' } 
const darkBackground = {  bg: 'rgba(32, 32, 35, 0.5)', backdropFilter: 'blur(5px)'  }

function Links() {
  return (
    <>
      <NavLink href={'/'} label={'Home'} />
      <NavLink href={'/experience'} label={'Experience'} />
      <NavLink
        href={'https://github.com/dolinekvit/portfolio'}
        label={'Source'}
        icon={<GitHubLogoIcon />}
        linkProps={{ target: '_blank' }}
      />
    </>
  );
}

export default function Menu() {
  const [mobileMenuOpen, isMobileMenuOpen] = useState(false);

  const onHamburgerClick = () => isMobileMenuOpen(!mobileMenuOpen)

  return (
    <>
      <Box
        _light={lightBackground}
        _dark={darkBackground}
        p={'3'}
        position={'sticky'}
        display={'flex'}
        justifyContent={'center'}
        top={'0'}
        zIndex={'2'}
      >
        <Box display={{ base: 'none', sm: 'flex' }} gap={'3'}>
          <Links />
        </Box>
        <Box display={{ base: 'flex', sm: 'none' }}>
          <HamburgerMenuIcon onClick={onHamburgerClick} />
        </Box>
      </Box>
      {mobileMenuOpen && (
        <Box
          display={{ base: 'flex', sm: 'none' }}
          _light={lightBackground}
          _dark={darkBackground}
          flexDir={'column'}
          alignItems={'center'}
          gap={'1'}
        >
          <Links />
        </Box>
      )}
    </>
  );
}

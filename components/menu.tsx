'use client';
import { Box, IconButton } from '@chakra-ui/react';
import NavLink from './nav-link';
import { Cross1Icon, GitHubLogoIcon, HamburgerMenuIcon } from '@radix-ui/react-icons';
import { useState } from 'react';

const lightMenuProps = { bg: 'rgba(255, 255, 255, 0.5)', backdropFilter: 'blur(5px)' };
const darkMenuProps = { bg: 'rgba(32, 32, 35, 0.5)', backdropFilter: 'blur(5px)' };

const mobileBreakpoints = { base: 'flex', md: 'none' };
const desktopBreakpoints = { base: 'none', md: 'flex' };

function Links() {
  return (
    <>
      <NavLink href={'/'} label={'Home'} />
      <NavLink href={'/experience'} label={'Experience'} />
      <NavLink href={'/my-work/'} label={'My work'} />
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

  const onHamburgerClick = () => isMobileMenuOpen(!mobileMenuOpen);

  return (
    <>
      <Box
        _light={lightMenuProps}
        _dark={darkMenuProps}
        p={'3'}
        position={'sticky'}
        display={'flex'}
        justifyContent={'center'}
        top={'0'}
        zIndex={'2'}
      >
        <Box display={desktopBreakpoints} gap={'3'}>
          <Links />
        </Box>
        <Box display={mobileBreakpoints}>
          {mobileMenuOpen ? (
            <IconButton variant={'ghost'} size={'xs'} aria-label={'Close menu'} onClick={onHamburgerClick}>
              <Cross1Icon />
            </IconButton>
          ) : (
            <IconButton variant={'ghost'} size={'xs'} aria-label={'Open menu'} onClick={onHamburgerClick}>
              <HamburgerMenuIcon />
            </IconButton>
          )}
        </Box>
      </Box>
      {mobileMenuOpen && (
        <Box
          display={mobileBreakpoints}
          _light={lightMenuProps}
          _dark={darkMenuProps}
          flexDir={'column'}
          alignItems={'center'}
          gap={'1'}
          position={'fixed'}
          width={'full'}
          zIndex={'2'}
          p={'3'}
        >
          <Links />
        </Box>
      )}
    </>
  );
}

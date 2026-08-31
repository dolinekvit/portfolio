'use client';
import { Box } from '@chakra-ui/react';
import NavLink from './nav-link';
import { GitHubLogoIcon, HamburgerMenuIcon } from '@radix-ui/react-icons';
import { useState } from 'react';

export default function Menu() {
  const [mobileMenuOpen, isMobileMenuOpen] = useState(false);
  return (
    <>
      <Box
        _light={{ bg: 'rgba(255, 255, 255, 0.5)', backdropFilter: 'blur(5px)' }}
        _dark={{ bg: 'rgba(32, 32, 35, 0.5)', backdropFilter: 'blur(5px)' }}
        p={'3'}
        position={'sticky'}
        display={'flex'}
        justifyContent={'center'}
        top={'0'}
        zIndex={'2'}
      >
        <Box display={{ base: 'none', sm: 'flex' }} gap={'3'}>
          <NavLink href={'/'} label={'Home'} />
          <NavLink href={'/experience'} label={'Experience'} />
          <NavLink
            href={'https://github.com/dolinekvit/portfolio'}
            label={'Source'}
            icon={<GitHubLogoIcon />}
            linkProps={{ target: '_blank' }}
          />
        </Box>
        <Box display={{ base: 'flex', sm: 'none' }}>
          <HamburgerMenuIcon onClick={() => isMobileMenuOpen(!mobileMenuOpen)} />
        </Box>
      </Box>
      {mobileMenuOpen && (
        <Box
          display={'flex'}
          _light={{ bg: 'rgba(255, 255, 255, 0.5)', backdropFilter: 'blur(5px)' }}
          _dark={{ bg: 'rgba(32, 32, 35, 0.5)', backdropFilter: 'blur(5px)' }}
          flexDir={'column'}
          alignItems={'center'}
          gap={'1'}
        >
          <NavLink href={'/'} label={'Home'} />
          <NavLink href={'/experience'} label={'Experience'} />
          <NavLink
            href={'https://github.com/dolinekvit/portfolio'}
            label={'Source'}
            icon={<GitHubLogoIcon />}
            linkProps={{ target: '_blank' }}
          />
        </Box>
      )}
    </>
  );
}

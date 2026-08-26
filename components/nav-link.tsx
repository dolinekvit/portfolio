'use client';

import NextLink from 'next/link';
import { Link as ChakraLink, type LinkProps as ChakraLinkProps} from '@chakra-ui/react';
import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';

interface LinkProps {
  href: string;
  label: string;
  linkProps?: ChakraLinkProps
  icon?: ReactNode | null;
}

export default function NavLink({ href, label, linkProps, icon }: LinkProps) {
  const path = usePathname();
  const isActive = path === href;

  return (
    <ChakraLink asChild={true} _currentPage={{ fontWeight: 'bold' }} aria-current={isActive ? 'page' : undefined} {...linkProps}>
      <NextLink href={href}>
        {icon}
        {label}
      </NextLink>
    </ChakraLink>
  );
}

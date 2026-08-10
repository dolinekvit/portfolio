'use client'

import NextLink from 'next/link';
import { Link as ChakraLink } from '@chakra-ui/react';
import { usePathname } from 'next/navigation';

interface LinkProps {
  href: string;
  label: string;
}

export default function NavLink({ href, label }: LinkProps) {
  const path = usePathname()
  const isActive = path === href

  return (
    <ChakraLink asChild={true} _currentPage={{ fontWeight: "bold" }} aria-current={isActive ? "page" : undefined}>
      <NextLink href={href}>{label}</NextLink>
    </ChakraLink>
  );
}

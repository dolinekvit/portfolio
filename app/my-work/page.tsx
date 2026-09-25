import { Box, Container, Image, Link, Text } from '@chakra-ui/react';

export default function MyWork() {
  return (
    <Container py={'5'}>
      <Box maxW={'300px'}>
        <Image objectFit={'cover'} src={'/my-homepage.png'} borderRadius={'5px'} alt={'My Homepage showcase'} />
        <Box display={'flex'} flexDir={'column'} alignItems={'center'}>
          <Link href={'https://github.com/dolinekvit/My-Homepage'}><Text>My homepage</Text></Link>
          <Text textStyle={'sm'} fontWeight={'light'}>
            (Chromium extension)
          </Text>
        </Box>
      </Box>
    </Container>
  );
}

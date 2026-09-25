import { Card, Container, Image } from '@chakra-ui/react';

export default function MyWork() {
  return (
    <Container py={'5'}>
      <Card.Root maxW={'300px'} variant={'outline'} borderWidth={'3px'} borderColor={'white'}>
        <Image objectFit={'cover'} src={'/my-homepage.png'} alt={'My Homepage showcase'} />
        <Card.Body p={'1'} textAlign={'center'} borderRadius={'l3'}>
          My homepage
        </Card.Body>
      </Card.Root>
    </Container>
  );
}

import { Box, Em, Heading, Image, Text, Link } from '@chakra-ui/react';
import { Bio } from '@/components/bio';

export default function Home() {
  return (
    <Box display={'flex'} flexDir={'column'} gap={'6'}>
      <Box display={'flex'} gap={'3'} mt={'10'} flexDir={'column'} alignItems={'center'}>
        <Box>
          <Image src="/profile.jpeg" alt="Vít Dolínek" borderRadius={'full'} boxSize={'90px'} />
        </Box>
        <Box display={'flex'} flexDir={'column'} alignItems={'center'}>
          <Heading>Vít Dolínek</Heading>
          <Text>
            <Em>Software engineer</Em>
          </Text>
        </Box>
      </Box>
      <Box display={'flex'} justifyContent={'center'}>
        <Image src={'/torii.png'} alt={'Torii gate'} boxSize={'300px'} />
      </Box>
      <Box>
        <Heading>Work</Heading>
        <Text textStyle={'sm'}>
          I am currently working at Cisco company and am based in Olomouc, Czechia. My expertise is fullstack
          development in React and NodeJS with more than 7 years of experience. I am big fan of CLI tools and make my
          own dotfile configs that you can check out on my <Link href={'https://github.com/dolinekvit/dotfiles'}>Github</Link>. I welcome challenges and try
          to improve both my hard and soft skills.
        </Text>
      </Box>
      <Box>
        <Bio />
      </Box>
    </Box>
  );
}

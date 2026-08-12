import { Box, Em, Heading, Image, Text, Link } from '@chakra-ui/react';
import { Bio } from '@/components/bio';

export default function Home() {
  return (
    <Box display={'flex'} flexDir={'column'} gap={'6'}>
      <div className="mb-6">ANIMATION</div>
      <Box display={'flex'} gap={'3'} flexDir={'row'} justifyContent={'space-between'} alignItems={'center'}>
        <Box display={'flex'} flexDir={'column'}>
          <Heading>Vít Dolínek</Heading>
          <span>
            <Text>
              <Em>Software engineer</Em>
            </Text>
          </span>
        </Box>
        <Box>
          <Image src="/profile.jpeg" alt="Vít Dolínek" borderRadius={'full'} boxSize={'90px'} />
        </Box>
      </Box>
      <Box>
        <Heading>Work</Heading>
        <Text>
          I am currently working at Cisco company and am based in Olomouc, Czechia. My expertise is fullstack
          development in React and NodeJS with more than 7 years of experience. I am big fan of CLI tools and make my
          own dotfile configs that you can check out on my <Link href={'#'}>GitLab</Link>. I welcome challenges and try
          to improve both my hard and soft skills.
        </Text>
      </Box>
      <Box>
        <Bio />
      </Box>
    </Box>
  );
}

import { Box, Em, Heading, Image, Text, Link, DataList } from '@chakra-ui/react';

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
          <Image src="/profile.jpeg" alt="Vít Dolínek" borderRadius={'full'} boxSize={'100px'} />
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
        <Heading>Bio</Heading>
        <DataList.Root gap={'1'} orientation={'horizontal'}>
          <DataList.Item>
            <DataList.ItemLabel minW={'50px'}>1998</DataList.ItemLabel>
            <DataList.ItemValue>Born in Sternberk, Czechia</DataList.ItemValue>
          </DataList.Item>
          <DataList.Item>
            <DataList.ItemLabel minW={'50px'}>2017</DataList.ItemLabel>
            <DataList.ItemValue>High school diploma, SPS a SOU Unicov</DataList.ItemValue>
          </DataList.Item>
          <DataList.Item>
            <DataList.ItemLabel minW={'50px'}>2017</DataList.ItemLabel>
            <DataList.ItemValue>Web developer at Devmates</DataList.ItemValue>
          </DataList.Item>
          <DataList.Item>
            <DataList.ItemLabel minW={'50px'}>2018</DataList.ItemLabel>
            <DataList.ItemValue>Web developer at Orbinet</DataList.ItemValue>
          </DataList.Item>
          <DataList.Item>
            <DataList.ItemLabel minW={'50px'}>2019</DataList.ItemLabel>
            <DataList.ItemValue>Frontend developer at QCM</DataList.ItemValue>
          </DataList.Item>
          <DataList.Item>
            <DataList.ItemLabel minW={'50px'}>2022</DataList.ItemLabel>
            <DataList.ItemValue>Frontend developer at Smartlook</DataList.ItemValue>
          </DataList.Item>
          <DataList.Item>
            <DataList.ItemLabel minW={'50px'}>2023</DataList.ItemLabel>
            <DataList.ItemValue>Software engineer at Cisco</DataList.ItemValue>
          </DataList.Item>
        </DataList.Root>
      </Box>
    </Box>
  );
}

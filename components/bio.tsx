import { Heading, DataList } from '@chakra-ui/react';
import { BioItem } from './bio-item';
import { jobs } from '@/constants/jobs';
import { getYear } from 'date-fns';

export function Bio() {
  return (
    <>
      <Heading>Bio</Heading>
      <DataList.Root gap={'1'} orientation={'horizontal'}>
        {jobs.map(({ position, company, from }) => (
          <BioItem key={company} label={getYear(from)} value={`${position} at ${company}`} />
        ))}
        <BioItem label={2017} value={'High school diploma, SPS a SOU Unicov'} />
      </DataList.Root>
    </>
  );
}

import { jobs } from '@/constants/jobs';
import { Box, Heading, Text } from '@chakra-ui/react';
import { format } from 'date-fns';

export default function Experience() {
  return (
     <Box display={'flex'} flexDir={'column'} gap={'6'}>
        {jobs.map((job) => (
          <Box key={job.company}>
              <Heading>{job.position}</Heading>
              <Text>{job.company}</Text>
              <Text fontSize={'xs'} fontWeight={'thin'}>
                {format(job.from, 'MMMM yyyy')} - {job.to ? format(job.to, 'MMMM yyyy') : 'now'}
              </Text>
            <p>{job.description}</p>
          </Box>
        ))}
      </Box>
  )
}

import { jobs } from '@/constants/jobs';

export default function Experience() {
  return (
     <div>
        <h2>Experience</h2>
        {jobs.map((job) => (
          <div className='flex flex-col gap-1.5' key={job.company}>
            <div>
              <h3 className='font-bold'>{job.position}</h3>
              <span>-</span>
              <span>
                {job.from.toString()} to xx
              </span>
            </div>
            <div className='flex flex-row gap-2'>
              <span className='font-bold'>{job.company}</span>
              <span>-</span>
              <span className='italic'>{job.location}</span>
            </div>
            <p>{job.description}</p>
          </div>
        ))}
      </div>
  )
}

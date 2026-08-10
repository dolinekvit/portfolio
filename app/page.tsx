import Image from 'next/image'

export default function Home() {

  return (
    <div className="flex flex-col align-center p-5">
      <div className="mb-6">
        ANIMATION
      </div>
      <Image
        src="/profile.jpeg"
        width={100}
        height={250}
        alt="Vít Dolínek"
        className="w-28 h-28 flex m-auto bg-grey-600 rounded-full border-2"
      />
      <div>
        <h1>Vít Dolínek</h1>
        <span><i>Software engineer</i></span>
      </div>
  </div>
  );
}

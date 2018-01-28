import Link from 'next/link'

export default () => (
  <div>
    <div className='text-center py-4'>
      <Link href='/'>
        <h1>What's THAT COIN?</h1>
      </Link>
      <p className='font-italic'>TLDR of THAT COIN you're seeking</p>
    </div>
    <style jsx>{`
      h1 {
        cursor: pointer;
      }
    `}</style>
  </div>
)

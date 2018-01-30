import Link from 'next/link'

export default () => (
  <div>
    <div className='text-center py-4'>
      <Link href='/'>
        <h1>Explain that COIN like i'm 5 🧒</h1>
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

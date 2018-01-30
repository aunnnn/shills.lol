import Link from 'next/link'

export default () => (
  <div>
    <div className='text-center py-4'>
      <Link href='/'>
        <h1>It takes too long to know the coin 😩</h1>
      </Link>
      <p>
        <span>Can we TL;DR it?</span>
        &nbsp;🤔
      </p>
    </div>
    <style jsx>{`
      h1 {
        cursor: pointer;
      }
    `}</style>
  </div>
)

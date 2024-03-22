import styles from '@/public/assets/css/loader.module.css'
import Image from 'next/image'

function loading() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="relative">
        <div className={`${styles.loader} ease-linear rounded-3xl absolute top-0 left-0 w-24 h-24 animate-spin bg-gray-900 -z-10`}></div>
        <div className="h-24 w-24 bg-gray-300 rounded-full flex items-center justify-center">
          <Image
            src={'/assets/img/logo.png'}
            width={55}
            height={55}
            alt={'Logo'}
            priority
          />
        </div>
      </div>
    </div>
  )
}

export default loading
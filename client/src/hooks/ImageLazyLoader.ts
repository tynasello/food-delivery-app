import { useEffect, useState } from 'react'
import landing from '../assets/image/landing.png'

const useImageLazyLoader = (tinySrc: string, normalSrc: string) => {
  const [src, setSrc] = useState(tinySrc)

  useEffect(() => {
    setSrc(tinySrc)

    const img = new Image()
    img.src = `${landing}`

    img.onload = () => {
      setSrc(normalSrc)
    }
  }, [tinySrc, normalSrc])

  return [src, { blur: src === tinySrc }]
}

export default useImageLazyLoader

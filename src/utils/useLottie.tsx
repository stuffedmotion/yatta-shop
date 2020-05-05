/* eslint-disable react/jsx-props-no-spreading */
import lottie, { AnimationConfig, AnimationItem } from 'lottie-web'
import React, { useEffect, useRef, useState } from 'react'

type UseLottieHook = (
  config: AnimationConfig,
  wrapperProps: React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  >
) => {
  Lottie: JSX.Element
  anim: AnimationItem
}

const useLottie: UseLottieHook = (config, wrapperProps) => {
  const { name } = config

  const elem = useRef<HTMLDivElement>()
  const [anim, setAnim] = useState<AnimationItem>(null)

  useEffect(() => {
    if (elem.current) {
      const configWithContainer = {
        ...config,
        container: elem.current,
      } as AnimationConfig

      const animInstance = lottie.loadAnimation(configWithContainer)
      setAnim(animInstance)
    }
    return () => {
      lottie.destroy(name)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [elem])

  const Lottie = <div {...wrapperProps} ref={elem} />

  return { Lottie, anim }
}

export default useLottie

import { useEffect, useLayoutEffect } from 'react'

const useIsomorphicLayoutEffect = process.browser ? useLayoutEffect : useEffect

export default useIsomorphicLayoutEffect

import { useEffect, useRef } from 'react'

function usePreviousValueOfVariable<T>(value: T):  T | undefined {
  const ref = useRef<T>();
  useEffect(() => {
    ref.current = value;
  },[value]);
  return ref.current;
}
export default usePreviousValueOfVariable;

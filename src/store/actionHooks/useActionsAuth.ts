import { useMemo } from 'react'
import { slice } from '../auth'
import { bindActionCreators } from 'redux'
import { useAppDispatch } from '../'

const useActionsAuth = () => {
  const { actions } = slice
  const dispatch = useAppDispatch()

  return useMemo(() => bindActionCreators(actions, dispatch), [actions, dispatch])
}

export default useActionsAuth

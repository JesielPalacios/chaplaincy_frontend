import React, { useCallback, useContext, useState } from 'react'
import { Context } from '../context/UserContext'
import { createMatterCancellationService } from '../../services/matterCancellation.service'

export const useMatterCancellation = () => {
  const { isAuth } = useContext(Context)
  const [state, setState] = useState({ loading: false, error: false })

  const createMatterCancellation = useCallback(
    ({
      subjectToCancel,
      teacher,
      lastDateOfClassAttendance,
      studentSignature,
    }) => {
      setState({ loading: true, error: false })

      createMatterCancellationService({
        subjectToCancel,
        teacher,
        lastDateOfClassAttendance,
        studentSignature,
        token: isAuth,
      }).catch((err) => {
        setState({ loading: false, error: true })
        console.error(err)
      })
    },
    []
  )

  return {
    loading: state.loading,
    error: state.error,
    createMatterCancellation,
  }
}

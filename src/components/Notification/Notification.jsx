import { Alert } from '@mui/material'
import React from 'react'
import { useDispatch } from 'react-redux'
import { uiActions } from '../../store/uiSlice'

const Notification = ({type, message}) => {
  const dispatch = useDispatch()
  const handleClose = () => {
    dispatch(uiActions.showUi({
        open: false,
      }))
  }
  return (
    <Alert onClose={handleClose} severity={type}>{message}</Alert>
  )
}

export default Notification
import React from 'react'
import { Route, Redirect } from 'react-router-dom'

export default function TestRoute({ component, ...props }) {
  const Component = component
  return (
    <Route
      {...props}
      render={componentProps => (
        <Component {...componentProps} />
      )}
    />
  )
}

type LoadingStateProps = {
  message: string
}

export function LoadingState({ message }: LoadingStateProps) {
  return (
    <div className="state-message" role="status">
      {message}
    </div>
  )
}

import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

/** Legacy route — redirects to home projects section */
export const ProjectsPage = () => {
  const navigate = useNavigate()

  useEffect(() => {
    navigate('/', { replace: true, state: { scrollTo: 'projects' } })
  }, [navigate])

  return null
}
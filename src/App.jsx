import { useState } from 'react'
import { Navigate, Routes, Route, useNavigate, useParams } from 'react-router-dom'
import useIsMobile from './hooks/useIsMobile'
import { slugify } from './utils/slugify'
import HomeView from './components/HomeView'
import Projects from './components/Projects'
import Experience from './components/Experience'
import Education from './components/Education'
import CreativeView from './components/CreativeView'
import { columns } from './data/columns'

const DEFAULT_POSITIONS = [
  { x: 500, y: 40 },
  { x: 860, y: 150 },
  { x: 540, y: 340 },
  { x: 900, y: 470 },
]

const LAYOUTS = {
  projects: Projects,
  experience: Experience,
  education: Education,
}

function Home({ positions, onMove }) {
  const isMobile = useIsMobile()
  const navigate = useNavigate()
  const [hovered, setHovered] = useState(-1)
  const [selected, setSelected] = useState(-1)

  const openProject = (index) => navigate(`/${columns[index].id}`)

  const tapMobile = (index) => {
    if (selected === index) {
      openProject(index)
      return
    }
    setSelected(index)
  }

  return (
    <HomeView
      isMobile={isMobile}
      positions={positions}
      hovered={hovered}
      selected={selected}
      onHover={setHovered}
      onMove={onMove}
      onOpen={openProject}
      onMobileTap={tapMobile}
      onDeselect={() => setSelected(-1)}
    />
  )
}

function ColumnRoute() {
  const { columnId, part1, part2 } = useParams()
  const navigate = useNavigate()
  const isMobile = useIsMobile()
  const column = columns.find((c) => c.id === columnId)

  if (!column) return <Navigate to="/" replace />

  const goHome = () => navigate('/')

  if (column.subcategories) {
    const subKey = column.subcategories.some((sub) => sub.id === part1)
      ? part1
      : column.subcategories[0].id
    return (
      <CreativeView
        isMobile={isMobile}
        column={column}
        subKey={subKey}
        itemKey={part2 ?? null}
        onNavigate={(sub, item) =>
          navigate(item != null ? `/${columnId}/${sub}/${item}` : `/${columnId}/${sub}`)
        }
        onBack={goHome}
      />
    )
  }

  const foundIndex = part1
    ? column.items.findIndex((item) => slugify(item.name) === part1)
    : 0
  const activeItem = foundIndex === -1 ? 0 : foundIndex

  const Layout = LAYOUTS[column.layout] ?? Projects

  return (
    <Layout
      isMobile={isMobile}
      column={column}
      activeItem={activeItem}
      onSetActiveItem={(index) => navigate(`/${columnId}/${slugify(column.items[index].name)}`)}
      onBack={goHome}
    />
  )
}

export default function App() {
  const [positions, setPositions] = useState(DEFAULT_POSITIONS)

  const moveFolder = (index, nextPosition) => {
    setPositions((current) =>
      current.map((position, positionIndex) =>
        positionIndex === index ? nextPosition : position,
      ),
    )
  }

  return (
    <Routes>
      <Route path="/" element={<Home positions={positions} onMove={moveFolder} />} />
      <Route path="/:columnId" element={<ColumnRoute />} />
      <Route path="/:columnId/:part1" element={<ColumnRoute />} />
      <Route path="/:columnId/:part1/:part2" element={<ColumnRoute />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

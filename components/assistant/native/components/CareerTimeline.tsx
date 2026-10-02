import { useEffect, useState } from 'react'
import { fetchTimeline, getErrorMessage, type TimelineNode } from '../services/api'
import { Overlay } from './FitPanel'
import { MonoLabel } from './ui'

export function CareerTimeline({
  onClose,
  onAsk,
}: {
  onClose: () => void
  onAsk: (query: string) => void
}) {
  const [nodes, setNodes] = useState<TimelineNode[]>([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    void fetchTimeline()
      .then(setNodes)
      .catch((err: unknown) => setError(getErrorMessage(err).message))
      .finally(() => setLoading(false))
  }, [])

  return (
    <Overlay title="CAREER TIMELINE" onClose={onClose}>
      {error ? (
        <p role="alert" style={{ color: 'rgba(248,196,100,0.85)' }}>{error}</p>
      ) : loading ? (
        <p role="status" style={{ color: 'rgba(255,255,255,0.45)' }}>Loading verified timeline…</p>
      ) : null}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
        {nodes.map((node, index) => (
          <button
            key={node.id}
            type="button"
            onClick={() => onAsk(`${node.title} at ${node.organization}`)}
            style={{
              display: 'grid',
              gridTemplateColumns: '72px 16px 1fr',
              gap: 12,
              textAlign: 'left',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '4px 0',
            }}
          >
            <MonoLabel color="rgba(155,124,255,0.7)">{node.year}</MonoLabel>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  background: 'rgba(155,124,255,0.8)',
                  marginTop: 4,
                }}
              />
              {index < nodes.length - 1 && (
                <div style={{ width: 1, flex: 1, minHeight: 28, background: 'rgba(155,124,255,0.2)' }} />
              )}
            </div>
            <div style={{ paddingBottom: 16 }}>
              <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.84)' }}>{node.title}</div>
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', marginTop: 2 }}>{node.organization}</div>
              <div style={{ fontSize: 12.5, color: 'rgba(255,255,255,0.55)', marginTop: 6, lineHeight: 1.5 }}>
                {node.detail}
              </div>
            </div>
          </button>
        ))}
      </div>
    </Overlay>
  )
}

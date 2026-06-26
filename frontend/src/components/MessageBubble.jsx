import React from 'react'

function parseMarkdown(text) {
  const lines = text.split('\n')
  return lines.map((line, lineIdx) => {
    const segments = line.split(/(\*\*.*?\*\*|\*.*?\*)/g)
    const rendered = segments.map((seg, i) => {
      if (seg.startsWith('**') && seg.endsWith('**')) {
        return <strong key={i}>{seg.slice(2, -2)}</strong>
      }
      if (seg.startsWith('*') && seg.endsWith('*') && seg.length > 2) {
        return <em key={i}>{seg.slice(1, -1)}</em>
      }
      return seg
    })
    return (
      <React.Fragment key={lineIdx}>
        {rendered}
        {lineIdx < lines.length - 1 && <br />}
      </React.Fragment>
    )
  })
}

function formatTime(date) {
  return date.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })
}

export default function MessageBubble({ message }) {
  const isUser = message.role === 'user'

  return (
    <div className={`message message--${message.role}`}>
      <div className="message-row">
        {!isUser && (
          <div className="msg-avatar msg-avatar--assistant">🌿</div>
        )}
        <div className={`msg-bubble msg-bubble--${message.role}`}>
          {parseMarkdown(message.text)}
        </div>
        {isUser && (
          <div className="msg-avatar msg-avatar--user">👤</div>
        )}
      </div>
      <span className="msg-time">{formatTime(message.timestamp)}</span>
    </div>
  )
}

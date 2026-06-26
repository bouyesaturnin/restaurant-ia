import { useEffect, useRef } from 'react'
import { UtensilsCrossed } from 'lucide-react'
import MessageBubble from './MessageBubble'
import TypingIndicator from './TypingIndicator'
import QuickActions from './QuickActions'
import InputBar from './InputBar'

export default function ChatArea({ messages, isTyping, onSend, onQuickAction, onShowMenu }) {
  const bottomRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isTyping])

  return (
    <div className="chat-area">
      {/* Header */}
      <div className="chat-header">
        <div className="chat-header-left">
          <div className="chat-avatar">
            <UtensilsCrossed size={16} strokeWidth={1.8} />
          </div>
          <div>
            <div className="chat-header-name">Assistant du Jardin Doré</div>
            <div className="chat-header-sub">Cuisine méditerranéenne · Paris</div>
          </div>
        </div>
        <div className="status-badge">
          <span className="status-dot" />
          En ligne
        </div>
      </div>

      {/* Messages */}
      <div className="message-list">
        {messages.map(msg => (
          <MessageBubble key={msg.id} message={msg} />
        ))}
        {isTyping && <TypingIndicator />}
        <div ref={bottomRef} />
      </div>

      {/* Quick actions */}
      <QuickActions onAction={onQuickAction} disabled={isTyping} />

      {/* Input */}
      <InputBar onSend={onSend} disabled={isTyping} />
    </div>
  )
}

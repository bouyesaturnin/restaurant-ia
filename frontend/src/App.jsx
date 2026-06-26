import Sidebar from './components/Sidebar'
import ChatArea from './components/ChatArea'
import MenuPanel from './components/MenuPanel'
import { useAgent } from './hooks/useAgent'

export default function App() {
  const { messages, isTyping, showMenu, setShowMenu, sendMessage, triggerQuickAction } = useAgent()

  return (
    <div className="app">
      <div className="app-glow" />

      <Sidebar onNavigate={triggerQuickAction} />

      <ChatArea
        messages={messages}
        isTyping={isTyping}
        onSend={sendMessage}
        onQuickAction={triggerQuickAction}
        onShowMenu={() => setShowMenu(true)}
      />

      {showMenu && <MenuPanel onClose={() => setShowMenu(false)} />}
    </div>
  )
}

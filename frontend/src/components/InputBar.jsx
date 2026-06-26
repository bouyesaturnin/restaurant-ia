import { useState, useRef, useCallback } from 'react'
import { Send } from 'lucide-react'

export default function InputBar({ onSend, disabled }) {
  const [value, setValue] = useState('')
  const textareaRef = useRef(null)

  const submit = useCallback(() => {
    const text = value.trim()
    if (!text || disabled) return
    onSend(text)
    setValue('')
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
    }
  }, [value, disabled, onSend])

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      submit()
    }
  }

  const handleChange = (e) => {
    setValue(e.target.value)
    const el = e.target
    el.style.height = 'auto'
    el.style.height = Math.min(el.scrollHeight, 110) + 'px'
  }

  return (
    <div className="input-bar">
      <textarea
        ref={textareaRef}
        className="input-field"
        rows={1}
        placeholder="Tapez votre message… (Entrée pour envoyer)"
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        disabled={disabled}
      />
      <button
        className="send-btn"
        onClick={submit}
        disabled={!value.trim() || disabled}
        aria-label="Envoyer"
      >
        <Send size={16} strokeWidth={2.2} />
      </button>
    </div>
  )
}

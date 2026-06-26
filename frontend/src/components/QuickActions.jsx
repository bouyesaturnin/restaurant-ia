const ACTIONS = [
  { label: '🗓 Réserver une table', msg: 'Je voudrais réserver une table' },
  { label: '🍽 Voir le menu', msg: 'Montrez-moi le menu' },
  { label: '📦 Commander à emporter', msg: 'Je veux commander à emporter' },
  { label: '🕐 Horaires', msg: 'Quels sont vos horaires ?' },
  { label: '📍 Adresse', msg: 'Quelle est votre adresse ?' },
]

export default function QuickActions({ onAction, disabled }) {
  return (
    <div className="quick-actions">
      {ACTIONS.map(a => (
        <button
          key={a.label}
          className="quick-btn"
          onClick={() => onAction(a.msg)}
          disabled={disabled}
        >
          {a.label}
        </button>
      ))}
    </div>
  )
}

import { useState } from 'react'
import { X } from 'lucide-react'
import { RESTAURANT, MENU_CATEGORIES, DIETARY_FILTERS } from '../data/restaurant'

function ItemTag({ tag }) {
  if (tag === 'végétarien') return <span className="item-tag item-tag--vegetarien">🌿 Végétarien</span>
  if (tag === 'vegan')       return <span className="item-tag item-tag--vegan">🌱 Vegan</span>
  if (tag === 'sans gluten') return <span className="item-tag item-tag--sg">🚫 Sans Gluten</span>
  return null
}

function AllergenTag({ allergen }) {
  return <span className="item-tag item-tag--allergen">⚠ {allergen}</span>
}

function MenuItem({ item }) {
  return (
    <div className="menu-item">
      <div className="menu-item-top">
        <span className="menu-item-name">{item.name}</span>
        <span className="menu-item-price">{item.price}€</span>
      </div>
      <p className="menu-item-desc">{item.desc}</p>
      <div className="menu-item-footer">
        {item.tags.map(t => <ItemTag key={t} tag={t} />)}
        {item.allergens.map(a => <AllergenTag key={a} allergen={a} />)}
      </div>
    </div>
  )
}

export default function MenuPanel({ onClose }) {
  const [activeCategory, setActiveCategory] = useState('entrees')
  const [activeFilter, setActiveFilter] = useState('all')

  const items = RESTAURANT.menu[activeCategory] || []
  const filtered = activeFilter === 'all'
    ? items
    : items.filter(item => item.tags.includes(activeFilter))

  return (
    <>
      <div className="menu-overlay" onClick={onClose} />
      <div className="menu-panel" role="dialog" aria-label="Carte du restaurant">
        <div className="menu-panel-header">
          <div className="menu-title-row">
            <h2 className="menu-panel-title">Notre Carte</h2>
            <button className="menu-close" onClick={onClose} aria-label="Fermer">
              <X size={14} />
            </button>
          </div>

          <div className="menu-tabs">
            {MENU_CATEGORIES.map(cat => (
              <button
                key={cat.key}
                className={`menu-tab${activeCategory === cat.key ? ' active' : ''}`}
                onClick={() => { setActiveCategory(cat.key); setActiveFilter('all') }}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        <div className="menu-body">
          <div className="menu-filters">
            {DIETARY_FILTERS.map(f => (
              <button
                key={f.key}
                className={`filter-btn${activeFilter === f.key ? ' active' : ''}`}
                onClick={() => setActiveFilter(f.key)}
              >
                {f.label}
              </button>
            ))}
          </div>

          {filtered.length === 0 ? (
            <div className="empty-filter">
              Aucun plat ne correspond à ce filtre dans cette catégorie.
            </div>
          ) : (
            filtered.map(item => <MenuItem key={item.id} item={item} />)
          )}
        </div>
      </div>
    </>
  )
}

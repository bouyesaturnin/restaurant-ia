import { Calendar, UtensilsCrossed, Package, Clock, MapPin, Phone, Star, ChevronRight } from 'lucide-react'
import { RESTAURANT } from '../data/restaurant'

const NAV_ITEMS = [
  { icon: Calendar,        label: 'Réservation',        msg: 'Je voudrais réserver une table' },
  { icon: UtensilsCrossed, label: 'Menu & Allergènes',  msg: 'Montrez-moi le menu' },
  { icon: Package,         label: 'À emporter',         msg: 'Je veux commander à emporter' },
  { icon: Clock,           label: 'Horaires',            msg: 'Quels sont vos horaires ?' },
  { icon: MapPin,          label: 'Adresse & Accès',    msg: 'Quelle est votre adresse ?' },
  { icon: Phone,           label: 'Contact',             msg: 'Comment vous contacter ?' },
  { icon: Star,            label: 'Laisser un avis',    msg: "J'ai quelque chose à vous dire sur mon expérience" },
]

export default function Sidebar({ onNavigate }) {
  return (
    <aside className="sidebar">
      {/* Brand */}
      <div className="sidebar-brand">
        <div className="brand-logo">
          <span className="brand-leaf" style={{ fontSize: 22 }}>🌿</span>
          <span className="brand-name">{RESTAURANT.name}</span>
        </div>
        <p className="brand-tagline">{RESTAURANT.tagline}</p>
        <div className="brand-divider" />
      </div>

      {/* Nav */}
      <nav className="sidebar-nav">
        <p className="nav-section-label">Services</p>
        {NAV_ITEMS.map(({ icon: Icon, label, msg }) => (
          <button
            key={label}
            className="nav-item"
            onClick={() => onNavigate(msg)}
          >
            <Icon size={15} strokeWidth={1.8} className="nav-icon" />
            <span style={{ flex: 1 }}>{label}</span>
            <ChevronRight size={13} className="nav-icon" style={{ opacity: 0.4 }} />
          </button>
        ))}
      </nav>

      {/* Info */}
      <div className="sidebar-info">
        <p className="info-title">Informations</p>
        <div className="info-row">
          <MapPin size={12} />
          <span>{RESTAURANT.address}</span>
        </div>
        <div className="info-row">
          <Phone size={12} />
          <span>{RESTAURANT.phone}</span>
        </div>
        <div className="info-row" style={{ alignItems: 'flex-start' }}>
          <Clock size={12} style={{ marginTop: 2 }} />
          <div className="info-hours">
            {Object.entries(RESTAURANT.hours).map(([day, time]) => (
              <div key={day} className="info-hours-row">
                <span className="info-hours-day">{day}</span>
                <span className="info-hours-time" style={{ color: time === 'Fermé' ? '#f87171' : undefined }}>
                  {time}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </aside>
  )
}

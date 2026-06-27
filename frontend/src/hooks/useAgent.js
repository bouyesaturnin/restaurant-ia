import { useState, useCallback } from 'react'
import { RESTAURANT } from '../data/restaurant'

const API_URL = `${import.meta.env.VITE_API_BASE || ''}/api/chat/`

// Tente d'appeler le backend Django ; si absent ou sans clé, retourne null
async function fetchBackend(history) {
  try {
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages: history }),
    })
    if (!res.ok) return null
    const data = await res.json()
    return data.reply || null
  } catch {
    return null
  }
}

// ── FSM local (fallback sans API) ────────────────────────────
const STATES = {
  IDLE: 'idle',
  RES_NAME: 'res_name',
  RES_DATE: 'res_date',
  RES_TIME: 'res_time',
  RES_GUESTS: 'res_guests',
  ORDER_COLLECT: 'order_collect',
  ORDER_PICKUP: 'order_pickup',
}

function normalize(text) {
  return text.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '')
}

function detectIntent(text) {
  const t = normalize(text)
  if (/reserver|reservation|table|book|une place/.test(t)) return 'RESERVATION'
  if (/horaire|heure|ouvert|ferme|quand/.test(t)) return 'FAQ_HOURS'
  if (/adresse|ou etes|situe|trouver|chemin|comment venir/.test(t)) return 'FAQ_ADDRESS'
  if (/contact|telephone|appel|email|joindre/.test(t)) return 'FAQ_CONTACT'
  if (/allergi|intoleran|sans gluten|vegeta|vegan/.test(t)) return 'FAQ_ALLERGIES'
  if (/menu|carte|plat|manger|que proposez|qu.est.ce que/.test(t)) return 'MENU'
  if (/commander|emporter|takeaway|pickup|recuperer|a emporter/.test(t)) return 'ORDER'
  if (/merci|excellent|super|parfait|bravo|ravi|adore|incroyable/.test(t)) return 'REVIEW_POSITIVE'
  if (/mauvais|horrible|decep|decu|probleme|insatisf|nul|catastrophe/.test(t)) return 'REVIEW_NEGATIVE'
  if (/bonjour|salut|hello|bonsoir|hey|coucou/.test(t)) return 'GREETING'
  if (/au revoir|bye|adieu|bonne soiree|bonne nuit|a bientot/.test(t)) return 'GOODBYE'
  return 'UNKNOWN'
}

function localReply(text, flowState, setFlowState, setShowMenu) {
  const { state, data } = flowState

  if (state === STATES.RES_NAME) {
    const name = text.trim()
    if (name.length < 2) return 'Pourriez-vous me donner un nom valide ? 😊'
    setFlowState({ state: STATES.RES_DATE, data: { ...data, name } })
    return `Merci **${name}** ! 😊\n\nPour quelle **date** souhaitez-vous réserver ?\n*(ex : ce vendredi, 28 juin, samedi prochain)*`
  }
  if (state === STATES.RES_DATE) {
    const date = text.trim()
    setFlowState({ state: STATES.RES_TIME, data: { ...data, date } })
    return `Parfait, le **${date}** ! 📅\n\nÀ quelle **heure** préférez-vous ?\n\n• Mar–Ven : 12h–14h30 et 19h–22h30\n• Sam : 12h–15h et 19h–23h\n• Dim : 12h–15h`
  }
  if (state === STATES.RES_TIME) {
    const time = text.trim()
    setFlowState({ state: STATES.RES_GUESTS, data: { ...data, time } })
    return `**${time}**, c'est noté ! 🕐\n\nCombien de **personnes** serez-vous ?`
  }
  if (state === STATES.RES_GUESTS) {
    const num = parseInt(text.trim())
    if (isNaN(num) || num < 1) return 'Merci d\'indiquer un nombre de personnes valide (ex : 2, 4).'
    const { name, date, time } = data
    setFlowState({ state: STATES.IDLE, data: {} })
    return `Récapitulatif de votre réservation :\n\n📋 **Nom** : ${name}\n📅 **Date** : ${date}\n🕐 **Heure** : ${time}\n👥 **Couverts** : ${num} personne${num > 1 ? 's' : ''}\n\n✅ Votre table est **confirmée** ! Nous avons hâte de vous accueillir.\n\n*Pour toute modification, appelez-nous au ${RESTAURANT.phone}.*`
  }
  if (state === STATES.ORDER_COLLECT) {
    const items = text.trim()
    setFlowState({ state: STATES.ORDER_PICKUP, data: { ...data, items } })
    return `Noté ! J'ai bien votre commande.\n\nÀ quelle **heure** souhaitez-vous venir récupérer ?\n*(ex : 13h00, dans 30 minutes)*`
  }
  if (state === STATES.ORDER_PICKUP) {
    const pickup = text.trim()
    const { items } = data
    setFlowState({ state: STATES.IDLE, data: {} })
    return `Récapitulatif de votre **commande à emporter** :\n\n🛍 **Commande** : ${items}\n⏰ **Récupération** : ${pickup}\n\n✅ Commande **confirmée** ! Présentez-vous au comptoir à l'heure indiquée. 🙏`
  }

  const intent = detectIntent(text)
  switch (intent) {
    case 'GREETING':
      return `Bonjour et bienvenue ! 😊\n\nComment puis-je vous aider ? **Réservation**, **menu**, **commande à emporter** ou une **question** ?`
    case 'GOODBYE':
      return `Au revoir et à très bientôt au **Jardin Doré** ! 🌿 Bonne journée ! ✨`
    case 'RESERVATION':
      setFlowState({ state: STATES.RES_NAME, data: {} })
      return `Je serais ravi de vous réserver une table ! 🗓\n\nPour commencer, pourriez-vous me donner votre **nom complet** ?`
    case 'FAQ_HOURS': {
      const lines = Object.entries(RESTAURANT.hours).map(([d, h]) => `• **${d}** : ${h}`).join('\n')
      return `🕐 **Nos horaires :**\n\n${lines}\n\nNous vous recommandons de réserver à l'avance, surtout le week-end !`
    }
    case 'FAQ_ADDRESS':
      return `📍 **Notre adresse :**\n\n${RESTAURANT.address}\n\n🚇 Métro Saint-Philippe-du-Roule (ligne 9) — 3 min à pied\n🚗 Parking Haussmann à 200 m`
    case 'FAQ_CONTACT':
      return `📞 **Contact :**\n\n• Téléphone : ${RESTAURANT.phone}\n• Email : ${RESTAURANT.email}\n• Disponible tous les jours de 10h à 22h`
    case 'FAQ_ALLERGIES':
      setShowMenu(true)
      return `Bien sûr, voici nos plats adaptés selon les allergies courantes :\n\n**🦐 Allergie aux fruits de mer / mollusques :**\nÉvitez le Poulpe Grillé et le Tataki de Thon. Tous nos autres plats sont sans fruits de mer.\n\n**🌾 Sans gluten :**\nBurrata, Gaspacho, Daurade, Risotto, Poulpe, Buddha Bowl, Crème Brûlée, Sorbet.\n\n**🥛 Sans lactose :**\nGaspacho Andalou, Daurade, Agneau Méchoui, Tataki de Thon, Sorbet Citron.\n\nJe vous affiche la carte complète avec les filtres. N'hésitez pas à préciser votre allergie pour une recommandation personnalisée ! 😊`
    case 'MENU':
      setShowMenu(true)
      return `Voici notre **carte** ! 🍽\n\nFiltrez par préférence : 🌿 Végétarien · 🌱 Vegan · 🚫 Sans gluten\n\nDes questions sur les **allergènes** ? Je suis là.`
    case 'ORDER':
      setFlowState({ state: STATES.ORDER_COLLECT, data: {} })
      setShowMenu(true)
      return `Parfait pour une **commande à emporter** ! 📦\n\nConsultez la carte et décrivez-moi votre sélection.`
    case 'REVIEW_POSITIVE':
      return `Merci infiniment pour ces mots si chaleureux ! 🙏✨\n\nToute notre équipe s'investit avec passion. Nous serions ravis de vous retrouver très bientôt ! 🌿`
    case 'REVIEW_NEGATIVE':
      return `Je suis sincèrement navré que votre expérience n'ait pas été à la hauteur. 😔\n\nVotre retour est précieux. Contactez-nous directement :\n📞 ${RESTAURANT.phone}\n📧 ${RESTAURANT.email}\n\nNous ferons tout pour arranger les choses.`
    default:
      return `Je suis là pour vous aider ! 😊\n\n🗓 **Réservation** · 🍽 **Menu** · 📦 **À emporter** · ❓ **Infos pratiques** · ⭐ **Avis**\n\nQue souhaitez-vous faire ?`
  }
}

// ─────────────────────────────────────────────────────────────

function makeMsg(role, text) {
  return { id: Date.now() + Math.random(), role, text, timestamp: new Date() }
}

const WELCOME = `Bonsoir et bienvenue au **Jardin Doré** ! 🌿

Je suis votre assistant personnel. Je peux vous aider avec :

• 🗓 **Réserver** une table
• 🍽 Consulter notre **menu** complet
• 📦 Passer une **commande à emporter**
• ❓ Vos **questions** (horaires, adresse, contact)
• ⭐ Partager votre **avis**

Comment puis-je vous être utile ?`

export function useAgent() {
  const [messages, setMessages] = useState([makeMsg('assistant', WELCOME)])
  const [history, setHistory] = useState([])
  const [flowState, setFlowState] = useState({ state: STATES.IDLE, data: {} })
  const [isTyping, setIsTyping] = useState(false)
  const [showMenu, setShowMenu] = useState(false)

  const sendMessage = useCallback(async (text) => {
    if (!text.trim() || isTyping) return

    setMessages(prev => [...prev, makeMsg('user', text)])
    const newHistory = [...history, { role: 'user', content: text }]
    setHistory(newHistory)
    setIsTyping(true)

    await new Promise(r => setTimeout(r, 600 + Math.random() * 500))

    // Essaie le backend ; sinon utilise le FSM local
    const backendReply = await fetchBackend(newHistory)
    let replyText

    if (backendReply) {
      replyText = backendReply
      setHistory(prev => [...prev, { role: 'assistant', content: replyText }])
    } else {
      replyText = localReply(text, flowState, setFlowState, setShowMenu)
    }

    setIsTyping(false)
    setMessages(prev => [...prev, makeMsg('assistant', replyText)])
  }, [history, isTyping, flowState])

  const triggerQuickAction = useCallback((msg) => {
    sendMessage(msg)
  }, [sendMessage])

  return { messages, isTyping, showMenu, setShowMenu, sendMessage, triggerQuickAction }
}

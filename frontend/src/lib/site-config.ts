// Single source of truth for SAAU contact info, links, and placeholder copy.
// Edit values here when real data is available.

export const siteConfig = {
  name: 'SAAU',
  fullName: 'Sociedade de Amparo aos Animais de Umuarama',
  city: 'Umuarama, PR',
  tagline: 'Aqui ninguém fica para trás.',
  founded: 2014,

  address: {
    street: 'Av. Bento Munhoz da Rocha, 845',
    district: 'Centro',
    city: 'Umuarama',
    state: 'PR',
    zip: '87501-040',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Av.+Bento+Munhoz+da+Rocha+845+Umuarama+PR',
  },

  hours: 'Segunda a sábado · 9h às 17h',

  social: {
    instagram: { handle: '@saau.umuarama', url: 'https://instagram.com/saau.umuarama' },
    facebook:  { handle: 'saau.umuarama',  url: 'https://facebook.com/saau.umuarama' },
    whatsapp:  { display: '(44) 99999-9999', e164: '5544999999999' },
  },

  donate: {
    pix: {
      key: 'contato@saau.org.br',
      keyType: 'E-mail',
    },
    bank: {
      name: 'SICREDI',
      agency: '0726',
      account: '38558-0',
      type: 'Conta Corrente',
      cnpj: '00.000.000/0001-00',
      holder: 'Sociedade de Amparo aos Animais de Umuarama',
    },
  },

  stats: [
    { value: '+240', label: 'animais resgatados' },
    { value: '12', label: 'anos cuidando' },
    { value: '30+', label: 'voluntários' },
  ],
} as const

export function whatsappLink(message: string) {
  const num = siteConfig.social.whatsapp.e164
  return `https://wa.me/${num}?text=${encodeURIComponent(message)}`
}

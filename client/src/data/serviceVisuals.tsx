import editorialCastingImage from '../assets/editorial-casting-campaign.jpg'
import productionCastingImage from '../assets/production-casting-set.jpg'
import talentCastingImage from '../assets/talent-casting-stage-updated.jpg'
import talentManagementImage from '../assets/talent-management-studio.jpg'
import { IconClapperBadge, IconFilmCameraBadge, IconNetworkBadge, IconSpotlightBadge } from '../components/icons'

export const serviceVisuals = {
  spotlight: {
    Badge: IconSpotlightBadge,
    image: talentCastingImage,
    imageAlt: 'The Pomelo Casting studio stage, lit with teal and magenta neon',
    imageObjectPosition: 'center 40%',
    kicker: 'Casting',
  },
  hanger: {
    Badge: IconFilmCameraBadge,
    image: editorialCastingImage,
    imageAlt: 'A model in a purple suit on an editorial campaign set',
    imageObjectPosition: 'center 38%',
    kicker: 'Editorial',
  },
  clapper: {
    Badge: IconClapperBadge,
    image: productionCastingImage,
    imageAlt: 'A silhouette walking a Pomelo Casting production set lit in teal and magenta',
    imageObjectPosition: 'center 35%',
    kicker: 'Production',
  },
  star: {
    Badge: IconNetworkBadge,
    image: talentManagementImage,
    imageAlt: 'The Pomelo Casting studio moodboard wall and monitor setup',
    imageObjectPosition: 'center 30%',
    kicker: 'Management',
  },
} as const

import editorialCastingImage from '../assets/editorial-casting-newspaper.jpg'
import productionCastingImage from '../assets/production-casting-set.jpg'
import talentCastingImage from '../assets/talent-casting-studio-blue.jpg'
import talentManagementImage from '../assets/talent-management-studio.jpg'
import { IconClapperBadge, IconFilmCameraBadge, IconNetworkBadge, IconSpotlightBadge } from '../components/icons'

export const serviceVisuals = {
  spotlight: {
    Badge: IconSpotlightBadge,
    image: talentCastingImage,
    imageAlt: 'Crew and talent preparing for a shoot under blue lantern lighting on the Pomelo Casting studio floor',
    imageObjectPosition: 'center 68%',
    kicker: 'Casting',
  },
  hanger: {
    Badge: IconFilmCameraBadge,
    image: editorialCastingImage,
    imageAlt: "A model reading a mock newspaper headlined 'Casting Anew: The Pomelo Journey' against a purple-to-blue gradient backdrop",
    imageObjectPosition: 'center 45%',
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

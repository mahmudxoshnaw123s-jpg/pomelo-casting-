import editorialCastingImage from '../assets/editorial-casting-campaign.jpg'
import productionCastingImage from '../assets/production-casting-set.jpg'
import talentCastingImage from '../assets/talent-casting-stage.jpg'
import talentManagementImage from '../assets/talent-management-studio.jpg'
import { IconClapperBadge, IconFilmCameraBadge, IconNetworkBadge, IconSpotlightBadge } from '../components/icons'
import { CastingScene, EditorialScene, ManagementScene, ProductionScene } from '../components/ServiceScenes'

export const serviceVisuals = {
  spotlight: {
    Badge: IconSpotlightBadge,
    Scene: CastingScene,
    image: talentCastingImage,
    imageAlt: 'The Pomelo Casting studio stage, lit with teal and magenta neon',
    imageObjectPosition: 'center 40%',
    kicker: 'Casting',
    pillLabel: 'Now shortlisting',
    reverse: false,
  },
  hanger: {
    Badge: IconFilmCameraBadge,
    Scene: EditorialScene,
    image: editorialCastingImage,
    imageAlt: 'A model in a purple suit on an editorial campaign set',
    imageObjectPosition: 'center 38%',
    kicker: 'Editorial',
    pillLabel: 'Now styling',
    reverse: true,
  },
  clapper: {
    Badge: IconClapperBadge,
    Scene: ProductionScene,
    image: productionCastingImage,
    imageAlt: 'A silhouette walking a Pomelo Casting production set lit in teal and magenta',
    imageObjectPosition: 'center 35%',
    kicker: 'Production',
    pillLabel: 'Now filming',
    reverse: false,
  },
  star: {
    Badge: IconNetworkBadge,
    Scene: ManagementScene,
    image: talentManagementImage,
    imageAlt: 'The Pomelo Casting studio moodboard wall and monitor setup',
    imageObjectPosition: 'center 30%',
    kicker: 'Management',
    pillLabel: 'Now representing',
    reverse: true,
  },
} as const

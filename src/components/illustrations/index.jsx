import { motion } from 'framer-motion'
import { SeoAeoScope } from './SeoAeoScope'
import { CrocodileMouth } from './CrocodileMouth'
import { DarkFunnel } from './DarkFunnel'
import { ContinuousLoop } from './ContinuousLoop'
import { EarnedMediaInversion } from './EarnedMediaInversion'
import { EntityWeb } from './EntityWeb'
import { RagQueryLength } from './RagQueryLength'
import { CoCitationPack } from './CoCitationPack'
import { DashboardAnomaly } from './DashboardAnomaly'
import { AriaInvisible } from './AriaInvisible'
import { ContentStructure } from './ContentStructure'
import { JasperCapabilities } from './JasperCapabilities'
import { TripleDisciplineSync } from './TripleDisciplineSync'
import { BotCrawler } from './BotCrawler'
import { WireframeAnswerFirst }      from './WireframeAnswerFirst'
import { WireframeQuestionHeading }  from './WireframeQuestionHeading'
import { WireframeParagraphLength }  from './WireframeParagraphLength'
import { WireframeStatistics }       from './WireframeStatistics'
import { WireframeFaq }              from './WireframeFaq'
import { WireframeComparison }       from './WireframeComparison'
import { WireframeDatatable }        from './WireframeDatatable'
import { WireframeListicle }         from './WireframeListicle'
import { WireframeToc }              from './WireframeToc'
import { WireframeBrandSearch }      from './WireframeBrandSearch'
import { WireframeDirectTraffic }    from './WireframeDirectTraffic'
import { WireframeShareOfModel }     from './WireframeShareOfModel'
import { WireframeAiSov }            from './WireframeAiSov'
import { WireframeMixModel }         from './WireframeMixModel'
import { WireframeAiReferral }       from './WireframeAiReferral'
import { WireframeCitationCount }    from './WireframeCitationCount'
import { WireframeBrandMention }     from './WireframeBrandMention'
import { WireframeAnalystLogos }     from './WireframeAnalystLogos'
import { WireframeEntityLogos }      from './WireframeEntityLogos'
import { WireframeCommunityLogos }   from './WireframeCommunityLogos'
import { WireframeAgentApi }         from './WireframeAgentApi'
import { WireframeMachineReadable }  from './WireframeMachineReadable'
import { WireframeReviewIngest }     from './WireframeReviewIngest'
import { WireframeIntegrationCheck } from './WireframeIntegrationCheck'
import { WireframePricingClarity }   from './WireframePricingClarity'

const ILLUSTRATION_MAP = {
  'seo-aeo-scope':             SeoAeoScope,
  'crocodile-mouth':           CrocodileMouth,
  'dark-funnel':               DarkFunnel,
  'continuous-loop':           ContinuousLoop,
  'earned-media-inversion':    EarnedMediaInversion,
  'entity-web':                EntityWeb,
  'rag-query-length':          RagQueryLength,
  'co-citation-pack':          CoCitationPack,
  'dashboard-anomaly':         DashboardAnomaly,
  'aria-invisible':            AriaInvisible,
  'content-structure':         ContentStructure,
  'jasper-capabilities':       JasperCapabilities,
  'triple-discipline-sync':    TripleDisciplineSync,
  'bot-crawler':               BotCrawler,
  'wireframe-answer-first':     WireframeAnswerFirst,
  'wireframe-question-heading': WireframeQuestionHeading,
  'wireframe-paragraph-length': WireframeParagraphLength,
  'wireframe-statistics':       WireframeStatistics,
  'wireframe-faq':              WireframeFaq,
  'wireframe-comparison':       WireframeComparison,
  'wireframe-datatable':        WireframeDatatable,
  'wireframe-listicle':         WireframeListicle,
  'wireframe-toc':              WireframeToc,
  'wireframe-brand-search':     WireframeBrandSearch,
  'wireframe-direct-traffic':   WireframeDirectTraffic,
  'wireframe-share-of-model':   WireframeShareOfModel,
  'wireframe-ai-sov':           WireframeAiSov,
  'wireframe-mix-model':        WireframeMixModel,
  'wireframe-ai-referral':      WireframeAiReferral,
  'wireframe-citation-count':   WireframeCitationCount,
  'wireframe-brand-mention':    WireframeBrandMention,
  'wireframe-analyst-logos':    WireframeAnalystLogos,
  'wireframe-entity-logos':     WireframeEntityLogos,
  'wireframe-community-logos':  WireframeCommunityLogos,
  'wireframe-agent-api':        WireframeAgentApi,
  'wireframe-machine-readable': WireframeMachineReadable,
  'wireframe-review-ingest':    WireframeReviewIngest,
  'wireframe-integration-check': WireframeIntegrationCheck,
  'wireframe-pricing-clarity':  WireframePricingClarity,
}

export function IllustrationRenderer({ visual, className = '' }) {
  const Component = ILLUSTRATION_MAP[visual]
  if (!Component) return null
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      className={`w-full ${className}`}
      aria-hidden="true"
    >
      <Component />
    </motion.div>
  )
}

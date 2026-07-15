import Link from 'next/link'
import { ArrowRight, FileText, Search, Sparkles } from 'lucide-react'
import type { SitePost } from '@/lib/site-connector'
import type { HomeTimeSection } from '@/lib/task-data'
import type { TaskKey } from '@/lib/site-config'
import { pagesContent } from '@/editable/content/pages.content'
import { getEditableCategory, getEditableExcerpt, getEditablePostImage, postHref } from '@/editable/cards/PostCards'

type HomeSectionProps = { primaryTask: TaskKey; primaryRoute: string; posts: SitePost[]; timeSections: HomeTimeSection[] }
const container = 'mx-auto w-full max-w-[var(--editable-container)] px-4 sm:px-6'

function poolOf(posts: SitePost[], sections: HomeTimeSection[]) {
  return Array.from(new Map([...posts, ...sections.flatMap((section) => section.posts)].map((post) => [post.slug || post.id || post.title, post])).values())
}

function hrefFor(task: TaskKey, route: string, post: SitePost) { return postHref(task, post, route) }

function LeadStory({ post, href, large = false, index = 0 }: { post: SitePost; href: string; large?: boolean; index?: number }) {
  return (
    <Link href={href} className={`group relative block overflow-hidden bg-[#000000] ${large ? 'min-h-[430px] lg:min-h-[500px]' : 'min-h-[300px] lg:min-h-[500px]'}`}>
      <img src={getEditablePostImage(post)} alt={post.title || 'Featured story'} className={`absolute inset-0 h-full w-full object-cover opacity-80 transition duration-700 group-hover:scale-105 ${index === 0 ? 'editable-hero-drift' : ''}`} />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_28%,rgba(10,14,20,.9)_100%)]" />
      <div className="absolute inset-x-0 bottom-0 p-5 text-white sm:p-7">
        <span className="inline-flex bg-[var(--slot4-accent)] px-2.5 py-1 text-[10px] font-bold uppercase tracking-[.12em]">{getEditableCategory(post)}</span>
        <h2 className={`editable-display mt-3 font-bold leading-[1.05] ${large ? 'text-3xl sm:text-4xl' : 'text-2xl'}`}>{post.title || 'Discover the latest on Altasov'}</h2>
        <p className="mt-3 line-clamp-2 text-sm leading-6 text-white/70">{getEditableExcerpt(post, 110) || 'Explore this story and discover more useful details.'}</p>
      </div>
    </Link>
  )
}

export function EditableHomeHero({ primaryTask, primaryRoute, posts, timeSections }: HomeSectionProps) {
  const pool = poolOf(posts, timeSections)
  if (!pool.length) return (
    <section className="bg-[#000000] py-24 text-center text-[#E1DCC9]"><h1 className="editable-display text-5xl font-bold">{pagesContent.home.hero.title.join(' ')}</h1><p className="mx-auto mt-5 max-w-xl text-[#E1DCC9]/65">{pagesContent.home.hero.description}</p></section>
  )
  const leads = [...pool, ...pool].slice(0, 3)
  return (
    <section>
      <div className="grid lg:grid-cols-3">
        {leads.map((post, index) => <LeadStory key={`${post.slug || post.id}-${index}`} post={post} href={hrefFor(primaryTask, primaryRoute, post)} large={index === 1} index={index} />)}
      </div>
      <div className="border-b border-[var(--editable-border)] bg-[#E1DCC9]">
        <div className={`${container} grid items-center gap-5 py-5 lg:grid-cols-[1fr_520px]`}>
          <div><p className="text-[10px] font-bold uppercase tracking-[.2em] text-[var(--slot4-accent)]">{pagesContent.home.hero.badge}</p><h1 className="editable-display mt-1 text-3xl font-bold">{pagesContent.home.hero.title.join(' ')}</h1></div>
          <form action="/search" className="flex overflow-hidden border border-[var(--editable-border)] bg-[#D5CEB7] focus-within:border-black"><Search className="ml-4 h-5 w-5 self-center text-[var(--slot4-accent)]"/><input name="q" aria-label="Search Altasov articles" placeholder="Search articles, guides, topics, or authors" className="min-w-0 flex-1 bg-transparent px-3 py-3 text-sm outline-none"/><button className="bg-[var(--slot4-accent)] px-6 text-xs font-bold uppercase tracking-[.12em] text-[#E1DCC9]">Search</button></form>
        </div>
      </div>
    </section>
  )
}

export function EditableStoryRail({ primaryRoute }: HomeSectionProps) {
  const topics = ['Latest articles', 'Practical guides', 'Expert insights', 'Ideas & culture', 'Technology', 'Health & lifestyle']
  const repeated = [...topics, ...topics]
  return <section className="overflow-hidden border-b border-[#412D15] bg-[#000000] py-3 text-[#E1DCC9]"><div className="editable-marquee flex gap-3">{repeated.map((topic, i) => <Link key={`${topic}-${i}`} href={primaryRoute} className="inline-flex min-w-44 items-center justify-center gap-2 border border-[#412D15] px-5 py-3 text-xs font-bold uppercase tracking-[.15em] hover:border-[#E1DCC9] hover:bg-[#412D15]"><Sparkles className="h-3.5 w-3.5"/>{topic}</Link>)}</div></section>
}

function HorizontalCard({ post, href, index }: { post: SitePost; href: string; index: number }) {
  return <article className="group grid overflow-hidden border-b border-[var(--editable-border)] pb-7 sm:grid-cols-[280px_1fr]">
    <Link href={href} className="relative min-h-52 overflow-hidden bg-[var(--slot4-media-bg)]"><img src={getEditablePostImage(post)} alt={post.title || ''} className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"/><span className="absolute left-3 top-3 bg-[var(--slot4-accent)] px-2 py-1 text-[10px] font-bold uppercase text-white">{getEditableCategory(post)}</span></Link>
    <div className="flex flex-col p-5 sm:py-2 sm:pl-7"><p className="text-[10px] font-bold uppercase tracking-[.18em] text-[var(--slot4-accent)]">Altasov edit · {String(index + 1).padStart(2, '0')}</p><Link href={href}><h3 className="editable-display mt-3 text-3xl font-bold leading-tight group-hover:text-[var(--slot4-accent)]">{post.title || 'Untitled feature'}</h3></Link><p className="mt-3 line-clamp-3 text-sm leading-7 text-[var(--slot4-muted-text)]">{getEditableExcerpt(post, 180) || 'Open this post for the complete story, details, and useful information.'}</p><Link href={href} className="mt-auto inline-flex w-fit items-center gap-1 pt-4 text-xs font-bold uppercase tracking-[.13em] text-[var(--slot4-accent)]">Read more <ArrowRight className="h-4 w-4"/></Link></div>
  </article>
}

export function EditableMagazineSplit({ primaryTask, primaryRoute, posts, timeSections }: HomeSectionProps) {
  const pool = poolOf(posts, timeSections).slice(3, 11)
  if (!pool.length) return null
  return <section className="bg-[#E1DCC9]"><div className={`${container} py-14 sm:py-20`}><div className="grid gap-12 lg:grid-cols-[minmax(0,1.75fr)_340px]">
    <div><div className="mb-8 flex items-end justify-between border-b-2 border-[#000000] pb-3"><div><p className="text-[10px] font-bold uppercase tracking-[.2em] text-[var(--slot4-accent)]">Latest updates</p><h2 className="editable-display text-4xl font-bold">Ideas & insights</h2></div><Link href={primaryRoute} className="text-xs font-bold uppercase text-[var(--slot4-accent)]">View all</Link></div><div className="grid gap-8">{pool.slice(0,5).map((post,index)=><HorizontalCard key={post.slug || post.id} post={post} href={hrefFor(primaryTask, primaryRoute, post)} index={index}/>)}</div></div>
    <aside><div className="border-t-[3px] border-[var(--slot4-accent)] bg-[#D5CEB7] p-6"><h2 className="editable-display text-2xl font-bold uppercase">Article library</h2><p className="mt-2 text-sm leading-6 text-[var(--slot4-muted-text)]">Browse thoughtful explainers, useful guides, informed perspectives, and the latest editorial reads.</p><Link href={primaryRoute} className="mt-5 inline-flex items-center gap-2 bg-[var(--slot4-accent)] px-5 py-3 text-xs font-bold uppercase tracking-[.12em] text-[#E1DCC9]"><FileText className="h-4 w-4"/>Browse all articles</Link></div><div className="mt-8 border-t-[3px] border-[var(--slot4-accent)]"><h3 className="bg-[var(--slot4-accent)] px-4 py-2 text-xs font-bold uppercase tracking-[.12em] text-[#E1DCC9]">Popular reads</h3>{pool.slice(5).map((post,index)=><Link key={post.slug || post.id} href={hrefFor(primaryTask, primaryRoute, post)} className="group flex gap-4 border-b border-[var(--editable-border)] py-4"><span className="editable-display text-3xl font-bold text-[var(--slot4-accent)]">{String(index+1).padStart(2,'0')}</span><span className="line-clamp-2 text-sm font-bold leading-5 group-hover:text-[var(--slot4-accent)]">{post.title}</span></Link>)}</div></aside>
  </div></div></section>
}

export function EditableTimeCollections({ primaryTask, primaryRoute, posts, timeSections }: HomeSectionProps) {
  const pool = poolOf(posts, timeSections).slice(8, 20)
  if (!pool.length) return null
  return <section className="bg-[#D5CEB7]"><div className={`${container} py-14 sm:py-20`}><div className="flex items-end justify-between"><div><p className="text-[10px] font-bold uppercase tracking-[.2em] text-[var(--slot4-accent)]">Explore more</p><h2 className="editable-display text-4xl font-bold">From across Altasov</h2></div></div><div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">{pool.slice(0,8).map((post,index)=><Link key={post.slug || post.id} href={hrefFor(primaryTask, primaryRoute, post)} className={`group block overflow-hidden bg-[#E1DCC9] shadow-sm transition hover:-translate-y-1 hover:shadow-xl ${index % 3 === 0 ? 'sm:col-span-2' : ''}`}><div className="relative aspect-[16/10] overflow-hidden"><img src={getEditablePostImage(post)} alt={post.title || ''} className="h-full w-full object-cover transition duration-700 group-hover:scale-105"/></div><div className="p-5"><span className="text-[10px] font-bold uppercase tracking-[.16em] text-[var(--slot4-accent)]">{getEditableCategory(post)}</span><h3 className="editable-display mt-2 line-clamp-2 text-2xl font-bold leading-tight">{post.title}</h3></div></Link>)}</div></div></section>
}

export function EditableHomeCta() { return <section className="bg-[var(--slot4-accent)] text-[#E1DCC9]"><div className={`${container} flex flex-col items-center justify-between gap-7 py-12 text-center sm:flex-row sm:text-left`}><div><p className="text-xs font-bold uppercase tracking-[.18em] text-[#E1DCC9]/70">Share what matters</p><h2 className="editable-display mt-2 text-4xl font-bold">Publish an article and share your perspective.</h2></div><div className="flex shrink-0 gap-3"><Link href="/create" className="bg-[#E1DCC9] px-6 py-3 text-xs font-bold uppercase tracking-[.12em] text-[var(--slot4-accent)]">Write an article</Link><Link href="/article" className="border border-[#E1DCC9]/50 px-6 py-3 text-xs font-bold uppercase tracking-[.12em] text-[#E1DCC9]">Read articles</Link></div></div></section> }

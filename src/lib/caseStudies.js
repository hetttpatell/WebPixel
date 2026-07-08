/**
 * Case Studies content loader — query helpers
 */
import projects from '../content/case-studies/projects.json'

export function getAllCaseStudies() {
  return projects
}

export function getCaseStudyBySlug(slug) {
  return projects.find((p) => p.slug === slug) || null
}

export function filterByTag(tag) {
  if (!tag || tag === 'all') return projects
  return projects.filter((p) => p.tags.includes(tag))
}

export function getFeaturedCaseStudies(count = 3) {
  return projects.slice(0, count)
}

export function getNextProject(currentSlug) {
  const index = projects.findIndex((p) => p.slug === currentSlug)
  if (index === -1) return projects[0]
  return projects[(index + 1) % projects.length]
}

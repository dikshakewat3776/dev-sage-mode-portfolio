import { useMemo, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import { studyEntries } from '../data/study'
import type { StudySubject } from '../types/content'

const subjects: StudySubject[] = Array.from(new Set(studyEntries.map((entry) => entry.subject)))

export const StudyPage = () => {
  const [subject, setSubject] = useState<StudySubject>(subjects[0] ?? 'DSA')
  const [search, setSearch] = useState('')
  const [tagFilter, setTagFilter] = useState('')

  const entries = useMemo(() => {
    const term = search.trim().toLowerCase()
    const tagTerm = tagFilter.trim().toLowerCase()
    return studyEntries.filter((entry) => {
      return (
        entry.subject === subject &&
        (term.length === 0 ||
          (entry.title ?? '').toLowerCase().includes(term) ||
          entry.content.toLowerCase().includes(term)) &&
        (tagTerm.length === 0 || entry.tags.some((tag) => tag.toLowerCase().includes(tagTerm)))
      )
    })
  }, [subject, search, tagFilter])

  const selected = entries[0]

  return (
    <section className="stack">
      <h1>Study</h1>
      <div className="row">
        {subjects.map((entry) => (
          <button
            key={entry}
            type="button"
            className={`btn ${entry === subject ? 'primary' : ''}`}
            onClick={() => setSubject(entry)}
          >
            {entry}
          </button>
        ))}
      </div>
      <div className="row">
        <input
          aria-label="Search study notes"
          placeholder="Search title/content..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
        <input
          aria-label="Filter by tag"
          placeholder="Filter tag..."
          value={tagFilter}
          onChange={(event) => setTagFilter(event.target.value)}
        />
      </div>

      <div className="study-layout">
        <aside className="card">
          <h2>Notes</h2>
          <ul className="stack compact">
            {entries.map((entry) => (
              <li key={entry.id}>
                <strong>{entry.title ?? entry.subject}</strong>
                <p>{entry.tags.join(', ')}</p>
              </li>
            ))}
          </ul>
        </aside>
        <article className="card">
          <h2>{selected?.title ?? selected?.subject ?? 'No note selected'}</h2>
          {selected ? (
            selected.contentType === 'link' ? (
              <a href={selected.content} target="_blank" rel="noreferrer">
                {selected.content}
              </a>
            ) : selected.contentType === 'markdown' ? (
              <ReactMarkdown>{selected.content}</ReactMarkdown>
            ) : (
              <p>{selected.content}</p>
            )
          ) : (
            <p>No content found for current filter.</p>
          )}
        </article>
      </div>
    </section>
  )
}


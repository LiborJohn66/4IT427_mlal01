export function AboutPage() {
  return (
    <section className="page">
      <h1>About EventMaster</h1>
      <p>
        EventMaster is a planning workspace for a small production team that
        prepares conferences, brand launches, and partner events across Central
        Europe.
      </p>

      <dl className="detail-list">
        <div>
          <dt>Project focus</dt>
          <dd>Event coordination, task tracking, and team responsibility.</dd>
        </div>
        <div>
          <dt>Current season</dt>
          <dd>Summer 2026 events in Prague and Bratislava.</dd>
        </div>
        <div>
          <dt>Team workflow</dt>
          <dd>
            Managers create event plans, coordinators track deadlines, and each
            task has a clear owner, priority, and status.
          </dd>
        </div>
        <div>
          <dt>Demo data</dt>
          <dd>
            The application uses mock data for events, tasks, users, and
            categories stored in a local JSON file.
          </dd>
        </div>
      </dl>
    </section>
  )
}

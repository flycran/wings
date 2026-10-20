export default function RtkEndpointsDemo() {
  return (
    <div className="p-demo p-demo--ide">
      <div className="p-ide-top">
        <span>endpoints.ts</span>
        <span>TS</span>
      </div>
      <div className="p-ide-code" aria-hidden="true">
        <div>
          <span className="p-ide-ln">12</span>
          <span className="tk-key">export const</span> api = {'createApi({'}
        </div>
        <div>
          <span className="p-ide-ln">13</span>
          {'  endpoints: (build) => ({'}
        </div>
        <div>
          <span className="p-ide-ln">14</span>
          {'    getUser: build.query<User, string>({'}
        </div>
        <div>
          <span className="p-ide-ln">15</span>
          {'      query: (id) => '}
          <span className="tk-str">{'`/api/user/${id}`'}</span>,
        </div>
        <div>
          <span className="p-ide-ln">16</span>
          {'    }),'}
        </div>
        <div className="p-ide-highlight">
          <span className="p-ide-ln">20</span>
          {'  '}
          <span className="p-ide-hook">useGetUserQuery</span>
          {'(id)'}
        </div>
      </div>
      <div className="p-ide-tip">
        <span className="p-ide-method">GET</span>
        <span>/api/user/:id</span>
        <span className="p-ide-tip-note">跳转到 endpoint · hover 查看 URL</span>
      </div>
      <div className="p-ide-cursor" aria-hidden="true" />
    </div>
  )
}

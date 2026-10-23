import { m } from '@/paraglide/messages'
import shared from '../demo.module.css'
import styles from './RtkEndpointsDemo.module.css'

export default function RtkEndpointsDemo() {
  return (
    <div className={`${shared.demo} ${styles.demo}`}>
      <div className={styles.top}>
        <span>endpoints.ts</span>
        <span>TS</span>
      </div>
      <div className={styles.code} aria-hidden="true">
        <div>
          <span className={styles.ln}>12</span>
          <span className={styles.keyword}>export const</span> api = {'createApi({'}
        </div>
        <div>
          <span className={styles.ln}>13</span>
          {'  endpoints: (build) => ({'}
        </div>
        <div>
          <span className={styles.ln}>14</span>
          {'    getUser: build.query<User, string>(({'}
        </div>
        <div>
          <span className={styles.ln}>15</span>
          {'      query: (id) => '}
          {/** biome-ignore lint/suspicious/noTemplateCurlyInString: 这是code内容 */}
          <span className={styles.string}>{'`/api/user/${id}`'}</span>,
        </div>
        <div>
          <span className={styles.ln}>16</span>
          {'    }),'}
        </div>
        <div className={styles.highlight}>
          <span className={styles.ln}>20</span>
          {'  '}
          <span className={styles.hook}>useGetUserQuery</span>
          {'(id)'}
        </div>
      </div>
      <div className={styles.tip}>
        <span className={styles.method}>GET</span>
        <span>/api/user/:id</span>
        <span className={styles.tipNote}>{m.demoRtkTipNote()}</span>
      </div>
    </div>
  )
}

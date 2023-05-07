'use client'

import { useSession } from 'next-auth/react'
import styles from './about.module.css'

export const metadata = {
  title: 'About',
  description: 'not finished yet'
}

const About = () => {
  const { data: session } = useSession()
  return (
    <>
      <div className={styles.about_content}>
        {!session && <h1>Please Sign In</h1>}
        {session && (
          <>
            <h1 className={styles.headText}>About page</h1>
            <div className={styles.bodyText}>
              <p>
                repellendus, qui adipisci fugit rem perspiciatis quae? Deserunt
                recusandae sequi quos accusantium suscipit architecto porro
                velit, unde ducimus veniam ea vero aliquam adipisci provident
                asperiores dolore magni ipsam vitae sint dolorem laudantium
                exercitationem earum libero aperiam. Itaque repellendus dolorem
                provident ea quae blanditiis esse repudiandae voluptates,
                asperiores omnis quas, nisi ratione fugiat praesentium fugit eos
                reiciendis minus porro libero beatae! Fuga deserunt accusantium
                earum rem adipisci facere vitae rerum eaque explicabo dolor
                minus aspernatur consequatur veritatis laboriosam nisi alias
                exercitationem aut quis, enim et repellat! Ipsa nihil enim
                inventore voluptatum numquam doloribus consequuntur eaque eum
                veniam magni illum, voluptate est, fuga nam temporibus ut dicta
              </p>
              <h2>molestiae provident sint ullam consectetur?</h2>
              <p>
                Numquam beatae consequatur Lorem ipsum dolor sit amet
                consectetur adipisicing elit. Assumenda dignissimos soluta
                cupiditate nostrum. Voluptas vel aperiam, adipisci libero earum,
                iusto corrupti repudiandae culpa voluptatem aliquam ipsa minima
                nostrum quia fuga iure quod obcaecati eos maiores atque eaque
                repellendus neque esse doloribus dignissimos. Corrupti saepe
                repellendus atque molestias facere, quis blanditiis libero
                perspiciatis iste reiciendis fugiat unde sapiente, magni dolorem
                perferendis repudiandae vel accusantium ea. Dolorem modi
                assumenda autem quisquam unde itaque cupiditate accusamus
                nostrum recusandae molestias et, minus nihil consequuntur
                voluptates sint, qui quas. Minima aliquam repudiandae itaque,
                consequuntur facilis officiis culpa magnam ea ipsam eligendi
                quas. Unde similique beatae explicabo sit inventore architecto
                sint laborum iste! Recusandae reiciendis voluptatem doloremque
                tempore alias corrupti pariatur ut modi magnam
              </p>
              <h3>aliquid earum nemo impedit,</h3>
              <p>
                numquam officia aliquam sed. Ab recusandae quam expedita autem
                perspiciatis odio. Et quos placeat perspiciatis cupiditate?
                Placeat assumenda aut, qui error enim dolores illum natus veniam
                cum. Architecto dolorem harum sequi distinctio magni error
                magnam? Numquam corrupti dolor saepe sunt pariatur inventore
                eligendi odio nisi non beatae quibusdam sit perferendis,
                explicabo impedit itaque laboriosam doloribus aperiam
                reiciendis. Dolor, illum! Dicta repudiandae architecto
                accusamus. Accusantium assumenda fugiat magnam cupiditate, sequi
                veniam repudiandae ipsa numquam non repellendus atque quas
                deserunt, quam quisquam minus exercitationem impedit nobis qui
                provident. Itaque, ab adipisci ipsa nostrum sed rerum culpa,
                natus pariatur eaque facere, eos nulla! Consectetur nesciunt
                soluta quae numquam aliquid ratione minus odit, commodi placeat,
                totam eum. Vel a
              </p>
              <h4>officia ratione impedit.</h4>
              <p>
                Iusto dignissimos voluptatibus inventore minima nihil ratione id
                eius hic quaerat. Quae vitae animi velit totam aliquam ea
                temporibus praesentium impedit aut, iste alias sed, voluptates
                autem numquam deleniti corrupti quam magni consequatur et
                ducimus deserunt asperiores mollitia expedita. Quisquam suscipit
                nam corrupti perspiciatis blanditiis esse consectetur ad, enim
                ab eius possimus, omnis voluptas reiciendis, rem minima veniam
                error quasi? Veritatis velit libero quis molestiae sunt
                doloremque. Necessitatibus esse eaque fugiat ut at cupiditate{' '}
              </p>
              <p>
                vitae corrupti dicta molestiae ipsum magni neque consequatur,
                harum nostrum aperiam doloremque omnis vero itaque labore
                distinctio quaerat fuga porro. A reprehenderit dolor corporis.
                At repudiandae, eaque voluptatibus velit provident neque tenetur
                dolores, accusantium esse quidem numquam doloremque, ex totam a
                facere? Perferendis facilis ipsam, a corrupti cum ea quaerat
                eveniet consequatur porro. Corrupti vel perspiciatis sint itaque
                reiciendis.
              </p>
            </div>
          </>
        )}
      </div>
    </>
  )
}

export default About

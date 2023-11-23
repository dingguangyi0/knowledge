import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: '书源堂',
    Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
    description: (
      <>
          书源堂不仅是我记录最初所学、所想的地方，也是我不断积累基础知识的宝库。这里收藏了我从学习生涯中获得的众多知识和思想，它们是我成长道路上的重要里程碑。
      </>
    ),
  },
  {
    title: '知源室',
    Svg: require('@site/static/img/undraw_docusaurus_tree.svg').default,
    description: (
      <>
          知源室是我对更深层知识探索的地方，也是我不断挖掘和提炼智慧的场所。在这里，我致力于探寻知识的源头，深入挖掘各个领域的知识和智慧
      </>
    ),
  },
  {
    title: '探新轩',
    Svg: require('@site/static/img/undraw_docusaurus_react.svg').default,
    description: (
      <>
          探新轩是我获取新知识、了解新趋势的宝库，也是我不断探索和发现新知识的乐园。在探新轩中，我不断发现新的知识和观点，开拓自己的视野和思路
      </>
    ),
  },
];

function Feature({Svg, title, description}) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}

import styles from './index.less';
import Table from './Table';
import ProtableTest from './ProtableTest';

export default function IndexPage() {
  return (
    <div>
      <h1 className={styles.title}>Page index</h1>
      {/* <Table /> */}
      <ProtableTest />
    </div>
  );
}

import * as React from 'react';
import { Tabs } from '@base-ui/react/tabs';
import styles from '../css/tab.module.css'
import Search from '../tabs/Search'
import Add from '../tabs/Add'

export default function ExampleTabs() {
  return (
    <>
      <Tabs.Root className={styles.Tabs} defaultValue="List">
        <Tabs.List className={styles.List}>
          <Tabs.Tab className={styles.Tab} value="List">
            List Page
          </Tabs.Tab>
          <Tabs.Tab className={styles.Tab} value="Add">
            Add Page
          </Tabs.Tab>
          <Tabs.Indicator className={styles.Indicator} />
        </Tabs.List>
        <Tabs.Panel className={styles.Panel} value="List">
          <Search />
        </Tabs.Panel>
        <Tabs.Panel className={styles.Panel} value="Add">
          <Add />
        </Tabs.Panel>
      </Tabs.Root>
    </>
  );
}
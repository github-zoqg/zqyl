import React from 'react';
import { connect } from 'dva';
import styles from './IndexPage.css';
import { Button } from "antd";

function IndexPage() {
  return (
    <div className={styles.normal}>
      <h1 className={styles.title}>Yay! Welcome to dva!</h1>
      <div className={styles.welcome} />
      <ul className={styles.list}>
        <li>To get started, edit <code>src/index.js</code> and save to reload.</li>
        <li><a href="https://github.com/dvajs/dva-docs/blob/master/v1/en-us/getting-started.md">Getting Started</a></li>
        <Button>Button</Button>
        <div style={{width:"1000px",height:"500px",overflow:"auto",backgroundColor:"#099"}}>
          <div style={{width:"500px",height:"1000px",backgroundColor:"#090",margin:"100px"}}></div>
        </div>
      </ul>
    </div>
  );
}

IndexPage.propTypes = {
};

export default connect()(IndexPage);

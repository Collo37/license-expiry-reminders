import React from 'react';
import { useDispatch } from 'react-redux';
import { Button } from '@mui/material';
import {AiOutlineFileAdd} from "react-icons/ai"

import { showModal } from '@/state/modalSlice';

import Pending from '../Tables/Pending/Pending';
import Resolved from '../Tables/Resolved/Resolved';
import ContentWrapper from './ContentWrapper/ContentWrapper';
import styles from "./Layout.module.css";
import TopBar from './TopBar/TopBar';

const Layout = ({user, data}) => {
  const dispatch = useDispatch();

  const handleShowModal = () => dispatch(showModal())

  return (
    <div className={styles.container}>
      <TopBar user={user}/>
      <ContentWrapper>
        <Button endIcon={<AiOutlineFileAdd />} variant="outlined" style={{height: 50, marginBottom: 40, marginTop: 120}} onClick={handleShowModal}>New Reminder</Button>
        <Pending data={data} />
        <Resolved data={data} />
      </ContentWrapper>
    </div>
  )
}

export default Layout;
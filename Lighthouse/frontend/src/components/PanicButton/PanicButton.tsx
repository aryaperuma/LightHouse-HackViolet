import React from "react";
import { IonFab, IonIcon } from '@ionic/react';
import classes from './PanicButton.module.css';
import SOSIcon from '../../assets/SOSIcon.svg';

import { SMS as sms } from '@ionic-native/sms';
import { toast } from '../Toast/Toast';

const PanicButton: React.FC = () => {
  const handlePanic = () => {
    console.log("panic")

    sms.send('7688075253', 'Hello world!').then((suc) => {
      toast("succ");
    }).catch((err) => {
      toast("err");
    })
  }

  return (
    <IonFab vertical="top" horizontal="end" slot="fixed" className={classes.panicBtnContainer}>
      <IonIcon onClick={handlePanic} src={SOSIcon} className={classes.panicBtnIcon}></IonIcon>
    </IonFab>
  );
};

export default PanicButton;

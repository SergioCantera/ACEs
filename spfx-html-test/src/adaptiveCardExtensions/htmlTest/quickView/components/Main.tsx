import * as React from 'react';
import {useState} from 'react';
import styles from '../QuickView.module.scss';
import {TabList} from './TabList';
import {TabItem} from './TabItem';
import {IQuickViewData} from '../../models/IQuickViewData';

export const Main = (props:any) => {  
    const [pending] = useState(getPending(props["0"]))
    const [expired] = useState(getExpired(props["0"]))
    const [others] = useState(getOthers(props["0"]))

    function getPending(data:IQuickViewData[]):[number,IQuickViewData[]]{
        const pendingList = data.filter(((course:{daysRemaining:number}) => course.daysRemaining >= 0 && course.daysRemaining <7))
        return ([pendingList.length,pendingList])
    }

    function getExpired(data:IQuickViewData[]):[number,IQuickViewData[]]{
        const expiredList = data.filter(((course:{daysRemaining:number}) => course.daysRemaining < 0))
        return ([expiredList.length,expiredList])
    }

    function getOthers(data:IQuickViewData[]):[number,IQuickViewData[]]{
        const othersList = data.filter(((course:{daysRemaining:number}) => course.daysRemaining >= 7))
        return ([othersList.length,othersList])
    }    
    
    return(
        <div className={styles.helloWorld}>
            <div className={styles.welcome}>
                <img src={require('../assets/logoSSFF.png')}  className={styles.welcomeImage} />
            </div>
            <TabList activeTabIndex={0}>
                <TabItem label={`Expire soon (${pending[0]})`}>
                    {pending[1]}
                </TabItem>
                <TabItem label={`Expired (${expired[0]})`}>
                    {expired[1]}
                </TabItem>
                <TabItem label={`Others (${others[0]})`}>
                    {others[1]}
                </TabItem>
            </TabList>
        </div>
    )
}
import * as React from 'react';
import {useState} from 'react';
import {TabItem} from './TabItem';
import {TabListProps, TabItemProps} from '../../types/TabsProps';
import styles from '../QuickView.module.scss';

export const TabList:React.FC<TabListProps> = ({children, activeTabIndex =0}) => {

    const [activeTab, setActiveTab] = useState(activeTabIndex);

    const handleTabClick = (index:number) => {
        setActiveTab(index)
    }

    const tabs = React.Children.toArray(children).filter(
        (child): child is React.ReactElement<TabItemProps> =>
            React.isValidElement(child) && child.type === TabItem
    );

    return(
        <div>
            <nav>
                <ul className={styles.navTabs} role='tablist' aria-orientation='horizontal'>
                    {tabs.map((tab,index) =>(
                        <li key={`tab-${index}`}>
                            <button
                                key={`tab-btn-${index}`}
                                role='tab'
                                id={`tab-${tab.props.label}`}
                                aria-controls={`panel-${tab.props.label}`}
                                aria-selected={activeTab === index}
                                onClick={() => handleTabClick(index)}
                                className={`${styles.btnTab} ${activeTab === index && styles.active}`}
                            >
                                {tab.props.label}</button>
                        </li>
                    ))}
                </ul>
            </nav>
            {tabs[activeTab]}
        </div>
    )
}
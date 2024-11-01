import * as React from 'react';
import {useState} from 'react'
import {TabItemProps} from '../../types/TabsProps';
import { IQuickViewData } from '../../models/IQuickViewData';
import styles from '../QuickView.module.scss';


export const TabItem:React.FC<TabItemProps> = ({label,children}) => {
    
    const [details, setDetails] = useState<IQuickViewData | null>(null);

    const handleItemClick = (id:string) => {
        if (id !== null){
            const _details:IQuickViewData = children.filter((course:IQuickViewData) => course.id === id)[0];
            setDetails(_details)
        }
        
    }

    if(details){
        return (
            <div className={styles.detailsCourse}>
                <h4>{details.title}</h4>
                <p>{details.description}</p>
                <div>
                    <p>{`Days remaining: ${details.daysRemaining}`}</p>
                    <p>{`Classification: ${details.classification}`}</p>
                    <p>{`Duration: ${details.length} h`}</p>
                    <p>{`Required date: ${new Date(details.requiredDate).toLocaleDateString('es-es')}`}</p>
                </div>
            </div>
        )
    } else {

        return(
            
                <div
                    className={styles.tabPanel}
                    role='tabpanel'
                    aria-labelledby={`tab-${label}`}
                    id={`panel-${label}`}
                >
                    <ul className={styles.tabCourses}>
                        {children.map((course:IQuickViewData) => (
                            <li key={course.id} className={styles.courseItem} onClick={()=>handleItemClick(course.id)}>
                                <h4>{course.title}</h4>
                                <div>
                                    <p>{`Days remaining: ${course.daysRemaining}`}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                    
                </div>
        )
    }
}
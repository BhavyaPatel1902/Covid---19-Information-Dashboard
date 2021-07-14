import React from 'react'
import './infoBox.css'
import {Card,
        CardContent,
        Typography
    } 
    from "./node_modules/@material-ui/core";
function InfoBox({title,cases,active,isRed,total,...props}) {
    return (
        <Card 
        onClick={props.onClick}
        className={`infoBox ${active && "infoBox--selected"} ${isRed && "infoBox--red"}`}
        >
             <CardContent>
                 <Typography className="info__title" color="textSecondary">{title}</Typography>

                 <h2 className={`infoBox__cases ${!isRed && "infoBox__cases--green"}`}>{cases}</h2>

                 <Typography className="info__total" color="textSecondary">{total} Total</Typography>
             </CardContent>
        </Card>
    )
}

export default InfoBox;

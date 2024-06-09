import React from 'react';

const Colors = (props) => {
    const {setColor, colorData} = props;
    return (
        <>
            <ul className='colors ps-0'>
               {
                colorData && colorData?.map((item,index)=> {
                    return (
                        <li onClick={()=>setColor(item?._id)} style={{backgroundColor:item?.title}} key={index}></li>
                    )
                })
               }
            </ul>
        </>
    );
}

export default Colors;

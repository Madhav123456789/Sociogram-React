import { useEffect, useState } from 'react';
import Loader from '../Loader/Loader';
import cssStyle from "./style.module.css";

function ProgressiveImg({src , style , Class , height , width , blurDataUrl , isLoading , id}) {
    // this state will manage loading
    const [loading, setLoading] = useState(isLoading);
    const [image , setImage] = useState(blurDataUrl);

    useEffect(() => {
        const img = new Image();
        img.src = src;
        img.onload = () => {
            setImage(src);
            setLoading(false);
        };
    },[src]);

    return (
        <div className={cssStyle.holder} style={{height:height , width:width}}>
            {
                loading ?
                    <Loader />
                    :
                    <img id={id} className={Class} style={{...style , height:height , width:width}} src={image} alt="" />
            }
        </div>
    )
}

export default ProgressiveImg;

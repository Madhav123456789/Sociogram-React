import style from "./Slider.module.css"

function Slider({ title, value = 0, onChange, id , min=0 , max=40}) {
    return (
        <div>
            <label htmlFor={id} className={style.title}>{title}</label>
            <div className={style.option}>
                <input onChange={onChange} type="range" max={max} min={min} value={value} id={id} className={style.slider} />
                <p className={style.show_value}>{value}</p>
            </div>
        </div>
    )
}

export default Slider